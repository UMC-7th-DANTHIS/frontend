import React, { useState } from 'react';
import styled from 'styled-components';

import Pagination from '../Pagination';
import SearchNothing from './SearchNothing';
import useSearch from '../../hooks/useSearch';

import { ReactComponent as StarFilled } from '../../assets/buttons/starlevel_filled.svg';
import { ReactComponent as StarNonfilled } from '../../assets/buttons/starlevel_nonfilled.svg';

const SearchClass = ({ query, select }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const perData = 5;
  const { data, isLoading } = useSearch(select, query, currentPage);

  return (
    <Container>
      {!isLoading && data?.data.results.length > 0 ? (
        <>
          <ClassLists>
            {data?.data.results.map((list) => (
              <ClassList>
                <ImgContainer src={list.classImage[0]} alt="프로필 이미지" />
                <TextContainer>
                  <TextContent>{list.className}</TextContent>
                  <TextContent>수업 강사 : {list.dancer}</TextContent>
                  <TextContent>장르 : {list.genre}</TextContent>
                  <TextContent>
                    가격 : {list.pricePerSession} / 회당
                  </TextContent>
                  <StarsContainer>
                    <TextContent>난이도 : </TextContent>
                    {Array.from({ length: 5 }, (_, index) => {
                      const isFilled = index < list.difficulty;

                      return (
                        <StarBtn key={index}>
                          {isFilled ? <StarFilled /> : <StarNonfilled />}
                        </StarBtn>
                      );
                    })}
                  </StarsContainer>
                </TextContainer>
              </ClassList>
            ))}
          </ClassLists>
          <PaginationContainer>
            <Pagination
              dataLength={data?.data.pagination.totalResults}
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

const Container = styled.div`
  background-color: black;
`;

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
  margin-top: 7px;
  margin-bottom: 12px;

  color: white;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 40px;
`;

const TextContent = styled.div`
  margin-right: 5px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 91px;
`;

const StarsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 588px;
`;

const StarBtn = styled.div`
  margin-top: 3px;
`;

export default SearchClass;
