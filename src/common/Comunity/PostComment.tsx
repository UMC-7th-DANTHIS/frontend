import React from 'react';
import styled from 'styled-components';

import formatDate from '../../api/formatDate';
import Delete from '../../assets/Community/DeleteButton.svg';
import Alert from '../../assets/Community/SirenButton.svg';

import axiosInstacne from '../../api/axios-instance';

import { Comment } from '@/types/CommunityInterface';
import { UserData } from '@/types/UserInterface';

type PostCommentProps = {
  comment: Comment;
  postId: number;
  user: UserData | null;
  setForceReload: React.Dispatch<React.SetStateAction<boolean>>;
};

const PostComment = ({
  comment,
  postId,
  user,
  setForceReload
}: PostCommentProps) => {
  const handleDelete = async (): Promise<void> => {
    try {
      await axiosInstacne.delete(
        `/community/posts/${postId}/comments/${comment.commentId}`
      );
      setForceReload((prev: boolean) => !prev);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <CommentContainer>
      <CommentProfile>
        <CommentImage src={comment.userProfileImage} alt="Profile Image" />
        <CommentDetails>
          <CommentDate>{formatDate(comment.createdAt, 2)}</CommentDate>
          <CommentAuthor>{comment.userName}</CommentAuthor>
        </CommentDetails>
        {user?.nickname === comment.userName &&
        user?.profileImage === comment.userProfileImage ? (
          <ButtonContainer
            src={Delete}
            alt={'Button'}
            onClick={() => handleDelete()}
          />
        ) : (
          <ReportButton src={Alert} alt={'Alert'} />
        )}
      </CommentProfile>
      <CommentContent>{comment.content}</CommentContent>
    </CommentContainer>
  );
};

const CommentContainer = styled.div`
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
