import React from 'react';
import styled from 'styled-components';

import HotDancer from './Home/HotDancer';
import HotClass from './Home/HotClass';
import UserRecommend from './Home/UserRecommend';

import dummyUserDancer from '../store/main/dummyUserDancer';
import dummyUserClass from '../store/main/dummyUserClass';
import useGetClass from '../hooks/useGetClass';
import useGetDancer from '../hooks/useGetDancer';

const HomePage = () => {
  const dancers = Array.isArray(dummyUserDancer) ? dummyUserDancer : [];
  const classes = Array.isArray(dummyUserClass) ? dummyUserClass : [];
  const { data: danceclass } = useGetClass();
  const { data: dancer } = useGetDancer();

  return (
    <Container>
      <HotDancer dancer={dancer} />
      <HotClass danceclas={danceclass} />
      <UserRecommend
        dummyUserDancer={dancers}
        dummyUserClass={classes}
        danceclass={danceclass}
        dancer={dancer}
      />
    </Container>
  );
};

const Container = styled.div`
  background-color: black;
  width: 1440px;
`;

export default HomePage;
