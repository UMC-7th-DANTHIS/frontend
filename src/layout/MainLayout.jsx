import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Topbar from '../components/Topbar';
import Footer from '../components/Footer';

import useGet from '../hooks/useGet';

const MainLayout = () => {
  const navigate = useNavigate();

  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const { data: user, isLoading, isError } = useGet();

  useEffect(() => {
    const handleStorageChange = () => {
      const newToken = localStorage.getItem('token');
      setToken(newToken);
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleSearch = (query) => {
    navigate(`/search/dance-classes?query=${query}`);
  };

  return (
    <>
      <Container>
        <Topbar onSearch={handleSearch} token={token} />
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
