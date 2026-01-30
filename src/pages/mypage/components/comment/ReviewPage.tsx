import { useState } from 'react';
import styled from 'styled-components';
import Pagination from '../../../../components/Pagination';
import CommentsReview from './CommentsReview';
import { useQuery } from '@tanstack/react-query';
import api from '../../../../api/api';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import { FetchReviewsResponse } from '@/types/mypage/CommentPostType';

interface ReviewPageProps {
  perPage: number;
}

const fetchUserReviews = async (
  currentPage: number,
  perData: number
): Promise<FetchReviewsResponse> => {
  const token = localStorage.getItem('token');
  const response = await api.get('/users/reviews', {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {
      page: currentPage,
      size: perData
    }
  });
  return {
    reviews: response.data.data.reviews || [],
    totalElements: response.data.data.totalElements || 0
  };
};

const ReviewPage = ({ perPage }: ReviewPageProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, isLoading, isError, error } = useQuery<
    FetchReviewsResponse,
    Error
  >({
    queryKey: ['userreviews', currentPage, perPage],
    queryFn: () => fetchUserReviews(currentPage, perPage)
  });

  if (isLoading) {
    return (
      <LoadingContainer>
        <LoadingSpinner isLoading={isLoading} />
      </LoadingContainer>
    );
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  const hasNoData = !data || data.reviews.length === 0;

  return (
    <Container>
      {hasNoData ? (
        <EmptyText>댓글이 없습니다.</EmptyText>
      ) : (
        <>
          {data.reviews.map((review) => (
            <CommentsReview key={review.reviewId} review={review} />
          ))}
          <Pagination
            dataLength={data.totalElements || 0}
            perData={perPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </Container>
  );
};

export default ReviewPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 182px;

  @media (max-width: 600px) {
    justify-content: center;
    margin-bottom: 120px;
    width: 100%;
  }
`;

const LoadingContainer = styled.div`
  margin-left: 450px;

  @media (max-width: 600px) {
    margin: 0 auto;
  }
`;

const EmptyText = styled.div`
  color: #b2b2b2;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  margin-top: 100px;

  @media (max-width: 600px) {
    font-size: 15px;
    margin-top: 60px;
  }
`;
