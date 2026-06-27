const BLOGGER_URL = 'https://auxilioebd.blogspot.com/feeds/posts/default';

export interface BloggerResponse {
  feed?: {
    entry?: unknown[];
  };
}

export const fetchBlogFeedViaJSONP = (maxResults = 100): Promise<unknown[]> => {
  return new Promise((resolve, reject) => {
    const callbackName = `__blogger_cb_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const script = document.createElement('script');
    const url = `${BLOGGER_URL}?alt=json-in-script&callback=${callbackName}&max-results=${maxResults}`;
    const win = window as unknown as Record<string, unknown>;

    const timeout = setTimeout(() => {
      cleanup();
      reject(new Error('Tempo limite excedido ao carregar o feed'));
    }, 15000);

    const cleanup = () => {
      clearTimeout(timeout);
      delete win[callbackName];
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };

    win[callbackName] = (data: BloggerResponse) => {
      cleanup();
      console.log('Dados recebidos do feed:', data);
      resolve(data?.feed?.entry || []);
    };

    script.onerror = () => {
      cleanup();
      reject(new Error('Erro ao carregar o feed'));
    };

    script.src = url;
    document.body.appendChild(script);
  });
};

export const fetchBlogFeed = fetchBlogFeedViaJSONP;
