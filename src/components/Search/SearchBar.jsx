import React from "react";
import styled from "styled-components";

const SearchBar = () => {
  return (
    <Container>
      <InputContainer>
        <Input defaultValue="Tania" />
      </InputContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 330px;
  background-color: black;
`;

const InputContainer = styled.div`
  margin-left: 387px;
  margin-right: 351px;
  padding-left: 42px;
  padding-top: 19px;

  width: 660px;
  height: 57px;

  border-radius: 90px;
  border: 4.19px solid #9819c3;
`;

const Input = styled.input`
  background-color: transparent;
  border: transparent;
  resize: none;
  outline: none;

  height: 40px;

  color: white;
  font-size: 33.524px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export default SearchBar;
