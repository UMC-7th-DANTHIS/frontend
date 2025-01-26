import React, { useState } from 'react';
import styled from 'styled-components';

// Pagination 컴포넌트 사용법
// dataLength: page를 나타내고 싶은 데이터들의 length 를 넣어주시면 됩니다 => ex. data.length
// perData: 한 페이지에 몇 개의 데이터가 보여질 것인지를 넣어주시면 됩니다 => ex. 5
// 그리고 pagination을 참조하려는 페이지에서
// const [currentPage, setCurrentPage] = useState(1);
// 이걸 처음에 선언해주시고 해당 페이지를 누르거나 넘기면 해당 번호로 설정되게끔 짜놨으니 그걸로 데이터 slice 해서 사용하면 될 것 같습니다.
// 제가 실제로 적용까지 이어서 하려고 했는데 CSS는 다 각기 다른 방식으로 작업하셔서 잘 모르겠습니다 ㅜㅜ
// 그쪽 부분만 진행해주셨으면 좋겠습니다 ㅎ.ㅎ

const Pagination = ({ dataLength, perData, currentPage, setCurrentPage }) => {
  const [layer, setLayer] = useState(0);

  const filteredDataLength =
    dataLength <= perData ? 1 : Math.ceil(dataLength / perData);

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
            filteredDataLength - layer * 10 >= 10
              ? 10
              : (filteredDataLength - layer * 10) % 10
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
        className={filteredDataLength <= (layer + 1) * 10 ? 'inactive' : ''}
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
