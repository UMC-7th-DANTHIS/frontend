import React, { useState } from 'react';
import styled from 'styled-components';

import CommunityLists from '../components/Comunity/CommunityLists';
import ListTopBar from '../components/Comunity/ListTopBar';
import CommunityPost from '../store/community/CommunityPost';
import CommunityPostPage from './Community/CommunityPostPage';

const Community = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  const handleSelectPost = (post) => setSelectedPost(post);
  const handleSelectDelete = () => setSelectedPost(null);

  console.log(selectedPost);

  return (
    <Container>
      <ContentContainer>
        {selectedPost ? (
          <CommunityPostPage
            selectedPost={selectedPost}
            handleSelectDelete={handleSelectDelete}
          />
        ) : (
          <>
            <ListTopBar />
            <CommunityLists
              CommunityPost={CommunityPost}
              handleSelectPost={handleSelectPost}
            />
          </>
        )}
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
