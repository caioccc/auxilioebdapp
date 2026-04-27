# Guia de Personalização de Thumbnails

Este guia explica como personalizar as thumbnails dinâmicas geradas pelo hook `useThumbnail` no projeto AuxilioEBD App.

## Visão Geral

As thumbnails dinâmicas são geradas automaticamente quando um post do blog não possui uma imagem personalizada. Elas são criadas usando a Canvas API do navegador, exibindo o título e descrição do post em um layout simples.

## Como Funciona

1. **Geração**: O hook `useThumbnail` recebe título, descrição, largura e altura.
2. **Sanitização**: Os textos são limpos para remover caracteres potencialmente perigosos.
3. **Cache**: Um hash SHA-256 é gerado para cachear a thumbnail no localStorage.
4. **Renderização**: Um canvas é usado para desenhar fundo, título e descrição.
5. **Fallback**: Se o canvas não estiver disponível, uma imagem transparente é usada.

## Personalização

### Alterando Cores e Estilos

Edite o arquivo `src/hooks/useThumbnail.ts` para modificar:

- **Fundo**: Mude `ctx.fillStyle = '#1e40af';` para outra cor.
- **Título**: Altere `ctx.fillStyle = '#ffffff';` e `ctx.font = 'bold 24px Arial';`.
- **Descrição**: Modifique `ctx.fillStyle = '#e5e7eb';` e `ctx.font = '16px Arial';`.

### Alterando Layout

- Ajuste as posições `y` para mover texto verticalmente.
- Modifique `wrapText` para alterar quebra de linha.
- Altere margens (atualmente `width - 40`).

### Dimensões Padrão

Passe `width` e `height` no hook para sobrescrever os padrões (600x400).

## Exemplos de Uso

### Uso Básico
```tsx
const thumbnail = useThumbnail({ title: "Meu Post", description: "Descrição breve" });
```

### Com Dimensões Personalizadas
```tsx
const thumbnail = useThumbnail({ title: "Meu Post", description: "Descrição", width: 800, height: 600 });
```

### No Componente PostCard
O hook é usado automaticamente no `PostCard.tsx` como fallback.

## Considerações

- As thumbnails são cacheadas no localStorage para performance.
- Certifique-se de que o navegador suporte Canvas API.
- Para mudanças avançadas, considere adicionar mais opções ao hook (ex: cores customizáveis).

## Testes

Execute os testes em `useThumbnail.test.ts` para validar mudanças.</content>
<parameter name="filePath">c:\Users\caiom\Documents\auxilioebd\auxilioebdapp\THUMBNAILS_GUIDE.md