import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import styled from 'styled-components';

import Pagination from '../Pagination';
import CommunityList from './CommunityList';

import { CommunityPostListOutlet } from '@/types/Context/CommunityPostList';
import { PostPreview } from '@/types/CommunityInterface';

const CommunityLists = () => {
  const navigate = useNavigate();
  const { lists, perData, currentPage, setCurrentPage } =
    useOutletContext<CommunityPostListOutlet>();

  return (
    <ListsContainer>
      {lists?.posts.map((list: PostPreview) => <CommunityList list={list} />)}
      <PaginationContainer>
        <PaginationWrapper>
          <Pagination
            dataLength={lists?.totalPosts!}
            perData={perData}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </PaginationWrapper>
        <WriteButton onClick={() => navigate('edit')}>글쓰기</WriteButton>
      </PaginationContainer>
    </ListsContainer>
  );
};

const ListsContainer = styled.div`
  margin-top: 26px;
  width: 100%;
  height: 100%;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 56px;
  width: 100%;
  position: relative;
`;

const PaginationWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const WriteButton = styled.button`
  width: 80px;
  height: 40px;
  background-color: #9819c3;
  color: white;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-left: auto;

  &:hover {
    background-color: #b327d1;
  }

  &:active {
    background-color: #6e0f88;
  }
`;

export default CommunityLists;
