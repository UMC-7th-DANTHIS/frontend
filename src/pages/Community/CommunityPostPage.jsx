import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import ImageModal from '../../components/Comunity/ImageModal';
import PostComment from '../../components/Comunity/PostComment';
import PostContent from '../../components/Comunity/PostContent';
import Pagination from '../../components/Pagination';

import ConfirmLeaveAlert from '../../components/ConfirmLeaveAlert';
import useFetchList from '../../hooks/useFetchList';
import axiosInstance from '../../api/axios-instance';
import useGet from '../../hooks/useGet';

const CommunityPostPage = () => {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const perData = 5;

  const navigate = useNavigate();
  const location = useLocation();

  // 게시물 정보 가져오기
  const { selectedPost } = location.state || {};
  const { data: user } = useGet();

  // 댓글 가져오기
  const {
    data: com,
    isLoading,
    isError
  } = useFetchList(selectedPost?.postId, 1, currentPage);

  console.log(com);

  useEffect(() => {
    if (com?.data?.comments) {
      setComments(com.data.comments);
    }
  }, [com]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCancelAlert, setShowCancelAlert] = useState(false);

  const [imgUrl, setImgUrl] = useState('');
  const [commentText, setCommentText] = useState('');
  const [cautionText, setCautionText] = useState('');

  const handleModal = (imgUrl) => {
    setImgUrl(imgUrl);
    setIsModalOpen(true);
  };

  const handleCaution = (e) => {
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

    const postData = {
      content: commentText
    };

    try {
      const response = await axiosInstance.post(
        `/community/posts/${selectedPost.postId}/comments`,
        postData
      );

      setComments((prevComments) => [response.data, ...prevComments]);

      setCommentText('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <Wrapper>
          <PostHeader>
            <div>{selectedPost?.title}</div>
          </PostHeader>
          <PostContent
            length={com?.data.totalComments}
            comment={com?.data.comments}
            handleModal={handleModal}
            selectedPost={selectedPost}
            user={user}
          />
          <CommentSection>
            {com?.data.comments.map((comment) => (
              <PostComment
                comment={comment}
                postId={selectedPost.postId}
                user={user}
              />
            ))}
            <PaginationContainer>
              <Pagination
                dataLength={com?.data.totalComments}
                perData={perData}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </PaginationContainer>
            <CommentInput>
              <input
                type="text"
                placeholder="댓글을 입력해주세요"
                value={commentText}
                onChange={handleCaution}
              />
              {cautionText ? (
                <inactivebutton>작성</inactivebutton>
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

export default CommunityPostPage;

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

  inactivebutton {
    padding: 13px 18px;
    background-color: grey;
    border: none;
    color: white;
    border-radius: 10px;
    font-size: 16px;
    cursor: inactive;
  }
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
