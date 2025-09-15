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
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin-top: 40px;
  border-bottom: 2px solid #4d4d4d;

  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.media.tablet} {
    justify-content: start;
    align-items: start;
  }
`;

const Header = styled.div`
  margin-bottom: 62px;

  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0px 0px 62px 0px;

  ${({ theme }) => theme.media.tablet} {
    justify-content: start;
    align-items: start;
    font-size: 28px;

    margin: 0px 0px 62px 32px;
    min-width: max-content;
  }

  color: white;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export default HotClass;
