import { Helmet } from 'react-helmet-async';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Auxílio ao Mestre',
  alternateName: 'Auxilio EBD',
  url: 'https://app.auxilioaomestre.com.br',
  logo: 'https://app.auxilioaomestre.com.br/logo.png',
  description:
    'Plataforma com lições, recursos e mentoria para professores da Escola Bíblica Dominical.',
  sameAs: [
    'https://auxilioaomestre.com.br/',
  ],
};

export default function OrganizationSchema() {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
    </Helmet>
  );
}
