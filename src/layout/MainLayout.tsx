import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Topbar from '../components/Topbar';
import Footer from '../components/Footer';

import useGet from '../hooks/useGet';

import { UserResponse } from '../types/UserInterface';

const MainLayout = () => {
  const navigate = useNavigate();

  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem('token')
  );
  const { data: user } = useGet<UserResponse>();

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

  const handleSearch = (query: string): void => {
    navigate(`/search/dance-classes?query=${query}`);
  };

  return (
    <>
      <Container>
        <Topbar onSearch={handleSearch} token={token!} />
        <Outlet context={{ user }} />
        <Footer />
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: black;
`;

export default MainLayout;
