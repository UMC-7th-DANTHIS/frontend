import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import styled from 'styled-components';

import Pagination from '../../components/Pagination';
import CommunityList from './CommunityList';

const CommunityLists = () => {
  const navigate = useNavigate();

  const { filteredList, currentPage, perData, setCurrentPage, CommunityPost } =
    useOutletContext();

  return (
    <ListsContainer>
      {filteredList?.map((list) => (
        <CommunityList list={list} />
      ))}
      <PaginationContainer>
        <Pagination
          dataLength={CommunityPost.length}
          perData={perData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
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

const WriteButton = styled.button`
  display: inline-block;
  margin-left: 186px;
  width: 80px;
  height: 40px;
  background-color: #9819c3;
  color: white;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #b327d1;
  }

  &:active {
    background-color: #6e0f88;
  }
`;

const PaginationContainer = styled.div`
  margin-top: 56px;
  margin-left: 250px;
`;

export default CommunityLists;
