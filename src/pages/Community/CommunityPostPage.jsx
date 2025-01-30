import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import CommunityComment from '../../store/community/CommunityComment';
import ImageModal from '../../components/Comunity/ImageModal';
import PostComment from '../../components/Comunity/PostComment';
import PostContent from '../../components/Comunity/PostContent';

const CommunityPostPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedPost } = location.state || {};

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentCaution, setCommentCaution] = useState(true);
  const [imgUrl, setImgUrl] = useState('');
  const [commentText, setCommentText] = useState('');

  const handleModal = (imgUrl) => {
    setImgUrl(imgUrl);
    setIsModalOpen(true);
  };

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
    if (e.target.value.length > 200 || e.target.value.length === 0)
      setCommentCaution(true);
    else setCommentCaution(false);
  };

  const comment = CommunityComment.filter(
    (num) => num.post_id === selectedPost?.id
  );

  return (
    <>
      <Container>
        <Wrapper>
          <PostHeader>
            <div>{selectedPost?.title}</div>
          </PostHeader>
          <PostContent
            comment={comment}
            handleModal={handleModal}
            selectedPost={selectedPost}
          />
          <CommentSection>
            {comment?.map((comment) => (
              <PostComment comment={comment} />
            ))}
            <CommentInput>
              <input
                type="text"
                placeholder="댓글을 입력해주세요"
                value={commentText}
                onChange={handleCommentChange}
              />
              {commentCaution ? (
                <inactivebutton>작성</inactivebutton>
              ) : (
                <button>작성</button>
              )}
            </CommentInput>
          </CommentSection>
          <BackButton onClick={() => navigate('/community')}>
            글 목록으로
          </BackButton>
        </Wrapper>
      </Container>
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

  inactivebutton {
    padding: 9px 17px;
    background-color: grey;
    border: none;
    color: white;
    border-radius: 10px;
    cursor: inactive;
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
