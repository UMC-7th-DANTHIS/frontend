import React from 'react';
import styled from 'styled-components';

import Carousel from '../../components/Home/Carousel';
import HotDancerBanner from '../../components/Home/HotDancerBanner';

import { AllDancerData } from '@/types/MainInterface';

type HotDancerProps = {
  dancer: AllDancerData;
};

const HotDancer = ({ dancer }: HotDancerProps) => {
  return (
    <Container>
      <HotDancerBanner />
      <Carousel dancer={dancer} />
    </Container>
  );
};

const Container = styled.div`
  margin-left: 100px;
  margin-right: 100px;

  border-bottom: 2px solid #4d4d4d;
`;

export default HotDancer;
