import React from 'react';
import styled from 'styled-components';

const Pagination = ({ currentPage, totalPages, handlePageClick }) => {
  return (
    <Container>
      <PageCursor onClick={() => handlePageClick(Math.max(1, currentPage - 1))}>
        {'<'}
      </PageCursor>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <PageNumber
          key={page}
          className={page === currentPage ? 'active' : ''}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </PageNumber>
      ))}
      <PageCursor
        onClick={() => handlePageClick(Math.min(totalPages, currentPage + 1))}
      >
        {'>'}
      </PageCursor>
    </Container>
  );
};

export default Pagination;

const Container = styled.div``;
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
