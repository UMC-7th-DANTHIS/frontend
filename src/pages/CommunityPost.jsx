import React, { useState, useEffect } from "react";
import styled from "styled-components";
import dummyContent from "../store/community/dummyContent";

const CommunityPost = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    setData(dummyContent);
  });

  return (
    <Container>
      <Wrapper>
        <PostHeader>
          <div>{data[0]?.Title}</div>
        </PostHeader>

        <Content>
          <p>
            {data[0]?.Content}
            <br />
          </p>
        </Content>

        <CommentSection>
          {data[0]?.Comment.map((comment) => (
            <Comment>
              <CommentProfile>
                <CommentImage src="https://via.placeholder.com/50" />
                <CommentDate></CommentDate>
              </CommentProfile>
              <CommentContent>{comment.Content}</CommentContent>
            </Comment>
          ))}
          <CommentInput>
            <input type="text" placeholder="댓글을 입력해주세요" />
            <button>작성</button>
          </CommentInput>
        </CommentSection>
        <BackButton>글 목록으로</BackButton>
      </Wrapper>
    </Container>
  );
};

export default CommunityPost;

const Container = styled.div`
  padding-top: 30px;
  background-color: #000000;
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

const Content = styled.div`
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
  padding: 10px;
  margin-bottom: 32px;
`;

const CommentProfile = styled.div`
  margin-left: 12px;
  margin-top: 14px;
`;

const CommentImage = styled.img`
  display: inline-flex;
`;

const CommentDate = styled.div``;

const CommentContent = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 16px;
  margin-bottom: 16px;
  margin-left: 12px;
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
  border: 1px solid #4d4d4d;
  background-color: #ddd;
  color: #4d4d4d;
  text-align: center;

  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
