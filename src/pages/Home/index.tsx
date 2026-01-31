import { useOutletContext } from 'react-router-dom';
import * as S from './styled';

import { HotDancer } from './HotDancer';
import { HotClass } from './HotClass';
import { UserRecommend } from './UserRecommend';

import useGetClass from '../../hooks/useGetClass';
import useGetDancer from '../../hooks/useGetDancer';
import ForUserBanner from '../../common/Home/ForUserBanner';
import { UserContext } from '../../types/Context/User';
import {
  CONST_RECOMMEND_CLASS,
  CONST_RECOMMEND_DANCER
} from '../../store/home/dummyUserRecommend';

export const HomePage = () => {
  const { data: danceclass } = useGetClass();
  const { data: dancer } = useGetDancer();

  const { user } = useOutletContext<UserContext>();

  return (
    <S.Container>
      {dancer && <HotDancer dancer={dancer} />}
      {danceclass && <HotClass danceclass={danceclass} />}
      <ForUserBanner />
      {user ? (
        dancer &&
        danceclass && <UserRecommend danceclass={danceclass} dancer={dancer} />
      ) : (
        <UserRecommend
          danceclass={CONST_RECOMMEND_CLASS}
          dancer={CONST_RECOMMEND_DANCER}
        />
      )}
    </S.Container>
  );
};
