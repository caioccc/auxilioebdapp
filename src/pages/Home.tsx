import React from 'react';
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
  console.log('Posts:', posts);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading posts: {typeof error === 'string' ? error : JSON.stringify(error)}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Últimos Posts</h1>
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
