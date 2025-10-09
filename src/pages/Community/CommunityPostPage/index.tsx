import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import * as S from './styled';

import ImageModal from '../../../common/Comunity/ImageModal';
import PostComment from '../../../common/Comunity/PostComment';
import PostContent from '../../../common/Comunity/PostContent';
import Pagination from '../../../components/Pagination';
import ConfirmLeaveAlert from '../../../components/ConfirmLeaveAlert';

import axiosInstance from '../../../api/axios-instance';
import useGet from '../../../hooks/useGet';
import useGetCommunity from '../../../hooks/useGetCommunity';
import useGetComment from '../../../hooks/useGetComment';

import { Comment } from '../../../types/CommunityInterface';
import useIsMobile from '../../../hooks/useIsMobile';

interface PostPageReload {
  setForceReload: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CommunityPostPage = () => {
  const [, setComments] = useState<Comment[]>([]);
  const [forceReload, setForceReload] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const perData: number = 5;

  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const { id } = useParams();

  const { data: user } = useGet();
  const { setForceReload: setListReload } = useOutletContext<PostPageReload>();
  const { data: post } = useGetCommunity(parseInt(id!));

  // 댓글 가져오기
  const { data: com } = useGetComment(
    parseInt(id!),
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
      <S.Container>
        <S.Wrapper>
          <S.PostHeader>
            <div>{post?.title}</div>
          </S.PostHeader>
          <PostContent
            length={com?.data.totalComments!}
            handleModal={handleModal}
            selectedPost={post!}
            user={user}
            setListReload={setListReload}
          />
          {isMobile ? (
            <>
              <S.CommentSection>
                {com?.data.comments.map((comment) => (
                  <>
                    <PostComment
                      comment={comment}
                      postId={parseInt(id!)}
                      user={user}
                      setForceReload={setForceReload}
                    />
                  </>
                ))}

                {com?.data.comments.length! > 0 && (
                  <S.PaginationContainer>
                    <Pagination
                      dataLength={com?.data.totalComments!}
                      perData={perData}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                    />
                  </S.PaginationContainer>
                )}

                <S.CommentInput>
                  <input
                    type="text"
                    placeholder="댓글을 입력해주세요"
                    value={commentText}
                    onChange={handleCaution}
                  />
                </S.CommentInput>

                <S.CautionContainer>
                  {' '}
                  {cautionText || '\u00A0'}
                </S.CautionContainer>
              </S.CommentSection>
              <S.ButtonWrapper>
                <S.BackButton onClick={(): void => handleCancel()}>
                  글 목록으로
                </S.BackButton>
                {cautionText ? (
                  <S.InactiveButton>작성</S.InactiveButton>
                ) : (
                  <button onClick={(): Promise<void> => handleCommentSubmit()}>
                    작성
                  </button>
                )}
              </S.ButtonWrapper>
            </>
          ) : (
            <>
              <S.CommentSection>
                {com?.data.comments.map((comment) => (
                  <>
                    <PostComment
                      comment={comment}
                      postId={parseInt(id!)}
                      user={user}
                      setForceReload={setForceReload}
                    />
                  </>
                ))}

                {com?.data.comments.length! > 0 && (
                  <S.PaginationContainer>
                    <Pagination
                      dataLength={com?.data.totalComments!}
                      perData={perData}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                    />
                  </S.PaginationContainer>
                )}

                <S.CommentInput>
                  <input
                    type="text"
                    placeholder="댓글을 입력해주세요"
                    value={commentText}
                    onChange={handleCaution}
                  />
                  {cautionText ? (
                    <S.InactiveButton>작성</S.InactiveButton>
                  ) : (
                    <button
                      onClick={(): Promise<void> => handleCommentSubmit()}
                    >
                      작성
                    </button>
                  )}
                </S.CommentInput>
                <S.CautionContainer>
                  {' '}
                  {cautionText || '\u00A0'}
                </S.CautionContainer>
              </S.CommentSection>
              <S.BackButton onClick={(): void => handleCancel()}>
                글 목록으로
              </S.BackButton>
            </>
          )}
        </S.Wrapper>
      </S.Container>

      {showCancelAlert && (
        <ConfirmLeaveAlert
          message={
            <S.AlertText>
              해당 페이지를 벗어나면{'\n'}
              작성 중인 정보가 <S.ColoredText> 모두 삭제</S.ColoredText>됩니다.
              {'\n'}
              떠나시겠습니까?
            </S.AlertText>
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
