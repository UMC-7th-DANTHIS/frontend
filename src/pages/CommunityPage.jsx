import React, { useState } from 'react';
import styled from 'styled-components';

import CommunityLists from '../components/Comunity/CommunityLists';
import ListTopBar from '../components/Comunity/ListTopBar';

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
  height: 488px;
  background-color: black;
  justify-items: center;
  padding: 73px 204px 184px 206px;
`;

const ContentContainer = styled.div`
  background-color: black;
  height: 100%;
  width: 1030px;
`;

export default Community;
