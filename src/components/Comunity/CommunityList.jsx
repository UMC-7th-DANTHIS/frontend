import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import formatDate from '../../api/formatDate';
import useFetchList from '../../hooks/useFetchList';

import ImageDescript from '../../assets/Search/imageDescript.svg';
import CommentPhoto from '../../assets/Community/CommentPhoto.svg';

const CommunityList = ({ list }) => {
  const navigate = useNavigate();

  const { data: post } = useFetchList(list.postId);

  const handleNavigate = (temp) => {
    navigate(`/community/${temp.postId}`, { state: { selectedPost: temp } });
  };

  return (
    <ListContainer>
      <NoList>{list?.postId}</NoList>
      {post?.data.images.length ? (
        <ImageYes src={ImageDescript} alt={'그림있으요'} />
      ) : (
        <ImageNo />
      )}
      <TitleList onClick={() => handleNavigate(post.data)}>
        {post?.data.title}
        {post?.data.commentCount > 0 ? (
          <>
            <ViewDescript src={CommentPhoto} alt={'댓글있으요'} />
            <ViewPeople>{post?.data.commentCount}</ViewPeople>
          </>
        ) : (
          ''
        )}
      </TitleList>
      <DateList>
        <DateList>{formatDate(post?.data.createdAt, 3)}</DateList>
      </DateList>
    </ListContainer>
  );
};

const ListContainer = styled.div`
  margin-top: 16px;
  margin-left: 60px;
  height: 20px;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: white;

  display: flex;
  align-items: center;
`;

const NoList = styled.span`
  display: inline-block;
  width: 17px;
  margin-right: 40px;
  text-align: center;
`;

const ImageYes = styled.img`
  display: inline-block;
  margin-left: 50px;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
`;

const ImageNo = styled.div`
  display: inline-block;
  margin-left: 50px;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  background-color: transparent;
`;

const TitleList = styled.button`
  display: inline-flex;
  margin-left: 5px;
  width: 668px;
  text-align: start;
  border: 0;
  background-color: transparent;
  color: white;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
`;

const ViewDescript = styled.img`
  display: inline-flex;
  justify-content: center;
  margin-left: 10px;
  width: 16px;
  height: 16px;
`;

const ViewPeople = styled.div`
  display: inline-flex;
  color: #ddd;
  margin-left: 5px;

  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

const DateList = styled.span`
  display: inline-flex;
  width: 100px;
  margin-left: 27px;
  text-align: center;
`;

export default CommunityList;
