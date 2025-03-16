import { useState } from 'react';
import { useRouter } from 'next/router';
import { handleLogin } from '../controllers/taskController';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
`;

const Input = styled.input`
  margin-bottom: 1rem;
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const Button = styled.button`
  background-color: #0070f3;
  color: white;
  padding: 0.8rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #005bb5;
  }
`;

const Text = styled.p`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #333;
`;

const Link = styled.a`
  color: #0070f3;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin(username, password, router);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container>
      <h1>Login</h1>
      <Form onSubmit={onSubmit}>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Login</Button>
      </Form>
      <Text>
        Não tem conta? <Link href="/register">Registre-se</Link>
      </Text>
    </Container>
  );
}
