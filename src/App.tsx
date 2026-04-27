import { Button, Group, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import React, { useEffect, useState } from 'react';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import { Routes, Route } from 'react-router-dom';
import BottomNavigationComponent from './components/ui/BottomNavigation';
import Layout from './components/Layout';

const App: React.FC = () => {
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

      <Layout onBlogClick={openModal}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<PostDetail />} />
        </Routes>
        <BottomNavigationComponent />
      </Layout>
    </>
  );
};

export default App;
