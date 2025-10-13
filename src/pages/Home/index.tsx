import * as S from './styled';

import { HotDancer } from './HotDancer';
import { HotClass } from './HotClass';
import { UserRecommend } from './UserRecommend';

import useGetClass from '../../hooks/useGetClass';
import useGetDancer from '../../hooks/useGetDancer';

export const HomePage = () => {
  const { data: danceclass } = useGetClass();
  const { data: dancer } = useGetDancer();

  return (
    <S.Container>
      {dancer && <HotDancer dancer={dancer} />}
      {danceclass && <HotClass danceclass={danceclass} />}
      {dancer && danceclass && (
        <UserRecommend danceclass={danceclass} dancer={dancer} />
      )}
    </S.Container>
  );
};
