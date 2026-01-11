import { useOutletContext } from 'react-router-dom';
import * as S from './styled';

import { HotDancer } from './HotDancer';
import { HotClass } from './HotClass';
import { UserRecommend } from './UserRecommend';

import useGetClass from '../../hooks/useGetClass';
import useGetDancer from '../../hooks/useGetDancer';
import ForUserBanner from '../../common/Home/ForUserBanner';
import { UserContext } from '../../types/Context/User';
import { NoLogin } from '../../common/Home/NoLogin';

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
        <NoLogin />
      )}
    </S.Container>
  );
};
