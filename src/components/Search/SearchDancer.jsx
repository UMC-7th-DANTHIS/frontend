import React, { useState } from 'react';
import styled from 'styled-components';

import dummyDancer from '../../store/search/dummyDancer';
import Pagination from '../Pagination';
import SearchNothing from './SearchNothing';

const SearchDancer = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const perData = 5;

  return (
    <Container>
      {data?.data.results.length > 0 ? (
        <>
          <ClassLists>
            {data?.data.results.map((list) => (
              <ClassList>
                <ImgContainer src={list.profileImage[0]} alt="프로필 이미지" />
                <TextContainer>
                  <TextContent>{list.name}</TextContent>
                  <TextContent>Instagram : {list.instagramId}</TextContent>
                  <TextContent>
                    주 장르 : {list.mainGenres.map((genre) => genre)}
                  </TextContent>
                </TextContainer>
              </ClassList>
            ))}
          </ClassLists>
          <PaginationContainer>
            <Pagination
              dataLength={dummyDancer.length}
              perData={perData}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </PaginationContainer>
        </>
      ) : (
        <SearchNothing />
      )}
    </Container>
  );
};

const Container = styled.div``;

const ClassLists = styled.div`
  border-top: 2px solid #ddd;
  border-bottom: 2px solid #ddd;
`;

const ClassList = styled.div`
  display: flex;
  padding-top: 41px;
  padding-bottom: 41px;
  padding-left: 43px;

  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }
`;

const ImgContainer = styled.img`
  border-radius: 10px;

  width: 210px;
  height: 210px;
`;

const TextContainer = styled.div`
  flex-direction: column;
  margin-left: 38px;
  margin-top: 41px;
  margin-bottom: 12px;

  color: white;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 40px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 91px;
`;

const TextContent = styled.div``;

export default SearchDancer;
