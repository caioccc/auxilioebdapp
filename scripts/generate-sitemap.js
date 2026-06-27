const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://app.auxilioaomestre.com.br';
const BLOGGER_API_URL = 'https://www.blogger.com/feeds/9177420330410298556/posts/default?alt=json&max-results=500';

async function fetchBloggerPosts() {
  try {
    const res = await fetch(BLOGGER_API_URL);
    const data = await res.json();
    const entries = data.feed?.entry || [];
    return entries.map((entry) => ({
      id: entry.id?.$t || entry.id,
      title: entry.title?.$t || entry.title,
      published: entry.published?.$t || entry.published,
    }));
  } catch (err) {
    console.error('Erro ao buscar posts do Blogger:', err.message);
    return [];
  }
}

function buildSitemapXml(posts) {
  const staticUrls = [
    { loc: `${BASE_URL}/`, changefreq: 'weekly', priority: '1.0' },
    { loc: `${BASE_URL}/blog`, changefreq: 'daily', priority: '0.9' },
  ];

  const postUrls = posts.map((post) => {
    const id = typeof post.id === 'string' ? post.id : post.id?.$t || '';
    const pubDate = post.published
      ? new Date(typeof post.published === 'string' ? post.published : post.published.$t).toISOString()
      : new Date().toISOString();
    return {
      loc: `${BASE_URL}/post/${encodeURIComponent(id)}`,
      lastmod: pubDate,
      changefreq: 'monthly',
      priority: '0.7',
    };
  });

  const allUrls = [...staticUrls, ...postUrls];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  for (const url of allUrls) {
    xml += '  <url>\n';
    xml += `    <loc>${url.loc}</loc>\n`;
    if (url.lastmod) xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    xml += `    <priority>${url.priority}</priority>\n`;
    xml += '  </url>\n';
  }
  xml += '</urlset>\n';
  return xml;
}

async function main() {
  console.log('Buscando posts do Blogger...');
  const posts = await fetchBloggerPosts();
  console.log(`${posts.length} posts encontrados.`);

  const xml = buildSitemapXml(posts);
  const outPath = path.resolve(__dirname, '..', 'public', 'sitemap.xml');
  fs.writeFileSync(outPath, xml, 'utf-8');
  console.log(`Sitemap gerado: ${outPath}`);
}

main();
