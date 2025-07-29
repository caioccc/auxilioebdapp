/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";

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
        console.log("Blog feed fetched successfully:", response.data);
        const entries = response.data.feed.entry || [];
        setPosts(entries);
        try {
          localStorage.setItem('posts', JSON.stringify(entries));
        } catch (e) {
          console.warn('Não foi possível salvar os posts no localStorage:', e);
        }
      } catch (err: any) {
        console.error("Error fetching blog feed:", err);
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
    if (navigator.onLine) {
      fetchBlogFeed();
    } else {
      const localPosts = localStorage.getItem('posts');
      if (localPosts) {
        try {
          const parsed = JSON.parse(localPosts);
          setPosts(parsed);
        } catch (e) {
          console.warn('Erro ao ler posts do localStorage:', e);
        }
      }
      setLoading(false);
    }
  }, []);

  return { posts, loading, error };
};

export default useBlogFeed;
