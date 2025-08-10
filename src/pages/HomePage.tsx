import styled from 'styled-components';

import HotDancer from './Home/HotDancer';
import HotClass from './Home/HotClass';
import UserRecommend from './Home/UserRecommend';

import useGetClass from '../hooks/useGetClass';
import useGetDancer from '../hooks/useGetDancer';

import { AllClassData, AllDancerData } from '@/types/MainInterface';

const HomePage = () => {
  const { data: danceclass } = useGetClass<AllClassData>();
  const { data: dancer } = useGetDancer<AllDancerData>();

  return (
    <Container>
      {dancer && <HotDancer dancer={dancer} />}
      {danceclass && <HotClass danceclass={danceclass} />}
      {dancer && danceclass && (
        <UserRecommend danceclass={danceclass} dancer={dancer} />
      )}
    </Container>
  );
};

const Container = styled.div`
  background-color: black;
  width: 1440px;
  margin: 0 auto;
`;

export default HomePage;
