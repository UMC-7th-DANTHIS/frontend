import React, { useState, useEffect } from 'react';
import {
  useNavigate,
  useLocation,
  useOutletContext,
  useParams
} from 'react-router-dom';
import styled from 'styled-components';

import ImageModal from '../../common/Comunity/ImageModal';
import PostComment from '../../common/Comunity/PostComment';
import PostContent from '../../common/Comunity/PostContent';
import Pagination from '../../components/Pagination';
import ConfirmLeaveAlert from '../../components/ConfirmLeaveAlert';

import axiosInstance from '../../api/axios-instance';
import useGet from '../../hooks/useGet';
import useGetCommunity from '../../hooks/useGetCommunity';
import useGetComment from '../../hooks/useGetComment';

import { SinglePostData } from '../../types/CommunityInterface';
import { Comment } from '../../types/CommunityInterface';
import useIsMobile from '../../hooks/useIsMobile';

type SinglePostProps = {
  selectedPost: SinglePostData;
};

interface PostPageReload {
  setForceReload: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommunityPostPage = () => {
  const [, setComments] = useState<Comment[]>([]);
  const [forceReload, setForceReload] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const perData: number = 5;

  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  const { id } = useParams();

  // 게시물 정보 가져오기
  const selectedPost = (location.state as SinglePostProps) || {};

  const { data: user } = useGet();
  const { setForceReload: setListReload } = useOutletContext<PostPageReload>();
  const { data: post } = useGetCommunity(selectedPost!.selectedPost.postId);

  // 댓글 가져오기
  const { data: com } = useGetComment(
    selectedPost?.selectedPost.postId,
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

  const handleModal = (imgUrl: string): void => {
    setImgUrl(imgUrl);
    setIsModalOpen(true);
  };

  const handleCaution = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCommentText(e.target.value);
    if (e.target.value.length > 200)
      setCautionText('댓글은 최대 200자까지 입력 가능합니다.');
    else if (e.target.value.length === 0)
      setCautionText('댓글을 최소 1자 이상 입력하셔야 합니다.');
    else setCautionText(null);
  };

  const handleCancel = (): void => {
    if (commentText) setShowCancelAlert(true);
    else navigate('/community');
  };

  const handleCommentSubmit = async (): Promise<void> => {
    if (!commentText.trim()) return;

    try {
      const response = await axiosInstance.post(
        `/community/posts/${parseInt(id!)}/comments`,
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
            <div>{post?.title}</div>
          </PostHeader>
          <PostContent
            length={com?.data.totalComments!}
            handleModal={handleModal}
            selectedPost={post!}
            user={user}
            setListReload={setListReload}
          />
          {isMobile ? (
            <>
              <CommentSection>
                {com?.data.comments.map((comment) => (
                  <>
                    <PostComment
                      comment={comment}
                      postId={selectedPost?.selectedPost.postId}
                      user={user}
                      setForceReload={setForceReload}
                    />
                  </>
                ))}

                {com?.data.comments.length! > 0 && (
                  <PaginationContainer>
                    <Pagination
                      dataLength={com?.data.totalComments!}
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
                </CommentInput>

                <CautionContainer> {cautionText || '\u00A0'}</CautionContainer>
              </CommentSection>
              <ButtonWrapper>
                <BackButton onClick={(): void => handleCancel()}>
                  글 목록으로
                </BackButton>
                {cautionText ? (
                  <InactiveButton>작성</InactiveButton>
                ) : (
                  <button onClick={(): Promise<void> => handleCommentSubmit()}>
                    작성
                  </button>
                )}
              </ButtonWrapper>
            </>
          ) : (
            <>
              <CommentSection>
                {com?.data.comments.map((comment) => (
                  <>
                    <PostComment
                      comment={comment}
                      postId={selectedPost?.selectedPost.postId}
                      user={user}
                      setForceReload={setForceReload}
                    />
                  </>
                ))}

                {com?.data.comments.length! > 0 && (
                  <PaginationContainer>
                    <Pagination
                      dataLength={com?.data.totalComments!}
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
                    <button
                      onClick={(): Promise<void> => handleCommentSubmit()}
                    >
                      작성
                    </button>
                  )}
                </CommentInput>
                <CautionContainer> {cautionText || '\u00A0'}</CautionContainer>
              </CommentSection>
              <BackButton onClick={(): void => handleCancel()}>
                글 목록으로
              </BackButton>
            </>
          )}
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
          onClose={(): void => setShowCancelAlert(false)}
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
  width: 100%;
  max-width: 900px;
  padding: 0 2rem;
  margin-bottom: 30px;
`;

const Wrapper = styled.div`
  color: white;
`;

const PostHeader = styled.div`
  border-bottom: 1.5px solid #d9d9d9;
  margin-bottom: 20px;
  text-align: center;

  div {
    font-size: 20px;
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
  min-width: 64px;
  min-height: 30px;

  display: flex;
  justify-content: center;
  align-items: center;

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
  display: flex;
  justify-content: center;
  align-items: center;

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

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    min-width: 64px;
    min-height: 30px;

    background-color: #9819c3;
    border: none;
    color: white;
    border-radius: 10px;
    font-size: 16px;
    cursor: pointer;
  }
`;

const CautionContainer = styled.div`
  margin-top: 10px;
  min-height: 20px;
  color: #f00;
  font-size: 14px;
  text-align: right;
  margin-bottom: 10px;
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
