import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Author {
  name: { $t: string };
  email: { $t: string };
  'gd$image'?: { src: string; height: string; width: string };
}

interface PostCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  published: string;
  author: Author;
}

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
  const handleClick = () => {
    navigate(`/post/${encodeURIComponent(id)}`);
  };
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer" onClick={handleClick} tabIndex={0} role="button">
      <img
        className="w-full h-48 object-cover"
        src={imageUrl || 'https://placehold.co/600x400?font=roboto&text=' + encodeURIComponent(title)}
        alt={title}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-1">{title}</div>
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
        <p className="text-gray-700 text-base">{description}</p>
      </div>
    </div>
  );
};

export default PostCard;