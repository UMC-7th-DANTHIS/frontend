import React from 'react';
import styled from 'styled-components';

import HotDancer from '../components/Home/HotDancer';

const HomePage = () => {
  return (
    <Container>
      <HotDancer />
    </Container>
  );
};

export default HomePage;

const Container = styled.div`
  background-color: black;
`;
