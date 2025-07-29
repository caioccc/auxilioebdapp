import { Carousel } from '@mantine/carousel';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Author {
  name: { $t: string };
  email: { $t: string };
  'gd$image'?: { src: string; height: string; width: string };
}

interface ImageCarouselProps {
  id?: string;
  images: string[];
  title: string;
  content: string;
  published: string;
  author: Author;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ id, images, title, content, published, author }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (id) navigate(`/post/${encodeURIComponent(id)}`);
  };
  return (
    <div className="mb-4 cursor-pointer" onClick={handleClick} tabIndex={0} role="button">
      <Carousel
        slideSize="100%"
        slideGap="md"
      >
        {images.map((image, index) => (
          <Carousel.Slide key={index}>
            <img
              src={image || 'https://placehold.co/600x400?font=roboto&text=Sem+Imagem'}
              alt={`Slide ${index + 1}`}
              className="w-full h-auto"
            />
          </Carousel.Slide>
        ))}
      </Carousel>
      <div className="p-2">
        <h2 className="text-lg font-bold mt-2 mb-1">{title}</h2>
        <div className="text-xs text-gray-500 mb-2 flex items-center gap-2">
          {author?.['gd$image']?.src && (
            <img
              src={author['gd$image'].src}
              alt={author.name?.$t}
              width={author['gd$image'].width}
              height={author['gd$image'].height}
              className="rounded-full inline-block align-middle"
              style={{ width: 24, height: 24 }}
            />
          )}
          <span>{author?.name?.$t}</span>
          <span>•</span>
          <span>{new Date(published).toLocaleDateString('pt-BR')}</span>
        </div>
        <div className="text-sm" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};

export default ImageCarousel;