/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card } from '../components/ui';
import { IconArrowLeft } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { loadPostsFromStorage } from '../utils/storage';

const getPostFromStorage = (id: string) => {
  try {
    const posts = loadPostsFromStorage();
    if (!posts) return null;
    return posts.find((p: any) => (p.id?.$t || p.id) === id);
  } catch {
    return null;
  }
};

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    const found = getPostFromStorage(decodeURIComponent(id));
    console.log('Post found:', found);
    if (found) setPost(found);
    else navigate('/blog');
  }, [id, navigate]);

  if (!post) return <div className="text-center py-8">Carregando post...</div>;

  return (
    <div className="max-w-4xl"role="article" aria-labelledby="post-title">
      <div className="mb-4 flex items-center">
        <Button
          variant="subtle"
          color="blue"
          leftSection={<IconArrowLeft size={18} />}
          onClick={() => navigate(-1)}
        >
          Voltar
        </Button>
      </div>
      <h2 id="post-title" className="text-2xl font-bold mb-2">{post.title?.$t || post.title}</h2>
      <div className="flex items-center mb-4 space-x-2">
        {post.author?.[0]?.['gd$image']?.src && (
          <img
            src={post.author[0]['gd$image'].src}
            alt={post.author[0].name?.$t}
            className="w-6 h-6 rounded-full"
          />
        )}
        <span className="text-sm text-gray-600">{post.author?.[0]?.name?.$t}</span>
        <span className="text-sm text-gray-600">•</span>
        <span className="text-sm text-gray-600">{new Date(post.published?.$t || post.published).toLocaleDateString('pt-BR')}</span>
      </div>
      {post.images && post.images.length > 0 && (
        <Card className="mb-4">
          <img src={post.images[0]} alt="Imagem do post" className="w-full h-auto object-cover rounded-md" />
        </Card>
      )}
      <hr className="my-4 border-gray-300" />
      <div className="text-base leading-relaxed ml-6">
        <span dangerouslySetInnerHTML={{ __html: post.content?.$t || post.content }} />
      </div>
      <div className="mt-8 flex justify-center">
        <Button variant="light" color="blue" onClick={() => navigate(-1)}>
          Voltar
        </Button>
      </div>
    </div>
  );
};

export default PostDetail;
