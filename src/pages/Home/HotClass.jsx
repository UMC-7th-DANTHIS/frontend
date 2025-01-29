import React from 'react';
import styled from 'styled-components';
import PassiveCarousel from '../../components/Home/PassiveCarousel';

const HotClass = () => {
  return (
    <Container>
      <Header>유행하는 수업을 한눈에</Header>
      <Glow />
      <PassiveCarousel />
    </Container>
  );
};

export default HotClass;

const Container = styled.div`
  margin-top: 120px;
  border-bottom: 2px solid #4d4d4d;
`;

const Header = styled.div`
  margin-left: 96.5px;
  margin-bottom: 21px;
  position: relative;
  z-index: 1;

  color: white;
  font-size: 36px;
  font-weight: 600;
  line-height: normal;
`;

const Glow = styled.div`
  position: relative;
  bottom: 40px;
  left: 50%;
  transform: translateX(-180%);
  width: 356px;
  height: 18px;

  background: radial-gradient(
    ellipse at center,
    #9819c3 100%,
    transparent 100%
  );
  filter: blur(3px);
  border-radius: 50%;
`;
