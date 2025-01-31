import React, { useState } from 'react';
import styled from 'styled-components';
import dummyContent from '../../../../store/community/dummyContent';
import { useNavigate } from 'react-router-dom';
import CommentsReview from './CommentsReview';

const MyComments = () => {
  const [activeTab, setActiveTab] = useState('게시글');
  const post = dummyContent;
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
    if (activeTab === '리뷰') {
      return (
        <CommentsReview />
      )
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
            isActive={activeTab === '리뷰'}
            onClick={() => setActiveTab('리뷰')}
          >
            리뷰
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


const BoxContainer = styled.div`
  width: 970px;
  height: 222px;
  flex-shrink: 0;
  border: 1px solid #DDD;
  box-shadow:0px 0px 5px #9819C3;
  border-radius: 10px;

`