import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';

const MainLayout = () => {
  const navigate = useNavigate();

  const handleSearch = (query) => {
    navigate(`/search?query=${query}`);
  };

  return (
    <>
      <Container>
        <Topbar onSearch={handleSearch} />
        <Outlet />
        <Footer />
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 1440px;
  background-color: black;
`;

export default MainLayout;
