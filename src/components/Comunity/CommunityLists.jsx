import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import styled from 'styled-components';

import Pagination from '../../components/Pagination';
import CommunityList from './CommunityList';
import useFetchList from '../../hooks/useFetchList';

const CommunityLists = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useFetchList();
  console.log(data);

  const { filteredList, currentPage, perData, setCurrentPage, CommunityPost } =
    useOutletContext();

  return (
    <ListsContainer>
      {data?.data.posts.map((list) => (
        <CommunityList list={list} />
      ))}
      <PaginationContainer>
        <PaginationWrapper>
          <Pagination
            dataLength={CommunityPost.length}
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
