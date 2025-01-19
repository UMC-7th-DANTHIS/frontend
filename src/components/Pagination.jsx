import React, { useState } from 'react';
import styled from 'styled-components';

const Pagination = ({ dataLength, perData, currentPage, setCurrentPage }) => {
  const [layer, setLayer] = useState(0);

  const handlePageClick = (page) => setCurrentPage(page);

  const handlePageDown = (num) => {
    setLayer(layer - 1);
    handlePageClick(num);
  };

  const handlePageUp = (num) => {
    setLayer(layer + 1);
    handlePageClick(num);
  };

  return (
    <PageContainer>
      <PageCursor
        onClick={() => handlePageDown((layer - 1) * 10 + 1)}
        className={layer === 0 ? 'inactive' : ''}
      >
        {'<'}
      </PageCursor>
      {Array.from(
        {
          length:
            dataLength - layer * 10 >= 10 ? 10 : (dataLength - layer * 10) % 10
        },
        (_, i) => layer * 10 + i + 1
      ).map((page) => (
        <PageNumber
          key={page}
          className={page === currentPage ? 'active' : ''}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </PageNumber>
      ))}
      <PageCursor
        onClick={() => handlePageUp((layer + 1) * 10 + 1)}
        className={layer === Math.floor(dataLength / perData) ? 'inactive' : ''}
      >
        {'>'}
      </PageCursor>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: inline-block;
  width: 514px;
  margin-left: 250px;
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

  &.inactive {
    color: #4d4d4d;
    pointer-events: none;
  }
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

export default Pagination;
