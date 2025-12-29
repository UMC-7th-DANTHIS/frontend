import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Review } from './Review';
import Pagination from '../../../../components/Pagination';
import useGetReviews from '../../../../hooks/reservation/review/useGetReviews';

export const ReviewTab = () => {
  const location = useLocation();
  const { classId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const perData = 5;
  const { data } = useGetReviews(classId ?? '', { page: currentPage });

  const { fromReviewDetail, page } = location.state || {}; // 이동했던 페이지로부터 이전 페이지네이션 정보를 전달 받음

  // 이동했던 페이지로부터 이전 페이지네이션 정보를 받았을 경우
  // currentPage를 해당 페이지(이전 페이지)로 설정
  useEffect(() => {
    if (fromReviewDetail && page) {
      setCurrentPage(page);
    }
  }, [fromReviewDetail, page]);

  return (
    <Container>
      {Array.isArray(data?.classReviews) && data?.classReviews.length === 0 ? (
        <Notice>등록된 리뷰가 없습니다.</Notice>
      ) : (
        <Contents>
          {data?.classReviews.map((review, index) => (
            <Review
              key={index}
              review={review}
              classId={data?.id}
              page={data?.pagination.currentPage}
            />
          ))}
          {data?.pagination && (
            <Pagination
              dataLength={data?.pagination.totalReviews}
              perData={perData}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </Contents>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 39px 0;
  min-height: 350px;
`;
const Notice = styled.div`
  color: var(--main_white, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const Contents = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 38px;

  ${({ theme }) => theme.media.tablet} {
    gap: 50px;
  }
`;
