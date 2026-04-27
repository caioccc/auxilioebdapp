import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from './ui/Card';
import { useThumbnail } from '../hooks/useThumbnail';

interface Author {
  name: { $t: string };
  email: { $t: string };
  'gd$image'?: { src: string; height: string; width: string };
}

interface PostCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  published: string;
  author: Author;
}

const PostCard: React.FC<PostCardProps> = ({ id, title, description, imageUrl, published, author }) => {
  const navigate = useNavigate();
  // Gera thumbnail dinâmica se não houver imagem personalizada
  const thumbnail = useThumbnail({ title, description });
  const handleClick = () => {
    navigate(`/post/${encodeURIComponent(id)}`);
  };

  // Usa imagem personalizada ou thumbnail gerada
  const imageSrc = imageUrl || thumbnail;

  return (
    <Card className="max-w-sm cursor-pointer hover:shadow-lg transition-shadow duration-200">
      <button
        onClick={handleClick}
        tabIndex={0}
        role="button"
        aria-label={`Ver post: ${title}`}
        aria-describedby={`post-description-${id}`}
        style={{
          width: '100%',
          border: 'none',
          background: 'transparent',
          padding: 0,
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <img
          className="w-full h-48 object-cover rounded-t-lg"
          src={imageSrc}
          alt={`Thumbnail para o post: ${title}`}
          loading="lazy"
        />
        <div className="p-4">
          <h2 className="font-bold text-xl mb-2 text-gray-900">{title}</h2>
          <div className="text-xs text-gray-500 mb-3 flex items-center gap-2">
            {author?.['gd$image']?.src && (
              <img
                src={author['gd$image'].src}
                alt={`Avatar de ${author.name?.$t}`}
                width={author['gd$image'].width}
                height={author['gd$image'].height}
                className="rounded-full inline-block align-middle"
                style={{ width: 24, height: 24 }}
                loading="lazy"
              />
            )}
            <span>{author?.name?.$t}</span>
            <span>•</span>
            <span>{new Date(published).toLocaleDateString('pt-BR')}</span>
          </div>
          <p id={`post-description-${id}`} className="text-gray-700 text-base line-clamp-3">{description}</p>
        </div>
      </button>
    </Card>
  );
};

export default PostCard;