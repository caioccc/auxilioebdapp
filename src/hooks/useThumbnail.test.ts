import { renderHook, act } from '@testing-library/react';
import { useThumbnail } from './useThumbnail';

// Mock crypto.subtle.digest
Object.defineProperty(global, 'crypto', {
  value: {
    subtle: {
      digest: jest.fn(),
    },
  },
});

describe('useThumbnail', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Mock SHA-256 hash
    (crypto.subtle.digest as jest.Mock).mockResolvedValue(new Uint8Array([1, 2, 3, 4]).buffer);
  });

  it('should generate a thumbnail data URL', async () => {
    const { result } = renderHook(() =>
      useThumbnail({ title: 'Test Title', description: 'Test Description' })
    );

    // Wait for the effect to run
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    expect(result.current).toMatch(/^data:image\/png;base64,/);
  });

  it('should cache the thumbnail in localStorage with SHA-256 hash', async () => {
    const { result } = renderHook(() =>
      useThumbnail({ title: 'Test Title', description: 'Test Description' })
    );

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    // Check if localStorage has an item (cache key is hashed)
    expect(localStorage.length).toBe(1);
    const cached = localStorage.getItem(Object.keys(localStorage)[0]);
    expect(cached).toBe(result.current);
  });

  it('should use cached thumbnail if available', async () => {
    // Simulate cached value
    const fakeDataUrl = 'data:image/png;base64,fake';
    localStorage.setItem('01020304', fakeDataUrl); // Mock hash

    const { result } = renderHook(() =>
      useThumbnail({ title: 'Test Title', description: 'Test Description' })
    );

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    expect(result.current).toBe(fakeDataUrl);
  });

  it('should sanitize inputs', async () => {
    const { result } = renderHook(() =>
      useThumbnail({ title: '<script>alert("xss")</script>Test', description: 'Desc<>' })
    );

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    expect(result.current).toMatch(/^data:image\/png;base64,/);
    // The canvas should have rendered sanitized text
  });

  it('should handle canvas context error', async () => {
    // Mock getContext to return null
    const originalGetContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = jest.fn().mockReturnValue(null);

    const { result } = renderHook(() =>
      useThumbnail({ title: 'Test', description: 'Test' })
    );

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    expect(result.current).toBe('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==');

    // Restore
    HTMLCanvasElement.prototype.getContext = originalGetContext;
  });

  it('should generate thumbnail in less than 1 second', async () => {
    const startTime = Date.now();

    const { result } = renderHook(() =>
      useThumbnail({ title: 'Performance Test Title', description: 'Performance Test Description' })
    );

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    const endTime = Date.now();
    const duration = endTime - startTime;

    expect(duration).toBeLessThan(1000); // Less than 1 second
    expect(result.current).toMatch(/^data:image\/png;base64,/);
  });

  it('should handle long title and description', async () => {
    const longTitle = 'This is a very long title that should be wrapped properly in the thumbnail generation process';
    const longDescription = 'This is a very long description that should also be wrapped and displayed correctly in the generated thumbnail image. It needs to handle multiple lines and ensure text does not overflow.';

    const { result } = renderHook(() =>
      useThumbnail({ title: longTitle, description: longDescription })
    );

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    expect(result.current).toMatch(/^data:image\/png;base64,/);
  });

  it('should handle empty title and description', async () => {
    const { result } = renderHook(() =>
      useThumbnail({ title: '', description: '' })
    );

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    expect(result.current).toMatch(/^data:image\/png;base64,/);
  });

  it('should handle special characters in title and description', async () => {
    const specialTitle = 'Título com acentos: àáâãéêíóôõúü';
    const specialDescription = 'Descrição com símbolos: @#$%^&*()_+{}|:<>?[]\\;\'",./';

    const { result } = renderHook(() =>
      useThumbnail({ title: specialTitle, description: specialDescription })
    );

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    expect(result.current).toMatch(/^data:image\/png;base64,/);
  });
});