import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as PostArrow } from '../../../../assets/postarrow.svg';
import dummyContent from '../../../../store/community/dummyContent';
import { useNavigate } from 'react-router-dom';

const MyComments = () => {
  const [activeTab, setActiveTab] = useState('게시글');
  const post = dummyContent;
  const comments = dummyContent;
  const navigate = useNavigate();

  const renderContents = () => {
    if (activeTab === '게시글') {
      return post.map((post) => (
        <CommentContainer key={post.No} onClick={console.log(post.No)}>
          <ContentsContainer onClick={() => navigate('/community')}>
            <CommentTitle>{post.Title}</CommentTitle>
            <CommentContents>{post.Content.length > 210 ? post.Content.slice(0, 209) + "..." : post.Content}</CommentContents>
          </ContentsContainer>
        </CommentContainer>
      ));
    }
    if (activeTab === '댓글') {
      return comments.map(post =>
        post.Comment.map(comment => (
          <CommentsContainer key={comment.No}>
            <ContentContainer>
              <Title>
                {comment.Content.length > 100 ? (
                  <>
                    {comment.Content.slice(0, 51)}
                    <br />
                    {comment.Content.slice(51, 100)}
                  </>
                ) : (
                  comment.Content
                )}
              </Title>
            </ContentContainer>

            <SeepostContainer issingleLine={comment.Content.length < 60} onClick={() => navigate('/community')} >
              <SeePost> 게시물 보기 </SeePost>
              <PostArrow stroke='#0077FF' />
            </SeepostContainer>
          </CommentsContainer>
        ))
      );
    }

  };

  return (
    <AllContainer>
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
    </AllContainer>
  );
};

export default MyComments;

const AllContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 100px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:flex-start;
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
  height: 160px;
  flex-shrink: 0;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0px 0px 5px #9819c3;
  margin-bottom: 20px;
  margin-left: 29px;
  cursor: pointer;

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
  width: 971px;
  height: 110px;
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
  padding-right: 110px;
`

const SeepostContainer = styled.div`
  display: flex;
  align-items: center; 
  justify-content: flex-end;
  margin-right: 22px;
  cursor: pointer;
  margin-top: ${(props) => (props.issingleLine ? '16px' : '-9px')};
`;

const SeePost = styled.div`
  color: #0077FF;
  font-weight: 500;
  line-height: normal;
  margin-right: 9px; 
`;


