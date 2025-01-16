import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as PostArrow } from '../../../assets/postarrow.svg';

const MyComments = () => {
  const [activeTab, setActiveTab] = useState('게시글');

  const post = [
    {
      title: 'Tania의 노래 추천_더럽게 못됐어 모든 게 변했어 멀쩡했던 사람 하나를 너가 다 베려놨어',
      contents:
        'BOYNEXTDOOR - ABCDLOVE / ABCDLOVE 라더니 이제 와 바꾸려니 먹고 있지 애를 되돌려줘 내 ABCDLOVE 아님 새로운 사랑을 그려주세요 쉽게 쉽게 외우던 쉬운 영어 단어도 이젠 모르겠어 내가 알던 LOVE 의미 바뀌어 버렸어 다시 배워야 할 판이야 Oh 더럽게 못됐어 Oh 모든 게 변했어 멀쩡했던 사람 하나를 너가 다 베려놨어 달과 별이었던',
    },
    {
      title: 'Tania의 노래 추천_더럽게 못됐어 모든 게 변했어 멀쩡했던 사람 하나를 너가 다 베려놨어',
      contents:
        'BOYNEXTDOOR - ABCDLOVE / ABCDLOVE 라더니 이제 와 바꾸려니 먹고 있지 애를 되돌려줘 내 ABCDLOVE 아님 새로운 사랑을 그려주세요 쉽게 쉽게 외우던 쉬운 영어 단어도 이젠 모르겠어 내가 알던 LOVE 의미 바뀌어 버렸어 다시 배워야 할 판이야 Oh 더럽게 못됐어 Oh 모든 게 변했어 멀쩡했던 사람 하나를 너가 다 베려놨어 달과 별이었던',
    },
    {
      title: 'Tania의 노래 추천_더럽게 못됐어 모든 게 변했어 멀쩡했던 사람 하나를 너가 다 베려놨어',
      contents:
        'BOYNEXTDOOR - ABCDLOVE / ABCDLOVE 라더니 이제 와 바꾸려니 먹고 있지 애를 되돌려줘 내 ABCDLOVE 아님 새로운 사랑을 그려주세요 쉽게 쉽게 외우던 쉬운 영어 단어도 이젠 모르겠어 내가 알던 LOVE 의미 바뀌어 버렸어 다시 배워야 할 판이야 Oh 더럽게 못됐어 Oh 모든 게 변했어 멀쩡했던 사람 하나를 너가 다 베려놨어 달과 별이었던',
    },
    {
      title: 'Tania의 노래 추천_더럽게 못됐어 모든 게 변했어 멀쩡했던 사람 하나를 너가 다 베려놨어',
      contents:
        'BOYNEXTDOOR - ABCDLOVE / ABCDLOVE 라더니 이제 와 바꾸려니 먹고 있지 애를 되돌려줘 내 ABCDLOVE 아님 새로운 사랑을 그려주세요 쉽게 쉽게 외우던 쉬운 영어 단어도 이젠 모르겠어 내가 알던 LOVE 의미 바뀌어 버렸어 다시 배워야 할 판이야 Oh 더럽게 못됐어 Oh 모든 게 변했어 멀쩡했던 사람 하나를 너가 다 베려놨어 달과 별이었던',
    },
  ];

  const comments = [
    {
      title: '보이넥스트도어의 ABCDLOVE 많관부'
    },
    {
      title: '보이넥스트도어의 ABCDLOVE 많관부'
    },
    {
      title: '보이넥스트도어의 ABCDLOVE 많관부'
    },
    {
      title: '보이넥스트도어의 ABCDLOVE 많관부'
    },
    {
      title: '보이넥스트도어의 ABCDLOVE 많관부'
    },
  ]

  const renderContents = () => {
    if (activeTab === '게시글') {
      return post.map((post, index) => (
        <CommentContainer key={index}>
          <ContentsContainer>
            <CommentTitle>{post.title}</CommentTitle>
            <CommentContents>{post.contents}</CommentContents>
          </ContentsContainer>
        </CommentContainer>
      ));
    }
    if (activeTab === '댓글') {
      return comments.map((comments, index) => (
        <CommentsContainer key={index}>
          <ContentContainer>
            <Title>{comments.title}</Title>
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
  height: 160px;
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

