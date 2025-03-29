import React from 'react';
import styled from 'styled-components';

import HotDancer from './Home/HotDancer';
import HotClass from './Home/HotClass';
import UserRecommend from './Home/UserRecommend';

import useGetClass from '../hooks/useGetClass';
import useGetDancer from '../hooks/useGetDancer';

const HomePage = () => {
  const { data: danceclass } = useGetClass();
  const { data: dancer } = useGetDancer();

  return (
    <Container>
      <HotDancer dancer={dancer} />
      <HotClass danceclass={danceclass} />
      <UserRecommend danceclass={danceclass} dancer={dancer} />
    </Container>
  );
};

const Container = styled.div`
  background-color: black;
  width: 1440px;
`;

export default HomePage;
