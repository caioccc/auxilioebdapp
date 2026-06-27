import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PostCard from './PostCard';
import { useThumbnail } from '../hooks/useThumbnail';

// Mock useThumbnail
jest.mock('../hooks/useThumbnail');
const mockUseThumbnail = useThumbnail as jest.MockedFunction<typeof useThumbnail>;

describe('PostCard', () => {
  const mockProps = {
    id: '1',
    title: 'Test Post',
    description: 'Test Description',
    published: '2023-01-01T00:00:00.000Z',
    author: {
      name: { $t: 'Author Name' },
      email: { $t: 'author@example.com' },
    },
  };

  beforeEach(() => {
    mockUseThumbnail.mockReturnValue('data:image/png;base64,thumbnail');
  });

  it('uses imageUrl when provided', () => {
    render(
      <MemoryRouter>
        <PostCard {...mockProps} imageUrl="http://example.com/image.jpg" />
      </MemoryRouter>
    );

    const img = screen.getByAltText('Test Post') as HTMLImageElement;
    expect(img.src).toBe('http://example.com/image.jpg');
  });

  it('falls back to thumbnail when imageUrl is not provided', () => {
    render(
      <MemoryRouter>
        <PostCard {...mockProps} />
      </MemoryRouter>
    );

    const img = screen.getByAltText('Test Post') as HTMLImageElement;
    expect(img.src).toBe('data:image/png;base64,thumbnail');
  });

  it('navigates to post detail on click', () => {
    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate,
    }));

    render(
      <MemoryRouter>
        <PostCard {...mockProps} />
      </MemoryRouter>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith('/post/1');
  });
});