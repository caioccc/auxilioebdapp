import React, { useState } from 'react';
import { Button, Group } from '@mantine/core';
import { IconRefresh } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import ImageCarousel from '../components/ImageCarousel';
import PostCard from '../components/PostCard';
import useBlogFeed from '../hooks/useBlogFeed';
import type { BlogPost } from '../types/BlogPost';

function getText(val?: string | { $t: string }) {
  if (!val) return '';
  return typeof val === 'string' ? val : val.$t;
}

const Home: React.FC = () => {
  const { posts, loading, error } = useBlogFeed();
  const [refreshing, setRefreshing] = useState(false);
  console.log('Posts:', posts);

  const handleRefresh = async () => {
    if (!navigator.onLine) {
      notifications.show({
        title: 'Sem conexão',
        message: 'É necessário estar online para atualizar os dados.',
        color: 'red',
      });
      return;
    }
    setRefreshing(true);
    try {
      const response = await fetch("https://corsproxy.io/?https://auxilioebd.blogspot.com/feeds/posts/default?alt=json");
      const data = await response.json();
      const entries = data.feed.entry || [];
      localStorage.setItem('posts', JSON.stringify(entries));
      localStorage.setItem('posts_last_fetch', new Date().toISOString());
      notifications.show({
        title: 'Atualizado',
        message: 'Posts atualizados com sucesso!',
        color: 'green',
      });
      window.location.reload();
    } catch (e) {
      notifications.show({
        title: 'Erro',
        message: 'Não foi possível atualizar os posts.',
        color: 'red',
      });
    } finally {
      setRefreshing(false);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro ao carregar posts.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Group justify="space-between" align="center" mb="4">
        <h1 className="text-xl font-bold">Últimos Posts</h1>
        <Button
          variant="subtle"
          color="blue"
          mb={12}
          leftSection={<IconRefresh size={18} />}
          loading={refreshing}
          onClick={handleRefresh}
        >
          Atualizar
        </Button>
      </Group>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(posts as BlogPost[]).map((post, idx) => {
                  const id = getText(post.id) || String(idx);
                  const title = getText(post.title);
                  const content = getText(post.content);
                  const description = getText(post.description);
                  const published = getText(post.published);
                  const author = post.author && post.author[0] && post.author[0].name && post.author[0].email
                    ? {
                        name: post.author[0].name,
                        email: post.author[0].email,
                        ...(post.author[0]['gd$image'] ? { 'gd$image': post.author[0]['gd$image'] } : {})
                      }
                    : {
                        name: { $t: '' },
                        email: { $t: '' },
                        'gd$image': { src: '', height: '', width: '' }
                      };
                  return (
                    <div key={id} className="mb-4">
                      {post.images && post.images.length > 0 ? (
                        <ImageCarousel
                          id={id}
                          images={post.images}
                          title={title}
                          content={content}
                          published={published}
                          author={author}
                        />
                      ) : null}
                      <PostCard
                        id={id}
                        title={title}
                        description={description}
                        imageUrl={post.image}
                        published={published}
                        author={author}
                      />
                    </div>
                  );
                })}
      </div>
    </div>
  );
};

export default Home;
