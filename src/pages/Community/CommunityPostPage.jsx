import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import CommunityComment from '../../store/community/CommunityComment';
import ImageModal from '../../components/Comunity/ImageModal';
import formatDate from '../../api/formatDate';

import ViewPhoto from '../../assets/Community/ViewPhoto.svg';
import CommentPhoto from '../../assets/Community/CommentPhoto.svg';
import Edit from '../../assets/Community/EditButton.svg';
import Delete from '../../assets/Community/DeleteButton.svg';
import Alert from '../../assets/Community/SirenButton.svg';

const CommunityPostPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedPost } = location.state || {};

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState('');

  const handleModal = (imgUrl) => {
    setImgUrl(imgUrl);
    setIsModalOpen(true);
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

          <PostInfo>
            <PostStats>
              <ViewContainer src={ViewPhoto} alt={'그럴리없다'} />
              <TextContainer>{selectedPost?.views}</TextContainer>
              <ViewContainer src={CommentPhoto} alt={'그럴리없다'} />
              <TextContainer>{comment?.length}</TextContainer>
            </PostStats>
            <PostMeta>
              <span>작성일 : {formatDate(selectedPost?.created_at)}</span>
            </PostMeta>
          </PostInfo>
          <PostInfo>
            {true ? (
              <PostActions>
                <ButtonContainer src={Edit} alt={'그럴리없다'} />
                <ButtonContainer src={Delete} alt={'그럴리없다'} />
              </PostActions>
            ) : (
              <PostActions>
                <ReportButton src={Alert} alt={'그럴리없다'} />
              </PostActions>
            )}
            <PostMeta>
              <span>작성자 : {selectedPost?.user_id}</span>{' '}
            </PostMeta>
          </PostInfo>
          <Content>
            {selectedPost?.content}
            {selectedPost?.image.length && (
              <ImageContainer>
                {selectedPost?.image.map((img) => (
                  <Image
                    src={img}
                    alt={'이미지'}
                    onClick={() => handleModal(img)}
                  />
                ))}
              </ImageContainer>
            )}
            <br />
          </Content>

          <CommentSection>
            {comment?.map((comment) => (
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

const PostInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PostStats = styled.div`
  display: flex;
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

const ViewContainer = styled.img`
  display: flex;
  width: 28px;
  height: 28px;

  margin-right: 5px;
`;

const ButtonContainer = styled.img`
  display: flex;
  width: 28px;
  height: 28px;
  cursor: pointer;
`;

const TextContainer = styled.div`
  display: flex;

  margin-top: 4px;
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  margin-right: 10px;
`;

const PostActions = styled.div`
  display: flex;
  gap: 10px;

  margin-left: 10px;

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

const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;

  margin-top: 45px;
  margin-left: 20px;

  width: 900px;
  height: 200px;
`;

const Image = styled.img`
  border-radius: 7px;
  width: 200px;
  height: 200px;
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

const ReportButton = styled.img`
  background-color: transparent;
  border: none;
  color: red;
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
