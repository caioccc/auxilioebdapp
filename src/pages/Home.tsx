import React, { useState } from 'react';
import { IconRefresh, IconSearch } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import ImageCarousel from '../components/ImageCarousel';
import PostCard from '../components/PostCard';
import useBlogFeed from '../hooks/useBlogFeed';
import { TextInput, Button, BottomNavigation } from '../components/ui';
import type { BlogPost } from '../types/BlogPost';

function getText(val?: string | { $t: string }) {
  if (!val) return '';
  return typeof val === 'string' ? val : val.$t;
}

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { posts, loading, error, refetch } = useBlogFeed(searchQuery);
  const [refreshing, setRefreshing] = useState(false);

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
      await refetch();
      notifications.show({
        title: 'Atualizado',
        message: 'Posts atualizados com sucesso!',
        color: 'green',
      });
    } catch {
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
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Erro ao carregar posts: {error}</p>
          <Button onClick={handleRefresh} leftSection={<IconRefresh size={18} />}>
            Tentar novamente
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Últimos Posts</h1>
            <Button
              variant="subtle"
              color="blue"
              leftSection={<IconRefresh size={18} />}
              loading={refreshing}
              onClick={handleRefresh}
              aria-label="Atualizar posts"
            >
              Atualizar
            </Button>
          </div>
        </div>
      </header>

      {/* Search */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <TextInput
            placeholder="Buscar posts por título ou conteúdo..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.currentTarget.value)}
            leftSection={<IconSearch size={16} />}
            aria-label="Buscar posts"
            autoComplete="off"
            className="w-full"
          />
        </div>
      </div>

      {/* Posts Grid */}
      <main className="container mx-auto px-4 py-6">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Nenhum post encontrado.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                <div key={id} className="flex flex-col">
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
        )}
      </main>
      <BottomNavigation />
    </div>
  );
}

export default Home;
