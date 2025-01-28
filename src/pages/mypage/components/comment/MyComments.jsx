import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as PostArrow } from '../../../../assets/postarrow.svg';
import dummyPost from '../../../../store/mypage/dummyPost';
import dummyComments from '../../../../store/mypage/dummyComments';

const MyComments = () => {
  const [activeTab, setActiveTab] = useState('게시글');
  const post = dummyPost;
  const comments = dummyComments;

  const renderContents = () => {
    if (activeTab === '게시글') {
      return post.map((post) => (
        <CommentContainer key={post.id}>
          <ContentsContainer>
            <CommentTitle>{post.title}</CommentTitle>
            <CommentContents>{post.content}</CommentContents>
          </ContentsContainer>
        </CommentContainer>
      ));
    }
    if (activeTab === '댓글') {
      return comments.map((comments) => (
        <CommentsContainer key={comments.id}>
          <ContentContainer>
            <Title>{comments.content}</Title>
            <SeepostContainer>
              <SeePost> 게시물 보기 </SeePost>
              <PostArrow />
            </SeepostContainer>

          </ContentContainer>
        </CommentsContainer>
      ));
    }
  };

  return (
    <Container>
      <TextContainer>
        <Tab
          isActive={activeTab === '게시글'}
          onClick={() => setActiveTab('게시글')}
        >
          게시글
        </Tab>
        <Tab
          isActive={activeTab === '댓글'}
          onClick={() => setActiveTab('댓글')}
        >
          댓글
        </Tab>
      </TextContainer>

      <Divider />
      {renderContents()}
    </Container>
  );
};

export default MyComments;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 25px;
  margin-bottom: 200px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 45px;
  margin-left: 29px;
`;

const Tab = styled.div`
  color: ${(props) => (props.isActive ? 'white' : '#4D4D4D')};
  font-size: ${(props) => (props.isActive ? '22px' : '18px')};
  font-weight: ${(props) => (props.isActive ? '600' : '500')};
  line-height: normal;
  cursor: pointer;
`;

const Divider = styled.div`
  width: 1005px;
  flex-shrink: 0;
  border: 1px solid #ddd;
  background-color: #ddd;
  margin-top: 13px;
  margin-bottom: 34px;
`;

const CommentContainer = styled.div`
  width: 971px;
  height: auto; // 이 부분 얘기
  /* height: 160px; */
  flex-shrink: 0;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0px 0px 5px #9819c3;
  margin-bottom: 20px;
  margin-left: 29px;

`;

const ContentsContainer = styled.div`
  padding: 0 39px 0 50px;
`;

const CommentTitle = styled.p`
  color: white;
  font-size: 22px;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 13px;
`;

const CommentContents = styled.p`
  color: white;
  font-size: 18px;
  font-weight: 500;
  line-height: normal;

`;


const CommentsContainer = styled.div`
  width: 971.34px;
  height: 110.641px;
  flex-shrink: 0;
  border: 1px solid #DDD;
  box-shadow: 0px 0px 5px #9819c3;
  margin-bottom: 20px; 
  margin-left: 29px;
  border-radius: 10px;
`;

const ContentContainer = styled.div`
  padding: 29px 22px 0 50px;
`

const Title = styled.div`
  color: white;
  font-size: 22px;
  font-weight: 600;
`

const SeepostContainer = styled.div`
  display: flex;
  align-items: center; 
  justify-content: flex-end;
  margin-bottom: 20px;
  margin-right: 22px;
  cursor: pointer;
`;

const SeePost = styled.p`
  color: #B2B2B2;
  font-weight: 500;
  line-height: normal;
  margin-right: 9px; 
`;


