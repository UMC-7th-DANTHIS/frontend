import React from 'react';
import styled from 'styled-components';

import HotDancer from './Home/HotDancer';
import HotClass from './Home/HotClass';
import UserRecommend from './Home/UserRecommend';

import dummyUserDancer from '../store/main/dummyUserDancer';
import dummyUserClass from '../store/main/dummyUserClass';

const HomePage = () => {
  const dancers = Array.isArray(dummyUserDancer) ? dummyUserDancer : [];
  const classes = Array.isArray(dummyUserClass) ? dummyUserClass : [];

  return (
    <Container>
      <HotDancer />
      <HotClass />
      <UserRecommend dummyUserDancer={dancers} dummyUserClass={classes} />
    </Container>
  );
};

export default HomePage;

const Container = styled.div`
  background-color: black;
  width: 1440px;
`;
