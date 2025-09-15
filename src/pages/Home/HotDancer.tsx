import React from 'react';
import styled from 'styled-components';

import Carousel from '../../common/Home/Carousel';
import HotDancerBanner from '../../common/Home/HotDancerBanner';

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
  border-bottom: 2px solid #4d4d4d;
`;

export default HotDancer;
