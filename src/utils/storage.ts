import LZString from 'lz-string';

const POSTS_KEY = 'posts';
const LAST_FETCH_KEY = 'posts_last_fetch';

export const savePostsToStorage = (entries: unknown[]): void => {
  const json = JSON.stringify(entries);
  const compressed = LZString.compress(json);
  localStorage.setItem(POSTS_KEY, compressed);
  localStorage.setItem(LAST_FETCH_KEY, new Date().toISOString());
};

export const loadPostsFromStorage = (): unknown[] | null => {
  const compressed = localStorage.getItem(POSTS_KEY);
  if (!compressed) return null;
  const json = LZString.decompress(compressed);
  if (!json) return null;
  return JSON.parse(json) as unknown[];
};

export const getLastFetchDate = (): string | null => {
  return localStorage.getItem(LAST_FETCH_KEY);
};
