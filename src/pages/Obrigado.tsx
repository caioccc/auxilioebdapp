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
  Stack,
  Text,
  ThemeIcon,
  Title,
  useMantineTheme
} from "@mantine/core";
import {
  IconBook,
  IconBrandWhatsapp,
  IconCircleCheck,
  IconCircleX,
  IconClockDollar,
  IconExternalLink,
  IconStar
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";

// ─── Configurações ───────────────────────────────────────────────────────────

const WA_NUMBER = "5583987301186";

const waLink = (msg: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

// ─── Config por plano ────────────────────────────────────────────────────────

interface PlanObrigadoConfig {
  title: string
  materialUrl: string
  waSupportMsg: string
  pageTitle: string
}

interface CheckoutInfo {
  checkoutUrl: string
  materialUrl: string
}

const CHECKOUT_URLS: Record<string, CheckoutInfo> = {
  'trimestral-adultos': { checkoutUrl: 'https://mpago.la/2TKfnv5', materialUrl: 'https://drive.google.com/drive/folders/1G6esx8dF2vPdOYh9ux8FnKbttsnYShDG?usp=sharing' },
  'trimestral-jovens': { checkoutUrl: 'https://mpago.la/2UKm1jj', materialUrl: 'https://drive.google.com/drive/folders/17iqsQ3-RKsoumTIbBj6YdXXo08ffpjHo?usp=sharing' },
  'anual-adultos': { checkoutUrl: 'https://mpago.la/2yhFoSL', materialUrl: 'https://drive.google.com/drive/folders/1d1hX-2Yt2H2ZxZic9bn7ojOdcS0SYATV?usp=sharing' },
  'anual-jovens': { checkoutUrl: 'https://mpago.la/1bgaQNA', materialUrl: 'https://drive.google.com/drive/folders/1TIGdCBGuFYdrSMoBBgcKFz2eSWIDnezz?usp=sharing' },
  'completo-trimestral': { checkoutUrl: 'https://mpago.la/1FjzgJh', materialUrl: 'https://drive.google.com/drive/folders/1SqpfbqI1KFiIAu3pKH5dDQBWO0bbQzBW?usp=sharing' },
  'completo-anual': { checkoutUrl: 'https://mpago.la/2xAwjCb', materialUrl: 'https://drive.google.com/drive/folders/1x5UXWBxpiLmNRYYEN_4xiRxbRMQQa78F?usp=sharing' },
}

const PLAN_CONFIG: Record<string, PlanObrigadoConfig> = {
  'trimestral-adultos': {
    title: 'Sua Mentoria Trimestral — Adultos começa agora!',
    materialUrl: CHECKOUT_URLS['trimestral-adultos'].materialUrl,
    waSupportMsg: 'Olá! Acabei de assinar o plano Trimestral — Adultos e preciso de suporte.',
    pageTitle: 'Mentoria Trimestral — Adultos | Acesso ao Material',
  },
  'trimestral-jovens': {
    title: 'Sua Mentoria Trimestral — Jovens começa agora!',
    materialUrl: CHECKOUT_URLS['trimestral-jovens'].materialUrl,
    waSupportMsg: 'Olá! Acabei de assinar o plano Trimestral — Jovens e preciso de suporte.',
    pageTitle: 'Mentoria Trimestral — Jovens | Acesso ao Material',
  },
  'anual-adultos': {
    title: 'Sua Mentoria Anual — Adultos começa agora!',
    materialUrl: CHECKOUT_URLS['anual-adultos'].materialUrl,
    waSupportMsg: 'Olá! Acabei de assinar o plano Anual — Adultos e preciso de suporte.',
    pageTitle: 'Mentoria Anual — Adultos | Acesso ao Material',
  },
  'anual-jovens': {
    title: 'Sua Mentoria Anual — Jovens começa agora!',
    materialUrl: CHECKOUT_URLS['anual-jovens'].materialUrl,
    waSupportMsg: 'Olá! Acabei de assinar o plano Anual — Jovens e preciso de suporte.',
    pageTitle: 'Mentoria Anual — Jovens | Acesso ao Material',
  },
  'completo-trimestral': {
    title: 'Seu plano Completo Trimestral está liberado!',
    materialUrl: CHECKOUT_URLS['completo-trimestral'].materialUrl,
    waSupportMsg: 'Olá! Acabei de assinar o plano Completo Trimestral e preciso de suporte.',
    pageTitle: 'Completo Trimestral | Acesso ao Material',
  },
  'completo-anual': {
    title: 'Seu plano Completo Anual está liberado!',
    materialUrl: CHECKOUT_URLS['completo-anual'].materialUrl,
    waSupportMsg: 'Olá! Acabei de assinar o plano Completo Anual e preciso de suporte.',
    pageTitle: 'Completo Anual | Acesso ao Material',
  },
}

const FALLBACK_CONFIG: PlanObrigadoConfig = {
  title: 'Sua jornada de excelência no ensino bíblico começa agora!',
  materialUrl: '#',
  waSupportMsg: 'Olá! Acabei de assinar a Mentoria e preciso de suporte.',
  pageTitle: 'Bem-vindo à Mentoria RHEMA — Acesso ao Material',
}

// ─── Animações ──────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// ─── Tipos de status ─────────────────────────────────────────────────────────

type PaymentStatus = "approved" | "pending" | "failure" | "unknown";

const STATUS_CONFIG: Record<PaymentStatus, {
  badgeColor: string;
  badgeIcon: React.ReactNode;
  badgeLabel: string;
  title: string;
  showMaterial: boolean;
}> = {
  approved: {
    badgeColor: "green.6",
    badgeIcon: <IconCircleCheck size={16} />,
    badgeLabel: "Pagamento Confirmado com Sucesso!",
    title: "Sua jornada de excelência no ensino bíblico começa agora!",
    showMaterial: true,
  },
  pending: {
    badgeColor: "yellow.6",
    badgeIcon: <IconClockDollar size={16} />,
    badgeLabel: "Pagamento em Processamento",
    title: "Estamos aguardando a confirmação do pagamento.",
    showMaterial: false,
  },
  failure: {
    badgeColor: "red.6",
    badgeIcon: <IconCircleX size={16} />,
    badgeLabel: "Pagamento não realizado",
    title: "Infelizmente o pagamento não foi concluído.",
    showMaterial: false,
  },
  unknown: {
    badgeColor: "blue.6",
    badgeIcon: <IconCircleCheck size={16} />,
    badgeLabel: "Pagamento Confirmado com Sucesso!",
    title: "Sua jornada de excelência no ensino bíblico começa agora!",
    showMaterial: true,
  },
};

export default function ObrigadoRhema() {
  const theme = useMantineTheme();
  const [searchParams] = useSearchParams();

  const paymentStatus = (searchParams.get("status") || "approved") as PaymentStatus;
  const paymentId = searchParams.get("payment_id") || searchParams.get("collection_id") || "";
  const externalRef = searchParams.get("external_reference") || "";
  const planId = searchParams.get("plan") || "";

  const planConfig = PLAN_CONFIG[planId] || FALLBACK_CONFIG;
  const statusConfig = STATUS_CONFIG[paymentStatus] || STATUS_CONFIG.unknown;
  const isValid = paymentStatus === "approved" || paymentStatus === "unknown";

  return (
    <>
      <Helmet>
        <title>{planConfig.pageTitle}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <AppShell header={{ height: 70 }}>
        {/* ── HEADER ──────────────────────────────────────────────── */}
        <AppShellHeader
          style={{
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            background: "rgba(255,255,255,0.85)",
            borderBottom: `1px solid ${theme.colors.gray[2]}`,
            zIndex: 200,
          }}
        >
          <Container size="xl" h="100%">
            <Flex align="center" justify="space-between" h="100%">
              <Group gap="sm">
                <Image src="/logo2.png" h={46} w="auto" fit="contain" />
                <Text
                  fw={700}
                  fz="lg"
                  c="blue.9"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  Mentoria RHEMA
                </Text>
              </Group>

              <Button
                component="a"
                href={waLink(planConfig.waSupportMsg)}
                target="_blank"
                rel="noopener noreferrer"
                color="orange.6"
                size="sm"
                radius="xl"
                leftSection={<IconBrandWhatsapp size={16} />}
              >
                Suporte VIP
              </Button>
            </Flex>
          </Container>
        </AppShellHeader>

        <AppShellMain>
          {/* ── SEÇÃO PRINCIPAL DE BOAS-VINDAS ──────────────────────── */}
          <Box
            style={{
              background:
                "linear-gradient(135deg, #EFF6FF 0%, #F8FAFC 60%, #FFF7ED 100%)",
              position: "relative",
              overflow: "hidden",
            }}
            py={{ base: 56, md: 80 }}
          >
            <Container size="md">
              <motion.div initial="hidden" animate="visible" variants={stagger}>
                <Stack gap="xl" align="center" ta="center">
                  <motion.div variants={fadeUp}>
                    <Badge
                      color={statusConfig.badgeColor}
                      variant="light"
                      size="lg"
                      radius="xl"
                      px="lg"
                      leftSection={statusConfig.badgeIcon}
                    >
                      {statusConfig.badgeLabel}
                    </Badge>
                  </motion.div>

                  <motion.div variants={fadeUp}>
                    <Title
                      order={1}
                      fz={{ base: 28, sm: 38, md: 44 }}
                      lh={1.2}
                      c="blue.9"
                      style={{ letterSpacing: "-0.02em" }}
                    >
                      {paymentStatus === "approved" || paymentStatus === "unknown"
                        ? planConfig.title
                        : statusConfig.title}
                    </Title>
                  </motion.div>

                  {paymentStatus === "failure" && (
                    <motion.div variants={fadeUp} style={{ width: "100%", maxWidth: 600 }}>
                      <Card radius="xl" p="xl" withBorder style={{ borderColor: theme.colors.red[2] }}>
                        <Stack gap="md" align="center">
                          <Text fz="sm" c="gray.6" ta="center">
                            O pagamento foi recusado ou cancelado. Tente novamente ou entre em contato conosco pelo WhatsApp.
                          </Text>
                          <Button
                            component="a"
                            href="/"
                            color="blue.8"
                            size="lg"
                            radius="xl"
                            fullWidth
                          >
                            Tentar Novamente
                          </Button>
                        </Stack>
                      </Card>
                    </motion.div>
                  )}

                  {paymentStatus === "pending" && (
                    <motion.div variants={fadeUp} style={{ width: "100%", maxWidth: 600 }}>
                      <Card radius="xl" p="xl" withBorder style={{ borderColor: theme.colors.yellow[2] }}>
                        <Stack gap="md" align="center">
                          <Text fz="sm" c="gray.6" ta="center">
                            Assim que o pagamento for aprovado, você receberá o acesso automaticamente. Fique de olho no seu WhatsApp.
                          </Text>
                        </Stack>
                      </Card>
                    </motion.div>
                  )}

                  {/* CARD DE AÇÃO IMEDIATA (Acessar Material) */}
                  {isValid && (
                    <motion.div
                      variants={fadeUp}
                      style={{ width: "100%", maxWidth: 600 }}
                    >
                      <Card
                        radius="xl"
                        p="xl"
                        withBorder
                        style={{
                          borderColor: theme.colors.blue[2],
                          boxShadow: "0 10px 30px rgba(30,58,138,0.05)",
                          backgroundColor: "#white",
                        }}
                      >
                        <Stack gap="md" align="center">
                          <ThemeIcon size={56} radius="xl" color="blue.0">
                            <IconBook
                              size={28}
                              color={theme.colors.blue[8]}
                            />
                          </ThemeIcon>
                          <Title order={3} fz="xl" c="blue.9">
                            Acesse sua Área de Membros / Materiais
                          </Title>
                          <Text fz="sm" c="gray.6" max-width={450}>
                            Clique no botão abaixo para abrir a pasta ou
                            plataforma com todas as 13 lições e os bônus do
                            trimestre.
                          </Text>
                        <Button
                          component="a"
                          href={planConfig.materialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          color="blue.8"
                          size="lg"
                          radius="xl"
                          fullWidth
                          rightSection={<IconExternalLink size={18} />}
                          style={{
                            boxShadow: "0 4px 16px rgba(29,78,216,0.2)",
                          }}
                        >
                          Acessar Meus Materiais Agora
                        </Button>
                        </Stack>
                      </Card>
                    </motion.div>
                  )}
                </Stack>
              </motion.div>
            </Container>
          </Box>

          {/* ── SEÇÃO DA CARTA / MENSAGEM PASTORAL ───────────────────── */}
          <Box py={{ base: 56, md: 80 }} bg="white">
            <Container size="sm">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
              >
                {/* Visual da Mensagem */}
                <Card
                  radius="20px"
                  p={{ base: "xl", md: "3rem" }}
                  withBorder
                  style={{
                    borderColor: theme.colors.gray[2],
                    backgroundColor: "#FAFAFA",
                    lineHeight: 1.8,
                  }}
                >
                  <Stack gap="lg">
                    <Text fw={700} fz="lg" c="blue.9">
                      Nobre Transformador(a) de Vidas,
                    </Text>

                    <Text c="gray.7" fz="md">
                      Recebo sua Assinatura com profunda alegria e gratidão
                      diante de Deus. É uma honra caminhar ao lado de homens e
                      mulheres que compreenderam a grandeza e a responsabilidade
                      do Ministério de Ensino.
                    </Text>

                    <Text c="gray.7" fz="md">
                      Você não está apenas participando de uma Mentoria. Está
                      assumindo um compromisso santo de ser porta-voz de Deus
                      diante da sua classe de Escola Dominical.
                    </Text>

                    <Text
                      fw={700}
                      c="orange.6"
                      fz="md"
                      style={{ letterSpacing: "0.05em" }}
                    >
                      Poucos entendem isso.
                    </Text>

                    <Text c="gray.7" fz="md">
                      Cada aula preparada, cada estudo realizado e cada verdade
                      ensinada pode moldar consciências, fortalecer famílias e
                      formar o caráter de Cristo em vidas que caminham para a
                      eternidade.
                    </Text>

                    <Text c="gray.7" fz="md">
                      Por isso, sinto orgulho em ter você nesse seleto grupo de
                      professores que decidiram não aceitar o superficial, mas
                      buscar profundidade, preparo e transformação verdadeira.
                    </Text>

                    <Box
                      py="xs"
                      my="xs"
                      style={{
                        borderLeft: `3px solid ${theme.colors.orange[5]}`,
                        paddingLeft: "1rem",
                      }}
                    >
                      <Text fz="lg" fw={700} c="blue.9" fs="italic" mb={4}>
                        “Sou devedor...”
                      </Text>
                      <Text fz="sm" c="gray.5" fw={600}>
                        Romanos 1.14
                      </Text>
                    </Box>

                    <Text c="gray.7" fz="md">
                      Porque quem recebeu conhecimento, direção e entendimento
                      da Palavra também assume diante de Deus a responsabilidade
                      de compartilhar, ensinar e edificar outros com excelência.
                    </Text>

                    <Text c="gray.7" fz="md">
                      Obrigado por entrar nessa jornada comigo. Seguiremos
                      juntos, crescendo, aprendendo e permitindo que o Espírito
                      Santo use nossas vidas para impactar gerações através do
                      ensino da Palavra.
                    </Text>

                    <Text fw={700} c="blue.9" fz="md">
                      Conte sempre comigo nessa missão gloriosa.
                    </Text>
                  </Stack>
                </Card>

                {/* Chamada Final / Reforço do WhatsApp */}
                <Stack align="center" mt={48} ta="center">
                  <Text fz="sm" c="gray.5" fw={500}>
                    Ficou com alguma dúvida sobre o acesso? Não hesite em nos
                    chamar.
                  </Text>
                  <Button
                    component="a"
                    href={waLink(
                      "Olá! Já sou assinante e gostaria de tirar uma dúvida sobre os materiais.",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="subtle"
                    color="orange.6"
                    radius="xl"
                    leftSection={<IconBrandWhatsapp size={18} />}
                  >
                    Chamar no WhatsApp de Suporte
                  </Button>

                  {paymentId && (
                    <Text fz="xs" c="gray.4" mt="xs">
                      Ref: {paymentId}{externalRef ? ` — ${externalRef}` : ""}
                    </Text>
                  )}
                </Stack>
              </motion.div>
            </Container>
          </Box>

          {/* ── FOOTER ──────────────────────────────────────────────── */}
          <Box py={40} bg="blue.9">
            <Container size="xl">
              <Flex
                direction={{ base: "column", sm: "row" }}
                align="center"
                justify="space-between"
                gap="lg"
              >
                <Group gap="sm">
                  <Image
                    src="/logo2.png"
                    h={36}
                    w="auto"
                    fit="contain"
                    style={{ opacity: 0.9 }}
                  />
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
                <Text c="blue.4" fz="xs">
                  © {new Date().getFullYear()} Mentoria RHEMA. Todos os direitos
                  reservados.
                </Text>
              </Flex>
            </Container>
          </Box>
        </AppShellMain>
      </AppShell>
    </>
  );
}
