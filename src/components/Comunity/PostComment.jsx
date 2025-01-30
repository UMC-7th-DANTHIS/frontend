import React from 'react';
import styled from 'styled-components';

import formatDate from '../../api/formatDate';

import Delete from '../../assets/Community/DeleteButton.svg';
import Alert from '../../assets/Community/SirenButton.svg';

const PostComment = ({ comment }) => {
  return (
    <Comment>
      <CommentProfile>
        <CommentImage
          src="https://via.placeholder.com/50"
          alt="프로필 이미지"
        />
        <CommentDetails>
          <CommentDate>{formatDate(comment.created_at)}</CommentDate>
          <CommentAuthor>{comment.user_id}</CommentAuthor>
        </CommentDetails>
        {true ? (
          <ReportButton src={Alert} alt={'그럴리없다'} />
        ) : (
          <ButtonContainer src={Delete} alt={'그럴리없다'} />
        )}
      </CommentProfile>
      <CommentContent>{comment.content}</CommentContent>
    </Comment>
  );
};

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

const ReportButton = styled.img`
  background-color: transparent;
  border: none;
  color: red;
  cursor: pointer;
`;

const ButtonContainer = styled.img`
  display: flex;
  width: 28px;
  height: 28px;
  cursor: pointer;
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

export default PostComment;
