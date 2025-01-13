import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Topbar from "../components/Topbar";
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <>
      <Container>
        <Topbar />
        <Outlet />
        <Footer />
      </Container>
    </>
  );
};

const Container = styled.div`
width : 1440px;
`;

export default MainLayout;
