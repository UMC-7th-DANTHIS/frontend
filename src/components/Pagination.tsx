import { useEffect, useState } from 'react';
import styled from 'styled-components';

import useIsMobile from '../hooks/useIsMobile';

// Pagination 컴포넌트 사용법
// dataLength: page를 나타내고 싶은 데이터들의 length 를 넣어주시면 됩니다 => ex. data.length
// perData: 한 페이지에 몇 개의 데이터가 보여질 것인지를 넣어주시면 됩니다 => ex. 5
// 그리고 pagination을 참조하려는 페이지에서
// const [currentPage, setCurrentPage] = useState(1);
// 이걸 처음에 선언해주시고 해당 페이지를 누르거나 넘기면 해당 번호로 설정되게끔 짜놨으니 그걸로 데이터 slice 해서 사용하면 될 것 같습니다.
// 제가 실제로 적용까지 이어서 하려고 했는데 CSS는 다 각기 다른 방식으로 작업하셔서 잘 모르겠습니다 ㅜㅜ
// 그쪽 부분만 진행해주셨으면 좋겠습니다 ㅎ.ㅎ

type PaginationProps = {
  dataLength: number;
  perData: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination = ({
  dataLength,
  perData,
  currentPage,
  setCurrentPage
}: PaginationProps) => {
  const isMobile = useIsMobile();
  const limit = isMobile ? 5 : 10;

  const totalPages = Math.ceil(dataLength / perData) || 1;
  const [layer, setLayer] = useState(0);

  useEffect(() => {
    setLayer(Math.floor((currentPage - 1) / limit));
  }, [currentPage, limit]);

  const handlePageClick = (page: number) => setCurrentPage(page);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const startPage = layer * limit + 1;
  const currentLayerRange = Math.min(limit, totalPages - startPage + 1);

  return (
    <PageContainer>
      <PageCursor
        onClick={handlePrev}
        className={currentPage === 1 ? 'inactive' : ''}
      >
        {'<'}
      </PageCursor>

      {Array.from({ length: currentLayerRange }, (_, i) => startPage + i).map(
        (page) => (
          <PageNumber
            key={page}
            className={page === currentPage ? 'active' : ''}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </PageNumber>
        )
      )}

      <PageCursor
        onClick={handleNext}
        className={currentPage === totalPages ? 'inactive' : ''}
      >
        {'>'}
      </PageCursor>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: inline-block;
  text-align: center;
  justify-content: center;
  align-items: center;

  min-width: 0;
  flex: 1 1 auto;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PageCursor = styled.div`
  display: inline-block;
  font-size: 12px;
  ${({ theme }) => theme.media.tablet} {
    font-size: 20px;
  }

  padding: 0 1rem;
  font-weight: bold;
  color: #9819c3;
  cursor: pointer;

  &.inactive {
    color: #4d4d4d;
    pointer-events: none;
  }
`;

const PageNumber = styled.div`
  display: inline-block;
  font-size: 12px;
  ${({ theme }) => theme.media.tablet} {
    font-size: 16px;
    width: 30px;
    height: 30px;
    line-height: 30px;
  }

  color: white;
  margin: 5px;

  line-height: 13px;
  width: 14px;
  height: 14px;
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
