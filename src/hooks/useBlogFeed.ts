import { useEffect, useState, useMemo, useCallback } from "react";
import { notifications } from '@mantine/notifications';
import { fetchBlogFeedViaJSONP } from '../services/feedService';
import { savePostsToStorage, loadPostsFromStorage, getLastFetchDate } from '../utils/storage';

const useBlogFeed = (searchQuery: string = '') => {
  const [posts, setPosts] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filteredPosts = useMemo(() => {
    if (!debouncedQuery) return posts;
    return posts.filter((post: any) => {
      const title = (post.title?.$t || post.title || '').toLowerCase();
      const content = (post.content?.$t || post.content || '').toLowerCase();
      const query = debouncedQuery.toLowerCase();
      return title.includes(query) || content.includes(query);
    });
  }, [posts, debouncedQuery]);

  const fetchBlogFeed = useCallback(async () => {
    try {
      const entries = await fetchBlogFeedViaJSONP(100);
      setPosts(entries);
      try {
        savePostsToStorage(entries);
      } catch (e) {
        console.warn('Não foi possível salvar os posts no localStorage:', e);
      }
      return entries;
    } catch (err: any) {
      const msg = err.message || "Erro ao carregar o feed";
      setError(msg);
      const localPosts = loadPostsFromStorage();
      if (localPosts) {
        setPosts(localPosts);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const localPosts = loadPostsFromStorage();
    const lastFetch = getLastFetchDate();
    const today = new Date().toISOString().slice(0, 10);
    const lastFetchDay = lastFetch ? lastFetch.slice(0, 10) : null;

    if (!navigator.onLine) {
      if (localPosts) {
        setPosts(localPosts);
      } else {
        notifications.show({
          title: 'Sem conexão',
          message: 'É necessário ter internet na primeira vez para carregar os dados.',
          color: 'red',
        });
      }
      setLoading(false);
      return;
    }

    if (!localPosts || lastFetchDay !== today) {
      fetchBlogFeed();
    } else {
      setPosts(localPosts);
      setLoading(false);
    }
  }, [fetchBlogFeed]);

  return { posts: filteredPosts, loading, error, refetch: fetchBlogFeed };
};

export { useBlogFeed };
export default useBlogFeed;
