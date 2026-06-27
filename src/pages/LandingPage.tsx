import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  Badge,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Title,
  Anchor,
  Accordion,
  Divider,
  ThemeIcon,
  rem,
  useMantineTheme,
} from '@mantine/core';
import {
  IconBrandWhatsapp,
  IconHeartHandshake,
  IconTools,
  IconUsers,
  IconMessage,
  IconBook,
  IconCompass,
  IconDownload,
  IconCalendar,
  IconFileCertificate,
  IconStar,
} from '@tabler/icons-react';
import OrganizationSchema from '../components/SEO/OrganizationSchema';
import FaqSchema from '../components/SEO/FaqSchema';

// ─── Data ────────────────────────────────────────────────────────────────────

const WA_NUMBER = '5583987301186';
const waLink = (msg: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

const painPoints = [
  {
    icon: <IconTools size={28} />,
    title: 'Falta de plano de aula',
    desc: 'Horas gastas tentando organizar o conteúdo sem um roteiro claro ou estrutura pedagógica.',
  },
  {
    icon: <IconUsers size={28} />,
    title: 'Sala vazia',
    desc: 'Alunos que vêm uma vez e somem — ou que nunca chegam a aparecer.',
  },
  {
    icon: <IconMessage size={28} />,
    title: 'Desânimo e tristeza',
    desc: 'A sensação de que o esforço não vale a pena quando a aula não engaja.',
  },
];

const pillars = [
  {
    icon: <IconBook size={32} />,
    title: 'Aprofundamento Exegético',
    desc: 'Análise profunda da lição original por especialista — contexto histórico, linguístico e teológico que transforma sua preparação.',
  },
  {
    icon: <IconTools size={32} />,
    title: 'Subsídios de Auxílio',
    desc: 'Slides prontos, reflexões aplicáveis, ilustrações e recursos didáticos de excelente qualidade para cada domingo.',
  },
  {
    icon: <IconCompass size={32} />,
    title: 'Orientação Prática',
    desc: 'Acompanhamento individualizado para que você nunca mais enfrente o domingo sem preparo e confiança.',
  },
];

const deliverables = [
  {
    icon: <IconDownload size={28} />,
    title: '13 Lições do Trimestre',
    desc: 'Acesso imediato, para download no celular ou PC. Todo o trimestre em suas mãos desde o primeiro dia.',
  },
  {
    icon: <IconCalendar size={28} />,
    title: 'Material de Apoio Semanal',
    desc: '7 PDFs curtos e objetivos liberados semana a semana, conforme a confecção da lição.',
  },
  {
    icon: <IconFileCertificate size={28} />,
    title: 'Certificados de Bônus',
    desc: '2 modelos editáveis ao término do trimestre para baixar, personalizar e imprimir para seus alunos.',
  },
];

interface Plan {
  title: string;
  price: string;
  subtitle: string;
  detail: string;
  image: string | null;
  highlight: boolean;
  waMsg: string;
}

const plans: Plan[] = [
  {
    title: 'Trimestral',
    price: 'R$ 45',
    subtitle: 'por trimestre',
    detail: 'Equivale a R$ 3,46 por lição',
    image: null,
    highlight: false,
    waMsg: 'Olá! Quero adquirir o plano Trimestral da Mentoria RHEMA por R$ 45,00.',
  },
  {
    title: 'Anual',
    price: 'R$ 135',
    subtitle: 'por ano',
    detail: 'Apenas R$ 33,75 por trimestre — o mais escolhido',
    image: null,
    highlight: true,
    waMsg: 'Olá! Quero adquirir o plano Anual da Mentoria RHEMA por R$ 135,00.',
  },
  {
    title: 'Completo Trimestral',
    price: 'R$ 65',
    subtitle: 'Adultos + Jovens',
    detail: 'Os dois públicos num só plano, pelo trimestre',
    image: null,
    highlight: false,
    waMsg: 'Olá! Quero adquirir o plano Completo Trimestral (Adultos + Jovens) por R$ 65,00.',
  },
  {
    title: 'Completo Anual',
    price: 'R$ 179',
    subtitle: 'Adultos + Jovens / ano',
    detail: 'O melhor custo-benefício para professores dos dois grupos',
    image: null,
    highlight: false,
    waMsg: 'Olá! Quero adquirir o plano Completo Anual (Adultos + Jovens) por R$ 179,00.',
  },
];

const faqData = [
  {
    q: 'Como funciona o acesso ao material?',
    a: 'Após a confirmação do pagamento, você recebe via WhatsApp o link de acesso imediato às 13 lições do trimestre em formato PDF, prontas para download no celular ou computador.',
  },
  {
    q: 'Qual plano devo escolher?',
    a: 'Se você é professor de Adultos ou Jovens, os planos individuais (Trimestral ou Anual) atendem perfeitamente. Se leciona para os dois grupos ou deseja ter o material completo, os planos Completo são a melhor opção.',
  },
  {
    q: 'Receberei algum Certificado?',
    a: 'Sim! Ao término de cada trimestre, você recebe 2 modelos de certificado editáveis para baixar, personalizar com os dados dos seus alunos e imprimir.',
  },
  {
    q: 'Posso cancelar minha assinatura a qualquer momento?',
    a: 'Sim, sem burocracia. Entre em contato via WhatsApp e o cancelamento é feito imediatamente, sem multas ou taxas.',
  },
  {
    q: 'Como funciona a liberação do Material da EBD?',
    a: 'As 13 lições do trimestre ficam disponíveis de imediato. Além disso, 7 PDFs de apoio semanal são liberados semana a semana, no ritmo da preparação da lição.',
  },
  {
    q: 'Preciso renovar minha assinatura?',
    a: 'Planos trimestrais são renovados a cada 3 meses; planos anuais, a cada 12 meses. Você será avisado com antecedência para decidir se deseja continuar.',
  },
  {
    q: 'Posso fazer download do material?',
    a: 'Sim! Todos os materiais estão em PDF e podem ser baixados para o celular, tablet ou computador e consultados offline quando quiser.',
  },
  {
    q: 'Posso compartilhar o material?',
    a: 'O material é de uso pessoal e intransferível, licenciado para o professor assinante. Compartilhar com terceiros viola os direitos autorais e os termos de uso.',
  },
];

// ─── Animations ──────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function MentoriaRhema() {
  const theme = useMantineTheme();

  return (
    <>
      <Helmet>
        <title>Mentoria RHEMA — Transforme suas aulas da EBD</title>
        <meta
          name="description"
          content="Mentoria RHEMA: ferramenta completa com profundidade exegética, subsídios prontos e orientação prática para professores da EBD (CPAD Adultos e Jovens)."
        />
        <meta property="og:title" content="Mentoria RHEMA — Transforme suas aulas da EBD" />
        <meta
          property="og:description"
          content="Da sala vazia a um ensino que edifica e retém os alunos. Descubra a Mentoria RHEMA."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://app.auxilioaomestre.com.br/" />
        <meta
          name="keywords"
          content="EBD, escola bíblica dominical, CPAD, mentoria, professor, aula, ensino, rhema"
        />
        <link rel="canonical" href="https://app.auxilioaomestre.com.br/" />
      </Helmet>
      <FaqSchema items={faqData.map(({ q, a }) => ({ question: q, answer: a }))} />
      <OrganizationSchema />

      <AppShell header={{ height: 70 }}>
        {/* ── HEADER ──────────────────────────────────────────────── */}
        <AppShellHeader
          style={{
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            background: 'rgba(255,255,255,0.85)',
            borderBottom: `1px solid ${theme.colors.gray[2]}`,
            zIndex: 200,
          }}
        >
          <Container size="xl" h="100%">
            <Flex align="center" justify="space-between" h="100%">
              {/* Logo + Brand */}
              <Group gap="sm">
                <Image src="/logo2.png" h={46} w="auto" fit="contain" />
                <Text
                  visibleFrom="sm"
                  fw={700}
                  fz="lg"
                  c="blue.9"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  Mentoria RHEMA
                </Text>
              </Group>

              {/* Nav */}
              <Group gap="xl" visibleFrom="md">
                {['Planos', 'FAQ', 'Blog'].map((item) => (
                  <Anchor
                    key={item}
                    href={`${item.toLowerCase() !== 'blog' ? `#${item.toLowerCase()}` : '/blog'}`}
                    c="gray.7"
                    fz="sm"
                    fw={500}
                    underline="never"
                    style={{ transition: 'color 0.2s' }}
                  >
                    {item}
                  </Anchor>
                ))}
                <Button
                  component="a"
                  href={waLink('Olá! Gostaria de saber mais sobre a Mentoria RHEMA.')}
                   target="_blank"
                   rel="noopener noreferrer"
                  color="orange.6"
                  size="sm"
                  radius="xl"
                  leftSection={<IconBrandWhatsapp size={16} />}
                >
                  Fale Conosco
                </Button>
              </Group>

              {/* Mobile CTA */}
              <Button
                hiddenFrom="md"
                component="a"
                href={waLink('Olá! Gostaria de saber mais sobre a Mentoria RHEMA.')}
                target="_blank"
                  rel="noopener noreferrer"
                  color="orange.6"
                  size="xs"
                  radius="xl"
                  leftSection={<IconBrandWhatsapp size={14} />}
                >
                  Contato
                </Button>
            </Flex>
          </Container>
        </AppShellHeader>

        <AppShellMain>
          {/* ── HERO ────────────────────────────────────────────────── */}
          <Box
            style={{
              background: 'linear-gradient(135deg, #EFF6FF 0%, #F8FAFC 60%, #FFF7ED 100%)',
              position: 'relative',
              overflow: 'hidden',
            }}
            py={{ base: 72, md: 120 }}
          >
            {/* Subtle decorative blobs */}
            <Box
              style={{
                position: 'absolute',
                top: -80,
                right: -80,
                width: 400,
                height: 400,
                borderRadius: '50%',
                background: 'rgba(59,130,246,0.06)',
                filter: 'blur(40px)',
                pointerEvents: 'none',
              }}
            />
            <Box
              style={{
                position: 'absolute',
                bottom: -60,
                left: -60,
                width: 300,
                height: 300,
                borderRadius: '50%',
                background: 'rgba(234,88,12,0.05)',
                filter: 'blur(40px)',
                pointerEvents: 'none',
              }}
            />

            <Container size="xl">
              <SimpleGrid cols={{ base: 1, md: 2 }} spacing={{ base: 48, md: 80 }} style={{ alignItems: 'center' }}>
                {/* Left: copy */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={stagger}
                >
                  <Stack gap="xl">
                    <motion.div variants={fadeUp}>
                      <Badge
                        color="blue.9"
                        variant="light"
                        size="lg"
                        radius="xl"
                        px="lg"
                      >
                        🎓 Mentoria para Professores da EBD
                      </Badge>
                    </motion.div>

                    <motion.div variants={fadeUp}>
                      <Title
                        order={1}
                        fz={{ base: 36, sm: 48, md: 56 }}
                        lh={1.1}
                        c="blue.9"
                        style={{ letterSpacing: '-0.03em' }}
                      >
                        Transforme suas aulas da EBD
                      </Title>
                    </motion.div>

                    <motion.div variants={fadeUp}>
                      <Text fz={{ base: 'lg', md: 'xl' }} c="blue.7" fw={500}>
                        Da sala vazia a um ensino que edifica e retém os alunos.
                      </Text>
                    </motion.div>

                    <motion.div variants={fadeUp}>
                      <Text fz="md" c="gray.6" lh={1.75} maw={520}>
                        Descubra a Mentoria RHEMA: a ferramenta completa com profundidade exegética,
                        subsídios prontos e orientação prática para professores das revistas CPAD
                        (Adultos e Jovens).
                      </Text>
                    </motion.div>

                    <motion.div variants={fadeUp}>
                      <Group gap="md" wrap="wrap">
                        <Button
                          component="a"
                          href={waLink('Olá! Quero transformar minhas aulas da EBD com a Mentoria RHEMA!')}
                          target="_blank"
                          rel="noopener noreferrer"
                          color="orange.6"
                          size="lg"
                          radius="xl"
                          leftSection={<IconHeartHandshake size={22} />}
                          style={{ boxShadow: '0 4px 24px rgba(234,88,12,0.25)' }}
                        >
                          Quero Transformar Minhas Aulas
                        </Button>
                        <Button
                          component={Link}
                          to="/blog"
                          variant="subtle"
                          color="blue.8"
                          size="lg"
                          radius="xl"
                        >
                          Conheça o Blog
                        </Button>
                      </Group>
                    </motion.div>
                  </Stack>
                </motion.div>

                {/* Right: book covers */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' as const }}
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <Box style={{ position: 'relative', width: '100%', maxWidth: 380 }}>
                    <Image
                      src="/adultos.jpg"
                      radius="xl"
                      style={{
                        boxShadow: '0 20px 60px rgba(30,58,138,0.18)',
                        transform: 'rotate(-3deg)',
                        position: 'relative',
                        zIndex: 1,
                      }}
                    />
                    <Box
                      style={{
                        position: 'absolute',
                        top: 32,
                        right: -20,
                        width: '65%',
                        zIndex: 2,
                      }}
                    >
                      <Image
                        src="/jovens.jpg"
                        radius="xl"
                        style={{
                          boxShadow: '0 20px 60px rgba(234,88,12,0.18)',
                          transform: 'rotate(4deg)',
                        }}
                      />
                    </Box>
                  </Box>
                </motion.div>
              </SimpleGrid>
            </Container>
          </Box>

          {/* ── DOR ─────────────────────────────────────────────────── */}
          <Box py={{ base: 72, md: 100 }} bg="white">
            <Container size="md">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
              >
                <Stack gap="xl" align="center" ta="center">
                  <motion.div variants={fadeUp}>
                    <Text tt="uppercase" c="orange.6" fw={700} fz="sm" style={{ letterSpacing: 2 }}>
                      O Problema
                    </Text>
                  </motion.div>

                  <motion.div variants={fadeUp}>
                    <Title order={2} fz={{ base: 26, md: 36 }} c="blue.9" style={{ letterSpacing: '-0.02em' }}>
                      "Se é ensinar, haja dedicação ao ensino"
                    </Title>
                    <Text c="gray.5" fz="md" mt={4}>
                      Romanos 12.7
                    </Text>
                  </motion.div>

                  <motion.div variants={fadeUp}>
                    <Text c="gray.6" fz="md" lh={1.8} maw={620}>
                      Ser um professor de Escola Bíblica Dominical é algo glorioso — mas a realidade
                      do dia a dia pode ser pesada: semana corrida, pouco tempo para estudar, material
                      escasso e a sensação de que ninguém valoriza o esforço. O resultado é o mais
                      doloroso: a sala vazia e alunos totalmente desmotivados.
                    </Text>
                  </motion.div>
                </Stack>

                {/* Pain cards */}
                <motion.div variants={fadeUp}>
                  <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl" mt={56}>
                    {painPoints.map(({ icon, title, desc }) => (
                      <Card key={title} radius="xl" p="xl" withBorder style={{ borderColor: theme.colors.gray[2] }}>
                        <ThemeIcon size={52} radius="xl" color="orange.0" mb="md">
                          <Box c="orange.6">{icon}</Box>
                        </ThemeIcon>
                        <Text fw={700} fz="md" c="blue.9" mb={6}>
                          {title}
                        </Text>
                        <Text fz="sm" c="gray.6" lh={1.7}>
                          {desc}
                        </Text>
                      </Card>
                    ))}
                  </SimpleGrid>
                </motion.div>

                {/* Empathy block */}
                <motion.div variants={fadeUp}>
                  <Box
                    mt={56}
                    p={{ base: 'xl', md: '2rem' }}
                    bg="blue.0"
                    style={{
                      borderRadius: rem(20),
                      borderLeft: `4px solid ${theme.colors.blue[6]}`,
                    }}
                  >
                    <Text fz="lg" c="blue.9" lh={1.8} fw={500} fs="italic">
                      "Eu entendo. Ensino na EBD há 30 anos e já passei por tudo isso. A grande maioria
                      dos professores são voluntários movidos pelo amor a Deus e às pessoas — não por
                      obrigação. Eles merecem suporte de verdade, não mais cobranças."
                    </Text>
                    <Text fz="sm" c="blue.6" fw={600} mt="md">
                      — Mentor, Mentoria RHEMA
                    </Text>
                  </Box>
                </motion.div>
              </motion.div>
            </Container>
          </Box>

          {/* ── SOLUÇÃO ─────────────────────────────────────────────── */}
          <Box py={{ base: 72, md: 100 }} bg="gray.0">
            <Container size="xl">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
              >
                <Stack gap="xl" align="center" ta="center" mb={56}>
                  <motion.div variants={fadeUp}>
                    <Text tt="uppercase" c="orange.6" fw={700} fz="sm" style={{ letterSpacing: 2 }}>
                      A Virada
                    </Text>
                  </motion.div>
                  <motion.div variants={fadeUp}>
                    <Title order={2} fz={{ base: 24, md: 36 }} c="blue.9" maw={700} style={{ letterSpacing: '-0.02em' }}>
                      Tenho uma solução incrível para você!{' '}
                      <Text component="span" c="orange.6" inherit>
                        Conheça a Mentoria RHEMA
                      </Text>
                    </Title>
                  </motion.div>
                  <motion.div variants={fadeUp}>
                    <Text c="gray.6" fz="md" maw={560} lh={1.8}>
                      Uma{' '}
                      <Text component="span" fw={700} c="blue.8">
                        caixa de ferramentas completa
                      </Text>{' '}
                      para transformar cada domingo em uma experiência de ensino que marca vidas.
                      Chega de aulas sem qualidade, sala vazia e alunos desmotivados.
                    </Text>
                  </motion.div>
                </Stack>

                <motion.div variants={fadeUp}>
                  <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl">
                    {pillars.map(({ icon, title, desc }, i) => (
                      <Card
                        key={title}
                        radius="xl"
                        p="xl"
                        style={{
                          background: 'white',
                          border: `1px solid ${theme.colors.gray[2]}`,
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                      >
                        {i === 0 && (
                          <Box
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              height: 4,
                              background: theme.colors.blue[6],
                              borderRadius: `${rem(20)} ${rem(20)} 0 0`,
                            }}
                          />
                        )}
                        {i === 1 && (
                          <Box
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              height: 4,
                              background: theme.colors.orange[5],
                              borderRadius: `${rem(20)} ${rem(20)} 0 0`,
                            }}
                          />
                        )}
                        {i === 2 && (
                          <Box
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              height: 4,
                              background: theme.colors.blue[4],
                              borderRadius: `${rem(20)} ${rem(20)} 0 0`,
                            }}
                          />
                        )}
                        <ThemeIcon size={60} radius="xl" color="blue.0" mb="lg">
                          <Box c="blue.8">{icon}</Box>
                        </ThemeIcon>
                        <Text fw={700} fz="lg" c="blue.9" mb="sm">
                          {title}
                        </Text>
                        <Text fz="sm" c="gray.6" lh={1.75}>
                          {desc}
                        </Text>
                      </Card>
                    ))}
                  </SimpleGrid>
                </motion.div>
              </motion.div>
            </Container>
          </Box>

          {/* ── ENTREGÁVEIS ─────────────────────────────────────────── */}
          <Box py={{ base: 72, md: 100 }} bg="white">
            <Container size="xl">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
              >
                <Stack gap="xl" align="center" ta="center" mb={56}>
                  <motion.div variants={fadeUp}>
                    <Text tt="uppercase" c="orange.6" fw={700} fz="sm" style={{ letterSpacing: 2 }}>
                      O que você recebe
                    </Text>
                  </motion.div>
                  <motion.div variants={fadeUp}>
                    <Title order={2} fz={{ base: 26, md: 36 }} c="blue.9" maw={600} style={{ letterSpacing: '-0.02em' }}>
                      Tudo que você precisa para um domingo de excelência
                    </Title>
                  </motion.div>
                </Stack>

                <motion.div variants={fadeUp}>
                  <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl">
                    {deliverables.map(({ icon, title, desc }) => (
                      <Card
                        key={title}
                        radius="xl"
                        p="xl"
                        style={{
                          background: 'linear-gradient(135deg, #EFF6FF 0%, #F8FAFC 100%)',
                          border: `1px solid ${theme.colors.blue[1]}`,
                        }}
                      >
                        <Group gap="md" mb="lg">
                          <ThemeIcon size={48} radius="xl" color="blue.8">
                            {icon}
                          </ThemeIcon>
                          <Text fw={700} fz="md" c="blue.9">
                            {title}
                          </Text>
                        </Group>
                        <Text fz="sm" c="gray.6" lh={1.75}>
                          {desc}
                        </Text>
                      </Card>
                    ))}
                  </SimpleGrid>
                </motion.div>
              </motion.div>
            </Container>
          </Box>

          {/* ── PLANOS ──────────────────────────────────────────────── */}
          <Box id="planos" py={{ base: 72, md: 100 }} bg="gray.0">
            <Container size="xl">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
              >
                <Stack gap="xl" align="center" ta="center" mb={56}>
                  <motion.div variants={fadeUp}>
                    <Text tt="uppercase" c="orange.6" fw={700} fz="sm" style={{ letterSpacing: 2 }}>
                      Planos e Preços
                    </Text>
                  </motion.div>
                  <motion.div variants={fadeUp}>
                    <Title order={2} fz={{ base: 22, md: 32 }} c="blue.9" maw={640} style={{ letterSpacing: '-0.02em' }}>
                      Quanto vale preparar suas aulas com segurança, profundidade e economizar horas
                      de estudo todas as semanas?
                    </Title>
                  </motion.div>
                </Stack>

                <motion.div variants={fadeUp}>
                  <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="xl">
                    {plans.map((plan) => (
                      <Card
                        key={plan.title}
                        radius="xl"
                        p="xl"
                        withBorder
                        style={{
                          border: plan.highlight
                            ? `2px solid ${theme.colors.orange[5]}`
                            : `1px solid ${theme.colors.gray[2]}`,
                          background: plan.highlight ? '#FFFBF5' : 'white',
                          position: 'relative',
                        }}
                      >
                        {plan.highlight && (
                          <Badge
                            color="orange.6"
                            variant="filled"
                            radius="xl"
                            size="sm"
                            style={{
                              position: 'absolute',
                              top: -12,
                              left: '50%',
                              transform: 'translateX(-50%)',
                            }}
                          >
                            ⭐ Mais Popular
                          </Badge>
                        )}

                        <Stack gap="md" mt={plan.highlight ? 8 : 0}>
                          {/* Book illustration */}
                          <SimpleGrid cols={2} spacing={8}>
                            <Image
                              src="/adultos.jpg"
                              radius="md"
                              style={{ opacity: 0.85 }}
                            />
                            <Image
                              src="/jovens.jpg"
                              radius="md"
                              style={{
                                opacity:
                                  plan.title.includes('Completo') ? 0.85 : 0.3,
                                filter: plan.title.includes('Completo')
                                  ? 'none'
                                  : 'grayscale(80%)',
                              }}
                            />
                          </SimpleGrid>

                          <Text fw={700} fz="lg" c="blue.9">
                            {plan.title}
                          </Text>

                          <Group gap={4} align="flex-end">
                            <Text fz={36} fw={800} c={plan.highlight ? 'orange.6' : 'blue.9'} lh={1}>
                              {plan.price}
                            </Text>
                            <Text fz="sm" c="gray.5" mb={4}>
                              {plan.subtitle}
                            </Text>
                          </Group>

                          <Text fz="xs" c="gray.5" lh={1.6}>
                            {plan.detail}
                          </Text>

                          <Divider />

                          <Button
                            component="a"
                            href={waLink(plan.waMsg)}
                            target="_blank"
                            rel="noopener noreferrer"
                            color={plan.highlight ? 'orange.6' : 'blue.8'}
                            radius="xl"
                            fullWidth
                            leftSection={<IconBrandWhatsapp size={16} />}
                            style={
                              plan.highlight
                                ? { boxShadow: '0 4px 16px rgba(234,88,12,0.25)' }
                                : {}
                            }
                          >
                            Quero esse plano
                          </Button>
                        </Stack>
                      </Card>
                    ))}
                  </SimpleGrid>
                </motion.div>
              </motion.div>
            </Container>
          </Box>

          {/* ── FAQ ─────────────────────────────────────────────────── */}
          <Box id="faq" py={{ base: 72, md: 100 }} bg="white">
            <Container size="md">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
              >
                <Stack gap="xl" align="center" ta="center" mb={48}>
                  <motion.div variants={fadeUp}>
                    <Text tt="uppercase" c="orange.6" fw={700} fz="sm" style={{ letterSpacing: 2 }}>
                      Dúvidas Frequentes
                    </Text>
                  </motion.div>
                  <motion.div variants={fadeUp}>
                    <Title order={2} fz={{ base: 26, md: 34 }} c="blue.9" style={{ letterSpacing: '-0.02em' }}>
                      Perguntas Frequentes
                    </Title>
                  </motion.div>
                </Stack>

                <motion.div variants={fadeUp}>
                  <Accordion variant="separated" radius="lg">
                    {faqData.map(({ q, a }) => (
                      <Accordion.Item key={q} value={q}>
                        <Accordion.Control>
                          <Text fw={600} fz="md" c="blue.9">
                            {q}
                          </Text>
                        </Accordion.Control>
                        <Accordion.Panel>
                          <Text fz="sm" c="gray.6" lh={1.8}>
                            {a}
                          </Text>
                        </Accordion.Panel>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </motion.div>
              </motion.div>
            </Container>
          </Box>

          {/* ── CTA FINAL ───────────────────────────────────────────── */}
          <Box
            py={{ base: 72, md: 100 }}
            style={{
              background: 'linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 100%)',
            }}
          >
            <Container size="md">
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Stack gap="xl" align="center" ta="center">
                  <Title order={2} fz={{ base: 28, md: 42 }} c="white" style={{ letterSpacing: '-0.02em' }}>
                    Pronto para transformar seus domingos?
                  </Title>
                  <Text fz="lg" c="blue.2" maw={520} lh={1.8}>
                    Junte-se aos professores que preparam suas aulas com confiança, profundidade e
                    alegria — domingo após domingo.
                  </Text>
                  <Button
                    component="a"
                    href={waLink('Olá! Quero começar agora com a Mentoria RHEMA!')}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="orange.5"
                    size="xl"
                    radius="xl"
                    leftSection={<IconBrandWhatsapp size={22} />}
                    style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
                  >
                    Começar Agora
                  </Button>
                </Stack>
              </motion.div>
            </Container>
          </Box>

          {/* ── FOOTER ──────────────────────────────────────────────── */}
          <Box py={{ base: 40, md: 56 }} bg="blue.9">
            <Container size="xl">
              <Flex
                direction={{ base: 'column', sm: 'row' }}
                align="center"
                justify="space-between"
                gap="lg"
              >
                {/* Brand */}
                <Group gap="sm">
                  <Image src="/logo2.png" h={36} w="auto" fit="contain" style={{ opacity: 0.9 }} />
                  <Stack gap={2}>
                    <Text c="white" fw={700} fz="sm">
                      Mentoria RHEMA
                    </Text>
                    <Group gap={4}>
                      <IconStar size={10} color={theme.colors.orange[4]} />
                      <Text c="blue.3" fz="xs">
                        Auxílio ao Mestre
                      </Text>
                    </Group>
                  </Stack>
                </Group>

                {/* Links */}
                <Group gap="xl">
                  <Anchor
                    component={Link}
                    to="/blog"
                    c="blue.3"
                    fz="sm"
                    underline="never"
                  >
                    Blog
                  </Anchor>
                  <Anchor
                    href={waLink('Olá! Quero entrar em contato com a Mentoria RHEMA.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    c="blue.3"
                    fz="sm"
                    underline="never"
                  >
                    Contato
                  </Anchor>
                </Group>

                {/* Copyright */}
                <Text c="blue.4" fz="xs">
                  © {new Date().getFullYear()} Mentoria RHEMA. Todos os direitos reservados.
                </Text>
              </Flex>
            </Container>
          </Box>
        </AppShellMain>
      </AppShell>
    </>
  );
}