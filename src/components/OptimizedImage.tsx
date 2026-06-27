import React from 'react';

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  webpSrc?: string;
  avifSrc?: string;
}

function imageToWebP(src: string): string {
  if (src.endsWith('.jpg') || src.endsWith('.jpeg')) {
    return src.replace(/\.(jpe?g)$/i, '.webp');
  }
  if (src.endsWith('.png')) {
    return src.replace(/\.png$/i, '.webp');
  }
  return src;
}

function imageToAvif(src: string): string {
  if (src.endsWith('.jpg') || src.endsWith('.jpeg')) {
    return src.replace(/\.(jpe?g)$/i, '.avif');
  }
  if (src.endsWith('.png')) {
    return src.replace(/\.png$/i, '.avif');
  }
  return src;
}

export default function OptimizedImage({
  src,
  alt,
  webpSrc,
  avifSrc,
  className,
  style,
  ...rest
}: Props) {
  const webp = webpSrc || imageToWebP(src);
  const avif = avifSrc || imageToAvif(src);

  return (
    <picture>
      {avif !== src && <source srcSet={avif} type="image/avif" />}
      {webp !== src && <source srcSet={webp} type="image/webp" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={className}
        style={style}
        {...rest}
      />
    </picture>
  );
}
