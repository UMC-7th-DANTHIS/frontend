import styled from 'styled-components';

import CommunityLists from '../common/Comunity/CommunityLists';
import ListTopBar from '../common/Comunity/ListTopBar';

const Community = () => {
  return (
    <Container>
      <ContentContainer>
        <ListTopBar />
        <CommunityLists />
      </ContentContainer>
    </Container>
  );
};

const Container = styled.div`
  background-color: black;
  justify-items: center;
  min-height: 600px;
`;

const ContentContainer = styled.div`
  background-color: black;
  height: 100%;
  width: max-content;

  ${({ theme }) => theme.media.desktop} {
    max-width: 340px;
  }

  margin: 0 auto;
`;

export default Community;
