/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, Button, Center, Container, Divider, Group, Image, Paper, Text, Title } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const getPostFromStorage = (id: string) => {
  try {
    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    return posts.find((p: any) => (p.id?.$t || p.id) === id);
  } catch {
    return null;
  }
};

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    const found = getPostFromStorage(decodeURIComponent(id));
    console.log('Post found:', found);
    if (found) setPost(found);
    else navigate('/');
  }, [id, navigate]);

  if (!post) return <Container>Carregando post...</Container>;

  return (
    <Container size="100%">
      <Group mb="md" align="center" justify="flex-start">
        <Button
          variant="subtle"
          color="blue"
          leftSection={<IconArrowLeft size={18} />}
          onClick={() => navigate(-1)}
        >
          Voltar
        </Button>
      </Group>
      <Title order={2} mb="xs">{post.title?.$t || post.title}</Title>
      <Group mb="sm">
        {post.author?.[0]?.['gd$image']?.src && (
          <Avatar
            src={post.author[0]['gd$image'].src}
            alt={post.author[0].name?.$t}
            size={24}
            radius="xl"
          />
        )}
        <Text size="xs" color="dimmed">{post.author?.[0]?.name?.$t}</Text>
        <Text size="xs" color="dimmed">•</Text>
        <Text size="xs" color="dimmed">{new Date(post.published?.$t || post.published).toLocaleDateString('pt-BR')}</Text>
      </Group>
      {post.images && post.images.length > 0 && (
        <Paper mb="md" radius="md" withBorder>
          <Image src={post.images[0]} alt="Imagem do post" radius="md" fit="cover" />
        </Paper>
      )}
      <Divider my="md" />
      <Text size="md" style={{ lineHeight: 1.7 }}>
        <span dangerouslySetInnerHTML={{ __html: post.content?.$t || post.content }} />
      </Text>
      <Center mt="xl">
        <Button variant="light" color="blue" onClick={() => navigate(-1)}>
          Voltar
        </Button>
      </Center>
    </Container>
  );
};

export default PostDetail;
