import { Helmet } from 'react-helmet-async';

interface Author {
  name: string;
  image?: string;
}

interface Props {
  headline: string;
  description: string;
  imageUrl?: string;
  datePublished: string;
  dateModified?: string;
  author: Author;
  url: string;
}

export default function BlogPostingSchema({
  headline,
  description,
  imageUrl,
  datePublished,
  dateModified,
  author,
  url,
}: Props) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline,
    description,
    image: imageUrl || 'https://app.auxilioaomestre.com.br/logo.png',
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: author.name,
      ...(author.image ? { image: author.image } : {}),
    },
    publisher: {
      '@type': 'Organization',
      name: 'Auxílio ao Mestre',
      logo: {
        '@type': 'ImageObject',
        url: 'https://app.auxilioaomestre.com.br/logo.png',
      },
    },
    url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
