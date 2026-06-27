import { Button, Group, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import React, { Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import BottomNavigationComponent from "./components/ui/BottomNavigation";

const LandingPage = React.lazy(() => import("./pages/LandingPage"));
const Home = React.lazy(() => import("./pages/Home"));
const PostDetail = React.lazy(() => import("./pages/PostDetail"));

const App: React.FC = () => {
  const [modalOpened, { close: closeModal }] =
    useDisclosure(false);
  useEffect(() => {
    const handleOnline = () => {
      notifications.show({
        title: "Conectado",
        message: "Você está online novamente.",
        color: "green",
      });
    };

    const handleOffline = () => {
      notifications.show({
        title: "Sem conexão",
        message:
          "Você está offline. Algumas funcionalidades podem não estar disponíveis.",
        color: "red",
      });
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    if (!navigator.onLine) {
      handleOffline();
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <>
      {/* {showInstallBanner && (
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
      )} */}
      <Modal opened={modalOpened} onClose={closeModal} title="Aviso de Conexão">
        <Text>
          É necessário ter conexão com a internet para acessar o blog.
        </Text>
        <Group mt="md">
          <Button onClick={closeModal}>Ok</Button>
        </Group>
      </Modal>

      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" /></div>}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/blog"
            element={
              <Layout>
                <Home />
                <BottomNavigationComponent />
              </Layout>
            }
          />
          <Route
            path="/post/:id"
            element={
              <Layout>
                <PostDetail />
                <BottomNavigationComponent />
              </Layout>
            }
          />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
