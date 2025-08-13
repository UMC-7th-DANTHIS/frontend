import styled from 'styled-components';

import PassiveCarousel from '../../common/Home/PassiveCarousel';

import { AllClassData } from '@/types/MainInterface';

type HotClassProps = {
  danceclass: AllClassData;
};

const HotClass = ({ danceclass }: HotClassProps) => {
  return (
    <Container>
      <Header>유행하는 수업을 한눈에</Header>
      <PassiveCarousel danceclass={danceclass} />
      <Border />
    </Container>
  );
};

const Container = styled.div`
  margin-top: 40px;
`;

const Header = styled.div`
  margin-left: 96.5px;
  margin-bottom: 20px;

  padding-left: 105px;
  position: relative;
  z-index: 1;

  color: white;
  font-size: 28px;
  font-weight: 600;
  line-height: normal;
`;

const Border = styled.div`
  margin-left: 100px;
  margin-right: 100px;

  border-bottom: 2px solid #4d4d4d;
`;

export default HotClass;
