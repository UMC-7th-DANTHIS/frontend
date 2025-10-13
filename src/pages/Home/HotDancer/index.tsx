import * as S from './styled';

import Carousel from '../../../common/Home/Carousel';
import HotDancerBanner from '../../../common/Home/HotDancerBanner';

import { AllDancerData } from '@/types/MainInterface';

type HotDancerProps = {
  dancer: AllDancerData;
};

export const HotDancer = ({ dancer }: HotDancerProps) => {
  return (
    <S.Container>
      <HotDancerBanner />
      <Carousel dancer={dancer} />
    </S.Container>
  );
};
