import { fetchBlogFeedViaJSONP } from './feedService';

describe('feedService', () => {
  let appendedScripts: HTMLScriptElement[];

  beforeEach(() => {
    appendedScripts = [];
    const realCreate = document.createElement.bind(document);

    jest.spyOn(document, 'createElement').mockImplementation((tag) => {
      if (tag === 'script') {
        const el = realCreate(tag);
        appendedScripts.push(el);
        return el;
      }
      return realCreate(tag);
    });

    jest.spyOn(document.body, 'appendChild').mockImplementation((node) => node);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const getLastScriptSrc = (): string => {
    const script = appendedScripts[appendedScripts.length - 1];
    const src = (script as unknown as { src: string }).src;
    return src || script.getAttribute('src') || '';
  };

  it('constructs URL with correct parameters', () => {
    fetchBlogFeedViaJSONP(200);
    const src = getLastScriptSrc();
    expect(src).toContain('alt=json-in-script');
    expect(src).toContain('callback=');
    expect(src).toContain('max-results=200');
  });

  it('resolves when callback is invoked', async () => {
    const mockData = { feed: { entry: [{ title: 'Post 1' }] } };
    const promise = fetchBlogFeedViaJSONP(50);
    const src = getLastScriptSrc();
    const match = src.match(/callback=([^&]+)/);
    const cbName = match ? match[1] : '';

    const win = window as unknown as Record<string, (data: unknown) => void>;
    if (win[cbName]) {
      win[cbName](mockData);
    }

    const result = await promise;
    expect(result).toEqual([{ title: 'Post 1' }]);
  });

  it('rejects on timeout', async () => {
    jest.useFakeTimers();
    const promise = fetchBlogFeedViaJSONP(100);
    jest.advanceTimersByTime(16000);
    await expect(promise).rejects.toThrow('Tempo limite excedido');
    jest.useRealTimers();
  });
});
