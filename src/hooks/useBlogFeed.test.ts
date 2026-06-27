import { renderHook, waitFor } from '@testing-library/react';
import useBlogFeed from './useBlogFeed';
import { fetchBlogFeedViaJSONP } from '../services/feedService';
import { savePostsToStorage, loadPostsFromStorage, getLastFetchDate } from '../utils/storage';

jest.mock('../services/feedService');
jest.mock('../utils/storage');

const mockedFetchJSONP = fetchBlogFeedViaJSONP as jest.MockedFunction<typeof fetchBlogFeedViaJSONP>;
const mockedSavePosts = savePostsToStorage as jest.MockedFunction<typeof savePostsToStorage>;
const mockedLoadPosts = loadPostsFromStorage as jest.MockedFunction<typeof loadPostsFromStorage>;
const mockedGetLastFetch = getLastFetchDate as jest.MockedFunction<typeof getLastFetchDate>;

jest.mock('@mantine/notifications', () => ({
  notifications: {
    show: jest.fn(),
  },
}));

Object.defineProperty(window.navigator, 'onLine', {
  writable: true,
  value: true,
});

describe('useBlogFeed', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches posts on mount when online and no cache', async () => {
    mockedLoadPosts.mockReturnValue(null);
    mockedGetLastFetch.mockReturnValue(null);
    mockedFetchJSONP.mockResolvedValue([{ title: 'Post 1' }]);

    const { result } = renderHook(() => useBlogFeed());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.posts).toEqual([{ title: 'Post 1' }]);
    expect(mockedSavePosts).toHaveBeenCalledWith([{ title: 'Post 1' }]);
  });

  it('loads from cache if available and same day', async () => {
    const cachedPosts = [{ title: 'Cached Post' }];
    mockedLoadPosts.mockReturnValue(cachedPosts);
    mockedGetLastFetch.mockReturnValue(new Date().toISOString());

    const { result } = renderHook(() => useBlogFeed());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.posts).toEqual(cachedPosts);
    expect(mockedFetchJSONP).not.toHaveBeenCalled();
  });

  it('filters posts based on search query', async () => {
    const posts = [
      { title: { $t: 'React' }, content: { $t: 'About React' } },
      { title: { $t: 'Vue' }, content: { $t: 'About Vue' } },
    ];
    mockedLoadPosts.mockReturnValue(null);
    mockedGetLastFetch.mockReturnValue(null);
    mockedFetchJSONP.mockResolvedValue(posts);

    const { result, rerender } = renderHook(({ query }) => useBlogFeed(query), {
      initialProps: { query: '' },
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.posts).toHaveLength(2);

    rerender({ query: 'React' });

    await waitFor(() => {
      expect(result.current.posts).toHaveLength(1);
    });

    const postsArray = result.current.posts as Array<{ title?: { $t?: string } }>;
    expect(postsArray[0]?.title?.$t).toBe('React');
  });

  it('handles posts without imageUrl', async () => {
    const posts = [
      { title: { $t: 'Post without image' }, content: { $t: 'Description' } },
      { title: { $t: 'Post with image' }, content: { $t: 'Description' }, media$thumbnail: { url: 'http://example.com/image.jpg' } },
    ];
    mockedLoadPosts.mockReturnValue(null);
    mockedGetLastFetch.mockReturnValue(null);
    mockedFetchJSONP.mockResolvedValue(posts);

    const { result } = renderHook(() => useBlogFeed());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.posts).toHaveLength(2);
  });

  it('exposes refetch function', async () => {
    mockedLoadPosts.mockReturnValue(null);
    mockedGetLastFetch.mockReturnValue(null);
    mockedFetchJSONP.mockResolvedValue([{ title: 'First fetch' }]);

    const { result } = renderHook(() => useBlogFeed());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.refetch).toBeDefined();
    expect(typeof result.current.refetch).toBe('function');
  });
});
