import React from 'react';
import styled from 'styled-components';

import HotDancer from '../components/Home/HotDancer';
import HotClass from '../components/Home/HotClass';
import UserDancer from '../components/Home/UserDancer';

const HomePage = () => {
  return (
    <Container>
      <HotDancer />
      <HotClass />
      <UserDancer />
    </Container>
  );
};

export default HomePage;

const Container = styled.div`
  background-color: black;
`;
