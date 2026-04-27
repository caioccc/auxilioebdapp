import axios from 'axios';
import { fetchBlogFeed } from './feedService';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('feedService', () => {
  it('fetches blog feed successfully', async () => {
    const mockData = { feed: { entry: [{ title: 'Post' }] } };
    mockedAxios.get.mockResolvedValue({ data: mockData });

    const result = await fetchBlogFeed();
    expect(result).toEqual([{ title: 'Post' }]);
    expect(mockedAxios.get).toHaveBeenCalledWith('https://auxilioebd.blogspot.com/feeds/posts/default?alt=json');
  });

  it('throws error on fetch failure', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Network error'));

    await expect(fetchBlogFeed()).rejects.toThrow('Network error');
  });
});