import React from 'react';
import styled from 'styled-components';

import Carousel from '../../components/Home/Carousel';
import HotDancerBanner from '../../components/Home/HotDancerBanner';

const HotDancer = () => {
  return (
    <Container>
      <HotDancerBanner />
      <Carousel />
    </Container>
  );
};

const Container = styled.div`
  margin-left: 100px;
  margin-right: 100px;

  border-bottom: 2px solid #4d4d4d;
`;

export default HotDancer;
