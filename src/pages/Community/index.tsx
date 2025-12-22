import * as S from './styled';

import CommunityLists from '../../common/Comunity/CommunityLists';
import ListTopBar from '../../common/Comunity/ListTopBar';

export const Community = () => {
  return (
    <S.Container>
      <S.ContentContainer>
        <ListTopBar />
        <CommunityLists />
      </S.ContentContainer>
    </S.Container>
  );
};
