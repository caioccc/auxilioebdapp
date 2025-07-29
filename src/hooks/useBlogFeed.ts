/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { notifications } from '@mantine/notifications';

const useBlogFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogFeed = async () => {
      try {
        const response = await axios.get(
          "https://corsproxy.io/?https://auxilioebd.blogspot.com/feeds/posts/default?alt=json"
        );
        const entries = response.data.feed.entry || [];
        setPosts(entries);
        try {
          localStorage.setItem('posts', JSON.stringify(entries));
          localStorage.setItem('posts_last_fetch', new Date().toISOString());
        } catch (e) {
          console.warn('Não foi possível salvar os posts no localStorage:', e);
        }
      } catch (err: any) {
        setError(err.message || "Erro ao carregar o feed");
        // Sempre tenta carregar do localStorage em caso de erro
        const localPosts = localStorage.getItem('posts');
        if (localPosts) {
          try {
            const parsed = JSON.parse(localPosts);
            setPosts(parsed);
          } catch (e) {
            console.warn('Erro ao ler posts do localStorage:', e);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    const localPosts = localStorage.getItem('posts');
    const lastFetch = localStorage.getItem('posts_last_fetch');
    const today = new Date().toISOString().slice(0, 10);
    const lastFetchDay = lastFetch ? lastFetch.slice(0, 10) : null;

    if (!navigator.onLine) {
      if (localPosts) {
        try {
          const parsed = JSON.parse(localPosts);
          setPosts(parsed);
        } catch (e) {
          console.warn('Erro ao ler posts do localStorage:', e);
        }
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

    // Se tem internet
    if (!localPosts || lastFetchDay !== today) {
      fetchBlogFeed();
    } else {
      try {
        const parsed = JSON.parse(localPosts);
        setPosts(parsed);
      } catch (e) {
        fetchBlogFeed();
      }
      setLoading(false);
    }
  }, []);

  return { posts, loading, error };
};

export default useBlogFeed;
