import { useOutletContext } from 'react-router-dom';
import * as S from './styled';

import ForUserBanner from '../../../common/Home/ForUserBanner';
import ForDancer from '../../../common/Home/ForDancer';
import ForClass from '../../../common/Home/ForClass';

import { AllClassData, AllDancerData } from '@/types/MainInterface';
import { UserContext } from '@/types/Context/User';

type UserRecommendProps = {
  dancer: AllDancerData;
  danceclass: AllClassData;
};

export const UserRecommend = ({ dancer, danceclass }: UserRecommendProps) => {
  const { user } = useOutletContext<UserContext>();

  return (
    <S.Container>
      <S.Wrapper>
        <ForUserBanner />
        <S.Header>
          {user?.data.nickname} 님의 스타일에 맞는 댄서를 소개할게요
        </S.Header>
        <S.AlignCenter>
          <ForDancer dancer={dancer} />
        </S.AlignCenter>
      </S.Wrapper>
      <S.Border />
      <S.Wrapper>
        <S.Header>
          오로지 {user?.data.nickname}님을 위한 맞춤형 수업이에요
        </S.Header>
        <S.AlignCenter>
          <ForClass danceclass={danceclass} />
        </S.AlignCenter>
      </S.Wrapper>
    </S.Container>
  );
};
