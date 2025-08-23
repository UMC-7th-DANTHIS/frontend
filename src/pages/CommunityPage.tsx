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
  width: 100%;
`;

const ContentContainer = styled.div`
  background-color: black;
  height: 100%;
  width: 100%;

  max-width: 100dvw;
  padding: 0 2rem;
  min-width: 340px;

  ${({ theme }) => theme.media.tablet} {
    width: 100dvw;
    max-width: 1000px;
    padding: 0 2rem;
  }

  margin: 0 auto;
`;

export default Community;
