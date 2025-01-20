import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import dummyContent from '../../store/community/dummyContent';

const CommunityPost = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { list } = location.state;

  const filteredPost = dummyContent.filter((num) => num.No === list.No);
  const post = filteredPost[0];

  return (
    <Container>
      <Wrapper>
        <PostHeader>
          <div>{post?.Title}</div>
        </PostHeader>

        <PostInfo>
          <PostStats>
            <span>👁 {post?.See}</span>
            <span>💬 {post?.Comment?.length}</span>
          </PostStats>
          <PostMeta>
            <span>작성일 : {post?.DateAt}</span>
          </PostMeta>
        </PostInfo>
        <PostInfo>
          <PostActions>
            <button>✏</button>
            <button>🗑</button>
          </PostActions>
          <PostMeta>
            <span>작성자 : {post?.Author}</span>{' '}
          </PostMeta>
        </PostInfo>
        <Content>
          <p>
            {post?.Content}
            <br />
          </p>
        </Content>

        <CommentSection>
          {post?.Comment?.map((comment) => (
            <Comment>
              <CommentProfile>
                <CommentImage
                  src="https://via.placeholder.com/50"
                  alt="프로필 이미지"
                />
                <CommentDetails>
                  <CommentDate>{comment.DateAt}</CommentDate>
                  <CommentAuthor>{comment.Author}</CommentAuthor>
                </CommentDetails>
                <ReportButton>⚠</ReportButton>
              </CommentProfile>
              <CommentContent>{comment.Content}</CommentContent>
            </Comment>
          ))}
          <CommentInput>
            <input type="text" placeholder="댓글을 입력해주세요" />
            <button>작성</button>
          </CommentInput>
        </CommentSection>
        <BackButton onClick={() => navigate('/community')}>
          글 목록으로
        </BackButton>
      </Wrapper>
    </Container>
  );
};

export default CommunityPost;

const Container = styled.div`
  padding-top: 30px;
  background-color: #000000;
  padding-bottom: 100px;
`;

const Wrapper = styled.div`
  margin-left: 270px;
  margin-right: 270px;
  color: white;
`;

const PostHeader = styled.div`
  border-bottom: 1.5px solid #d9d9d9;
  margin-bottom: 20px;
  text-align: center;

  div {
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;

    margin-bottom: 20px;
  }
`;

const PostInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const PostStats = styled.div`
  display: flex;
  gap: 20px;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: #b2b2b2;

  margin-left: 10px;
  span {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

const PostActions = styled.div`
  display: flex;
  gap: 10px;
  margin-left: 50px;

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 18px;
    color: #888;

    &:hover {
      color: #ff4444;
    }
  }
`;

const PostMeta = styled.div`
  display: flex;
  justify-content: flex-end;

  color: #b2b2b2;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Content = styled.div`
  margin-top: 35px;
  margin-bottom: 47px;
  text-align: justify;

  p {
    line-height: 1.5;
    font-size: 1em;
  }
`;

const CommentSection = styled.div`
  padding-top: 47px;
  border-top: 1px solid #d9d9d9;
`;

const Comment = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 32px;
`;

const CommentProfile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const CommentImage = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 16px;
`;

const CommentDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
`;

const ReportButton = styled.button`
  background-color: transparent;
  border: none;
  color: red;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    color: #ff4444;
  }
`;

const CommentDate = styled.div`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const CommentAuthor = styled.div`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: #fff;
`;

const CommentContent = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 16px;
`;

const CommentInput = styled.div`
  padding-top: 23px;
  border-top: 1.5px solid #d9d9d9;
  display: flex;
  gap: 20px;

  input {
    flex: 1;
    padding: 10px;
    padding-left: 37px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: transparent;
    color: white;
  }

  button {
    padding: 9px 17px;
    background-color: #9819c3;
    border: none;
    color: white;
    border-radius: 10px;
    cursor: pointer;
  }
`;

const BackButton = styled.div`
  width: 90px;
  height: 27px;
  margin-top: 17px;
  padding-top: 9px;
  border-radius: 10px;
  border: 1px solid #bf00ff;
  background-color: transparent;
  color: #bf00ff;
  text-align: center;
  cursor: pointer;

  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
