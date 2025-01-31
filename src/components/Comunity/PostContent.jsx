import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import formatDate from '../../api/formatDate';

import ViewPhoto from '../../assets/Community/ViewPhoto.svg';
import CommentPhoto from '../../assets/Community/CommentPhoto.svg';
import Edit from '../../assets/Community/EditButton.svg';
import Delete from '../../assets/Community/DeleteButton.svg';
import Alert from '../../assets/Community/SirenButton.svg';

const PostContent = ({ comment, handleModal, selectedPost }) => {
  const navigate = useNavigate();

  return (
    <>
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
            <ButtonContainer
              onClick={() => navigate('/edit', { state: { selectedPost } })}
              src={Edit}
              alt={'그럴리없다'}
            />
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
    </>
  );
};

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

const ReportButton = styled.img`
  background-color: transparent;
  border: none;
  color: red;
  cursor: pointer;
`;

export default PostContent;
