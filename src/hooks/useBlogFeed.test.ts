import { renderHook, act, waitFor } from '@testing-library/react';
import axios from 'axios';
import { useBlogFeed } from './useBlogFeed';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock navigator.onLine
Object.defineProperty(window.navigator, 'onLine', {
  writable: true,
  value: true,
});

// Mock notifications
jest.mock('@mantine/notifications', () => ({
  notifications: {
    show: jest.fn(),
  },
}));

describe('useBlogFeed', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
  });

  it('fetches posts on mount when online and no cache', async () => {
    const mockData = { feed: { entry: [{ title: 'Post 1' }] } };
    mockedAxios.get.mockResolvedValue({ data: mockData });

    const { result } = renderHook(() => useBlogFeed());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.posts).toEqual([{ title: 'Post 1' }]);
    expect(localStorageMock.setItem).toHaveBeenCalled();
  });

  it('loads from cache if available and same day', async () => {
    const cachedPosts = [{ title: 'Cached Post' }];
    localStorageMock.getItem.mockImplementation((key) => {
      if (key === 'posts') return JSON.stringify(cachedPosts);
      if (key === 'posts_last_fetch') return new Date().toISOString();
      return null;
    });

    const { result } = renderHook(() => useBlogFeed());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.posts).toEqual(cachedPosts);
    expect(mockedAxios.get).not.toHaveBeenCalled();
  });

  it('filters posts based on search query', async () => {
    const posts = [
      { title: { $t: 'React' }, content: { $t: 'About React' } },
      { title: { $t: 'Vue' }, content: { $t: 'About Vue' } },
    ];
    mockedAxios.get.mockResolvedValue({ data: { feed: { entry: posts } } });

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

    expect(result.current.posts[0].title.$t).toBe('React');
  });

  it('handles posts without imageUrl by ensuring thumbnail generation is possible', async () => {
    const posts = [
      { title: { $t: 'Post without image' }, content: { $t: 'Description' } },
      { title: { $t: 'Post with image' }, content: { $t: 'Description' }, media$thumbnail: { url: 'http://example.com/image.jpg' } },
    ];
    mockedAxios.get.mockResolvedValue({ data: { feed: { entry: posts } } });

    const { result } = renderHook(() => useBlogFeed());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.posts).toHaveLength(2);
    // Note: Actual thumbnail generation is tested in useThumbnail and PostCard tests
  });
});