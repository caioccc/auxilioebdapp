import { useEffect, useState } from 'react';

/**
 * Hook personalizado para gerar thumbnails dinâmicas baseadas em título e descrição.
 * Utiliza Canvas API para renderizar uma imagem com fundo azul, título branco e descrição cinza.
 * As thumbnails são cacheadas no localStorage para performance.
 *
 * @param title - Título do post para exibir na thumbnail
 * @param description - Descrição do post para exibir na thumbnail
 * @param width - Largura da thumbnail (padrão: 600)
 * @param height - Altura da thumbnail (padrão: 400)
 * @returns URL da imagem gerada (data URL)
 */
interface UseThumbnailProps {
  title: string;
  description: string;
  width?: number;
  height?: number;
}

export const useThumbnail = ({ title, description, width = 600, height = 400 }: UseThumbnailProps): string => {
  const [thumbnailSrc, setThumbnailSrc] = useState<string>('');

  useEffect(() => {
    const generateThumbnail = async () => {
      // Sanitiza os inputs para prevenir XSS ou caracteres indesejados
      const sanitizedTitle = sanitizeText(title);
      const sanitizedDescription = sanitizeText(description);

      // Gera hash SHA-256 para chave de cache
      const cacheKey = await generateSHA256Hash(sanitizedTitle + sanitizedDescription);
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        setThumbnailSrc(cached);
        return;
      }

      // Usa HTMLCanvasElement para compatibilidade
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        console.error('Canvas context not available');
        // Fallback para uma imagem padrão ou tratamento de erro
        setThumbnailSrc('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='); // 1x1 transparent PNG
        return;
      }

      // Fundo
      ctx.fillStyle = '#1e40af'; // Fundo azul
      ctx.fillRect(0, 0, width, height);

      // Definir tamanhos iniciais de fonte
      let titleFontSize = 24;
      let descFontSize = 16;
      const minTitleFontSize = 12;
      const minDescFontSize = 10;
      const lineHeightMultiplier = 1.25;
      const spaceBetween = 20;

      // Função para calcular altura total do texto
      const calculateTotalHeight = (tfs: number, dfs: number) => {
        ctx.font = `bold ${tfs}px Arial`;
        const titleLines = wrapText(ctx, sanitizedTitle, width - 40);
        const titleHeight = titleLines.length * (tfs * lineHeightMultiplier);

        ctx.font = `${dfs}px Arial`;
        const descLines = wrapText(ctx, sanitizedDescription, width - 40);
        const descHeight = descLines.length * (dfs * lineHeightMultiplier);

        return { titleLines, descLines, totalHeight: titleHeight + descHeight + spaceBetween };
      };

      // Calcular inicialmente
      let { titleLines, descLines, totalHeight } = calculateTotalHeight(titleFontSize, descFontSize);

      // Se não couber, reduzir proporcionalmente
      if (totalHeight > height) {
        const scale = (height - spaceBetween) / (totalHeight - spaceBetween);
        titleFontSize = Math.max(minTitleFontSize, titleFontSize * scale);
        descFontSize = Math.max(minDescFontSize, descFontSize * scale);

        // Recalcular com novos tamanhos
        const recalc = calculateTotalHeight(titleFontSize, descFontSize);
        titleLines = recalc.titleLines;
        descLines = recalc.descLines;
        totalHeight = recalc.totalHeight;
      }

      // Posicionar verticalmente centralizado
      const startY = (height - totalHeight) / 2 + (titleFontSize * 0.5); // baseline aproximada no meio da fonte

      // Título
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${titleFontSize}px Arial`;
      ctx.textAlign = 'center';
      let y = startY;
      titleLines.forEach(line => {
        ctx.fillText(line, width / 2, y);
        y += titleFontSize * lineHeightMultiplier;
      });

      // Espaço entre título e descrição
      y += spaceBetween;

      // Descrição
      ctx.fillStyle = '#e5e7eb';
      ctx.font = `${descFontSize}px Arial`;
      descLines.forEach(line => {
        ctx.fillText(line, width / 2, y);
        y += descFontSize * lineHeightMultiplier;
      });

      const dataUrl = canvas.toDataURL('image/png');

      localStorage.setItem(cacheKey, dataUrl);
      setThumbnailSrc(dataUrl);
    };

    generateThumbnail();
  }, [title, description, width, height]);

  return thumbnailSrc;
};

// Sanitize text to prevent XSS or unwanted characters
function sanitizeText(text: string): string {
  return text.replace(/[<>]/g, '').trim();
}

// Generate SHA-256 hash
async function generateSHA256Hash(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  words.forEach(word => {
    const testLine = currentLine + (currentLine ? ' ' : '') + word;
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  });
  if (currentLine) lines.push(currentLine);
  return lines;
}