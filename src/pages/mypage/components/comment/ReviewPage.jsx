import React, { useState } from 'react';
import styled from 'styled-components';
import Pagination from '../../../../components/Pagination';
import CommentsReview from './CommentsReview';
import { useQuery } from '@tanstack/react-query';
import api from '../../../../api/api';
import LoadingSpinner from '../../../../components/LoadingSpinner';

const fetchUserReviews = async (currentPage, perData) => {
  const token = localStorage.getItem('token');
  const response = await api.get('/users/reviews', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page: currentPage,
      size: perData
    }
  });
  console.log(response.data);
  return {
    reviews: response.data.data.reviews || [],
    totalElements: response.data.data.totalElements || 0,
  };
};

const ReviewPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const perData = 5;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['userreviews', currentPage, perData],
    queryFn: () => fetchUserReviews(currentPage, perData),
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

  return (
    <Container>
      {data.reviews.map((review, id) => (
        <CommentsReview key={id} review={review} />
      ))}

      <Pagination
        dataLength={data.totalElements}
        perData={perData}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
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
`;

const LoadingContainer = styled.div`
  margin-left: 450px;
`
