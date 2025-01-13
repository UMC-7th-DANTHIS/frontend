import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import SearchBar from '../components/Search/SearchBar';
import SearchClass from '../components/Search/SearchClass';
import SearchDancer from '../components/Search/SearchDancer';
import SearchCommunity from '../components/Search/SearchCommunity';

const SearchPage = () => {
  const [select, setSelect] = useState('class');
  const [pagenum, setPagenum] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleCategoryClick = (category) => setSelect(category);
  const handlePageClick = (page) => setCurrentPage(page);

  useEffect(() => {
    setPagenum(10);
  });

  return (
    <Container>
      <SearchBar select={select} handleCategoryClick={handleCategoryClick} />
      <ContentContainer>
        {select === 'class' && <SearchClass />}
        {select === 'dancer' && <SearchDancer />}
        {select === 'community' && <SearchCommunity />}
        <PageContainer>
          <PageCursor
            onClick={() => handlePageClick(Math.max(1, currentPage - 1))}
          >
            {'<'}
          </PageCursor>
          {Array.from({ length: pagenum }, (_, i) => i + 1).map((page) => (
            <PageNumber
              key={page}
              className={page === currentPage ? 'active' : ''}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </PageNumber>
          ))}
          <PageCursor
            onClick={() => handlePageClick(Math.min(pagenum, currentPage + 1))}
          >
            {'>'}
          </PageCursor>
        </PageContainer>
      </ContentContainer>
    </Container>
  );
};

const Container = styled.div`
  background-color: black;
  padding-bottom: 100px;
`;

const ContentContainer = styled.div`
  margin-left: 120px;
  margin-right: 120px;
`;

const PageContainer = styled.div`
  display: flex;

  text-align: center;
  justify-content: center;
  align-items: center;
  margin-top: 56px;
`;

const PageCursor = styled.div`
  display: inline-block;
  font-size: 20px;
  font-weight: bold;
  color: #9819c3;
  cursor: pointer;
  margin: 0 20px;
`;

const PageNumber = styled.div`
  display: inline-block;
  font-size: 18px;
  color: white;
  margin: 5px;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
  border-radius: 50%;

  &:hover {
    color: #9819c3;
  }

  &.active {
    background-color: #9819c3;
    color: white;
  }
`;

export default SearchPage;
