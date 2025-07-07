import { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Review } from './Review';
import useFetchData from '../../../../hooks/useFetchData';
import { ClassReviewList } from '../../../../types/review';
import Pagination from '../../../../components/Pagination';

interface ReviewTabProps {
  tabRef: React.RefObject<HTMLDivElement | null>;
}

export const ReviewTab = ({ tabRef }: ReviewTabProps) => {
  const location = useLocation();
  const { classId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const perData = 5; // 페이지 당 보여질 요소 개수
  const { data, fetchData } = useFetchData<ClassReviewList>();

  const { fromReviewDetail, page } = location.state || {}; // 이동했던 페이지로부터 이전 페이지네이션 정보를 전달 받음
  if (tabRef.current) {
    tabRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const fetchReviews = useCallback(
    async (page: number) => {
      await fetchData(`/dance-classes/${classId}/reviews?page=${page}`);
    },
    [classId, fetchData]
  );

  useEffect(() => {
    fetchReviews(currentPage);
  }, [currentPage, fetchReviews]);

  // 이동했던 페이지로부터 이전 페이지네이션 정보를 받았을 경우
  // currentPage를 해당 페이지(이전 페이지)로 설정
  useEffect(() => {
    if (fromReviewDetail && page) {
      setCurrentPage(page);
      fetchReviews(currentPage);
    }
  }, [fromReviewDetail, page, currentPage, fetchReviews]);

  return (
    <Container>
      {Array.isArray(data?.classReviews) && data?.classReviews.length === 0 ? (
        <Notice>등록된 리뷰가 없습니다.</Notice>
      ) : (
        <>
          {data?.classReviews.map((review, index) => (
            <Review key={index} review={review} classId={data?.id} page={data?.pagination.currentPage} />
          ))}
          {data?.pagination && (
            <Pagination
              dataLength={data?.pagination.totalReviews}
              perData={perData}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </>
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
