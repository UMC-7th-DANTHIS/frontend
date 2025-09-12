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
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 40px;

  justify-content: center;
  align-items: center;

  min-width: max-content;
  max-width: 1030px;

  ${({ theme }) => theme.media.tablet} {
    justify-content: start;
    align-items: start;
  }
`;

const Header = styled.div`
  margin-bottom: 20px;

  color: white;
  font-size: 28px;
  font-weight: 600;
  line-height: normal;

  ${({ theme }) => theme.media.tablet} {
    padding-left: 205px;
  }
`;

const Border = styled.div`
  margin-left: 100px;
  margin-right: 100px;

  border-bottom: 2px solid #4d4d4d;
`;

export default HotClass;
