import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Topbar from "../components/Topbar";

const MainLayout = () => {
  return (
    <>
      <Container>
        <Topbar />
        <Outlet />
      </Container>
    </>
  );
};

const Container = styled.div``;

export default MainLayout;
