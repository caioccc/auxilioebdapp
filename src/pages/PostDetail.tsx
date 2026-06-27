/* eslint-disable @typescript-eslint/no-explicit-any */
import { Helmet } from 'react-helmet-async';
import { Button, Card } from '../components/ui';
import { IconArrowLeft } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { loadPostsFromStorage } from '../utils/storage';
import OrganizationSchema from '../components/SEO/OrganizationSchema';
import BreadcrumbSchema from '../components/SEO/BreadcrumbSchema';
import BlogPostingSchema from '../components/SEO/BlogPostingSchema';

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
    if (found) setPost(found);
    else navigate('/blog');
  }, [id, navigate]);

  if (!post) return <div className="text-center py-8">Carregando post...</div>;

  const postTitle = post.title?.$t || post.title || '';
  const postDescription = post.description?.$t || post.description || postTitle;
  const postImage = post.images?.[0] || '';
  const postPublished = post.published?.$t || post.published || '';
  const authorName = post.author?.[0]?.name?.$t || '';
  const authorImage = post.author?.[0]?.['gd$image']?.src || '';
  const postUrl = `https://app.auxilioaomestre.com.br/post/${encodeURIComponent(id || '')}`;

  return (
    <>
      <Helmet>
        <title>{postTitle} - Auxílio ao Mestre | EBD</title>
        <meta name="description" content={postDescription} />
        <meta name="keywords" content="EBD, escola bíblica dominical, CPAD, lição, estudo bíblico" />
        <meta property="og:title" content={`${postTitle} - Auxílio ao Mestre`} />
        <meta property="og:description" content={postDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={postUrl} />
        <meta property="og:image" content={postImage || 'https://app.auxilioaomestre.com.br/logo.png'} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${postTitle} - Auxílio ao Mestre`} />
        <meta name="twitter:description" content={postDescription} />
        <meta name="twitter:image" content={postImage || 'https://app.auxilioaomestre.com.br/logo.png'} />
        <link rel="canonical" href={postUrl} />
      </Helmet>
      <OrganizationSchema />
      <BreadcrumbSchema
        items={[
          { name: 'Início', url: 'https://app.auxilioaomestre.com.br/' },
          { name: 'Blog', url: 'https://app.auxilioaomestre.com.br/blog' },
          { name: postTitle, url: postUrl },
        ]}
      />
      <BlogPostingSchema
        headline={postTitle}
        description={postDescription}
        imageUrl={postImage}
        datePublished={postPublished}
        author={{ name: authorName, image: authorImage }}
        url={postUrl}
      />
      <div className="max-w-4xl" role="article" aria-labelledby="post-title">
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
          <img src={post.images[0]} alt={postTitle} className="w-full h-auto object-cover rounded-md" />
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
    </>
  );
};

export default PostDetail;
