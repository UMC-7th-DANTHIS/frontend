import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import Topbar from '../components/topbar/Topbar';
import Footer from '../components/Footer';
import useGet from '../hooks/useGet';

const MainLayout = () => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const { data: user } = useGet();

  useEffect(() => {
    const handleStorageChange = (): void => {
      const newToken: string | null = localStorage.getItem('token');
      setToken(newToken);
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <Container>
      <Topbar token={token!} />
      <Outlet context={{ user }} />
      <Footer />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;

  ${({ theme }) => theme.media.desktop} {
    max-width: 1440px;
    margin: 0 auto;
  }
`;

export default MainLayout;
