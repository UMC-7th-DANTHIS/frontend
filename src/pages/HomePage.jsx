import React from 'react';
import styled from 'styled-components';

import HotDancer from '../components/Home/HotDancer';
import HotClass from '../components/Home/HotClass';

const HomePage = () => {
  return (
    <Container>
      <HotDancer />
      <HotClass />
    </Container>
  );
};

export default HomePage;

const Container = styled.div`
  background-color: black;
`;
