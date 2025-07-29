import { AppShell, Burger, Button, Group, Modal, NavLink, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import React, { useEffect, useState } from 'react';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import { Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  const [opened, { toggle }] = useDisclosure();
  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      notifications.show({
        title: 'Conectado',
        message: 'Você está online novamente.',
        color: 'green',
      });
    };

    const handleOffline = () => {
      notifications.show({
        title: 'Sem conexão',
        message: 'Você está offline. Algumas funcionalidades podem não estar disponíveis.',
        color: 'red',
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if (!navigator.onLine) {
      handleOffline();
    }

    // Banner de instalação PWA
    const beforeInstallHandler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBanner(true);
    };
    window.addEventListener('beforeinstallprompt', beforeInstallHandler);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', beforeInstallHandler);
    };
  }, []);

  const handleBlogLinkClick = () => {
    if (navigator.onLine) {
      window.open('https://auxilioebd.blogspot.com/', '_blank');
    } else {
      openModal();
    }
  };

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowInstallBanner(false);
      }
    }
  };

  return (
    <>
      {showInstallBanner && (
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          background: '#2563eb',
          color: 'white',
          textAlign: 'center',
          padding: '12px 0',
          zIndex: 9999,
        }}>
          <span style={{marginRight: 8}}>👉 Adicione à tela inicial para instalar o app!</span>
          <Button size="xs" color="white" variant="outline" onClick={handleInstallClick}>
            Instalar
          </Button>
        </div>
      )}
      <Modal opened={modalOpened} onClose={closeModal} title="Aviso de Conexão">
        <Text>É necessário ter conexão com a internet para acessar o blog.</Text>
        <Group mt="md">
          <Button onClick={closeModal}>Ok</Button>
        </Group>
      </Modal>

      <AppShell
        header={{ height: 60 }}
        navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Text>Auxilio EBD</Text>
          </Group>
        </AppShell.Header>

        <AppShell.Navbar p="md">
          <NavLink component={Link} to="/" label="Início" onClick={toggle} />
          <NavLink href="#posts" label="Posts" onClick={toggle} />
          <NavLink label="Blog" onClick={handleBlogLinkClick} />
        </AppShell.Navbar>

        <AppShell.Main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<PostDetail />} />
          </Routes>
        </AppShell.Main>
      </AppShell>
    </>
  );
};

export default App;
