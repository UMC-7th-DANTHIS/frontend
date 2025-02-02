import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import dummyReviews from '../../../../store/reservation/dummyReviews';
import Pagination from '../../../../components/Pagination';
import CommentsReview from './CommentsReview';

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const perData = 5;

  useEffect(() => {
    setReviews(dummyReviews);
  }, []);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * perData;
    const endIndex = startIndex + perData;
    return reviews.slice(startIndex, endIndex);
  };

  return (
    <Container>
      {getCurrentPageData().map((review, id) => (
        <CommentsReview key={id} review={review} />
      ))}

      <Pagination
        dataLength={reviews.length}
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
