import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useOutletContext } from 'react-router-dom';
import styled from 'styled-components';

import ImageModal from '../../components/Comunity/ImageModal';
import PostComment from '../../components/Comunity/PostComment';
import PostContent from '../../components/Comunity/PostContent';
import Pagination from '../../components/Pagination';
import ConfirmLeaveAlert from '../../components/ConfirmLeaveAlert';

import axiosInstance from '../../api/axios-instance';
import useGet from '../../hooks/useGet';
import useGetCommunity from '../../hooks/useGetCommunity';
import useGetComment from '@/hooks/useGetComment';

import { UserResponse } from '@/types/UserInterface';
import { SinglePostResponse, SinglePostData } from '@/types/CommunityInterface';
import { CommentResponse, Comment } from '@/types/CommunityInterface';

interface PostPageReload {
  setForceReload: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommunityPostPage = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [forceReload, setForceReload] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const perData: number = 5;

  const navigate = useNavigate();
  const location = useLocation();

  // 게시물 정보 가져오기
  const selectedPost = (location.state as SinglePostData) || {};
  const { data: user } = useGet<UserResponse>();
  const { setForceReload: setListReload } = useOutletContext<PostPageReload>();
  const { data: post } = useGetCommunity<SinglePostResponse>(
    selectedPost?.postId
  );

  // 댓글 가져오기
  const { data: com } = useGetComment<CommentResponse>(
    selectedPost?.postId,
    1,
    currentPage,
    forceReload
  );

  useEffect(() => {
    if (com?.data?.comments) {
      setComments(com.data.comments);
    }
  }, [com]);

  // 알람 모달창
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showCancelAlert, setShowCancelAlert] = useState<boolean>(false);

  // 이미지 처리
  const [imgUrl, setImgUrl] = useState<string>('');
  const [commentText, setCommentText] = useState<string>('');
  const [cautionText, setCautionText] = useState<string | null>('');

  const handleModal = (imgUrl: string) => {
    setImgUrl(imgUrl);
    setIsModalOpen(true);
  };

  const handleCaution = (e: any) => {
    setCommentText(e.target.value);
    if (e.target.value.length > 200)
      setCautionText('댓글은 최대 200자까지 입력 가능합니다.');
    else if (e.target.value.length === 0)
      setCautionText('댓글을 최소 1자 이상 입력하셔야 합니다.');
    else setCautionText(null);
  };

  const handleCancel = () => {
    if (commentText) setShowCancelAlert(true);
    else navigate('/community');
  };

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;

    try {
      const response = await axiosInstance.post(
        `/community/posts/${selectedPost.postId}/comments`,
        { content: commentText }
      );

      setComments((prevComments: Comment[]) => [
        response.data,
        ...prevComments
      ]);

      setForceReload((prev: boolean) => !prev);
      setCommentText('');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <Container>
        <Wrapper>
          <PostHeader>
            <div>{post?.data.title}</div>
          </PostHeader>
          <PostContent
            length={com?.data.totalComments!}
            handleModal={handleModal}
            selectedPost={post?.data!}
            user={user}
            setListReload={setListReload}
          />
          <CommentSection>
            {com?.data.comments.map((comment) => (
              <>
                <PostComment
                  comment={comment}
                  postId={selectedPost.postId}
                  user={user}
                  setForceReload={setForceReload}
                />
              </>
            ))}

            {com?.data.comments.length! > 0 && (
              <PaginationContainer>
                <Pagination
                  dataLength={com?.data.totalComments}
                  perData={perData}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </PaginationContainer>
            )}

            <CommentInput>
              <input
                type="text"
                placeholder="댓글을 입력해주세요"
                value={commentText}
                onChange={handleCaution}
              />
              {cautionText ? (
                <InactiveButton>작성</InactiveButton>
              ) : (
                <button onClick={() => handleCommentSubmit()}>작성</button>
              )}
            </CommentInput>
            <CautionContainer> {cautionText || '\u00A0'}</CautionContainer>
          </CommentSection>
          <BackButton onClick={() => handleCancel()}>글 목록으로</BackButton>
        </Wrapper>
      </Container>

      {showCancelAlert && (
        <ConfirmLeaveAlert
          message={
            <AlertText>
              해당 페이지를 벗어나면{'\n'}
              작성 중인 정보가 <ColoredText> 모두 삭제</ColoredText>됩니다.
              {'\n'}
              떠나시겠습니까?
            </AlertText>
          }
          onClose={() => setShowCancelAlert(false)}
          showButtons={true}
        />
      )}

      {isModalOpen && (
        <ImageModal imgUrl={imgUrl} setIsModalOpen={setIsModalOpen} />
      )}
    </>
  );
};

const Container = styled.div`
  padding-top: 30px;
  background-color: #000000;
  padding-bottom: 100px;
  width: 1440px;
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

const CommentSection = styled.div`
  padding-top: 47px;
  border-top: 1px solid #d9d9d9;
`;

const CommentInput = styled.div`
  padding-top: 23px;
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
    font-size: 16px;
  }

  button {
    padding: 13px 18px;
    background-color: #9819c3;
    border: none;
    color: white;
    border-radius: 10px;
    font-size: 16px;
    cursor: pointer;
  }
`;

const InactiveButton = styled.div`
  padding: 13px 18px;
  background-color: grey;
  border: none;
  color: white;
  border-radius: 10px;
  font-size: 16px;
  cursor: inactive;
`;

const BackButton = styled.div`
  width: 90px;
  height: 27px;
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

const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 49px;
  padding-top: 32px;

  border-top: 1.5px solid #d9d9d9;
`;

const CautionContainer = styled.div`
  margin-top: 10px;
  padding-right: 86px;
  min-height: 20px;
  color: #f00;
  font-size: 14px;
  text-align: right;
`;

const AlertText = styled.span`
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px;
  white-space: pre-line;
`;
const ColoredText = styled.span`
  color: #a60f62;
  font-weight: bold;
`;

export default CommunityPostPage;
