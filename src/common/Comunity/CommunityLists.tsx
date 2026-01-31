import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import styled from 'styled-components';

import Pagination from '../../components/Pagination';
import CommunityList from './CommunityList';

import { CommunityPostListOutlet } from '@/types/Context/CommunityPostList';
import { PostPreview } from '@/types/CommunityInterface';
import useGet from '../../hooks/useGet';

const CommunityLists = () => {
  const navigate = useNavigate();

  const { lists, perData, currentPage, setCurrentPage } =
    useOutletContext<CommunityPostListOutlet>();

  const { data: user } = useGet();

  const handleEdit = () => {
    if (!user) return navigate('/login');
    return navigate('edit');
  };

  return (
    <ListsContainer>
      {lists?.posts.map((list: PostPreview) => <CommunityList list={list} />)}
      <PaginationContainer>
        <Spacer />

        <PaginationWrapper>
          <Pagination
            dataLength={lists?.totalPosts!}
            perData={perData}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </PaginationWrapper>

        <WriteButton onClick={() => handleEdit()}>글쓰기</WriteButton>
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
  ${({ theme }) => theme.media.mobile} {
    position: absolute;
    left: 50%;

    justify-content: start;
    align-items: center;
    transform: translateX(-50%);
  }
`;

const Spacer = styled.div`
  display: block;
  width: 64px;
  height: 36px;

  ${({ theme }) => theme.media.mobile} {
    display: hidden;
  }
`;

const WriteButton = styled.button`
  display: flex;

  justify-content: center;
  align-items: center;

  width: 64px;
  height: 36px;
  background-color: #9819c3;
  color: white;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-left: auto;

  ${({ theme }) => theme.media.tablet} {
    width: 80px;
    height: 40px;
    font-size: 16px;
  }

  &:hover {
    background-color: #b327d1;
  }

  &:active {
    background-color: #6e0f88;
  }
`;

export default CommunityLists;
