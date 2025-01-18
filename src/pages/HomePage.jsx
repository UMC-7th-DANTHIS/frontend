import React from 'react';
import styled from 'styled-components';

import HotDancer from '../components/Home/HotDancer';
import HotClass from '../components/Home/HotClass';
import UserRecommend from '../components/Home/UserRecommend';

const HomePage = () => {
  return (
    <Container>
      <HotDancer />
      <HotClass />
      <UserRecommend />
    </Container>
  );
};

export default HomePage;

const Container = styled.div`
  background-color: black;
`;
