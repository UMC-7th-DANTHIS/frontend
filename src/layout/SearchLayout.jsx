import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import SearchBar from "../components/Search/SearchBar";

const SearchLayout = () => {
  return (
    <Container>
      <SearchBar />
      <Outlet />
    </Container>
  );
};

const Container = styled.div``;

export default SearchLayout;
