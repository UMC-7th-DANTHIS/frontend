import * as S from './styled';

import PassiveCarousel from '../../../common/Home/PassiveCarousel';

import { AllClassData } from '@/types/MainInterface';

type HotClassProps = {
  danceclass: AllClassData;
};

export const HotClass = ({ danceclass }: HotClassProps) => {
  return (
    <S.Container>
      <S.Header>유행하는 수업을 한눈에</S.Header>
      <PassiveCarousel danceclass={danceclass} />
    </S.Container>
  );
};
