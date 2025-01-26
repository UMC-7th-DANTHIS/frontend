import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Review from '../Review';
import dummyReviews from '../../../../store/reservation/dummyReviews';
import Pagination from '../../../../components/Pagination';

const ReviewTab = () => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const perData = 5; // 페이지 당 보여질 요소 개수

  useEffect(() => {
    setReviews(dummyReviews);
  }, []);

  // 현재 페이지에 보여질 요소 계산
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * perData;
    const endIndex = startIndex + perData;

    return reviews.slice(startIndex, endIndex);
  };

  return (
    <Container>
      {getCurrentPageData().map((review, index) => (
        <Review key={index} review={review} />
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

export default ReviewTab;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 39px 0;
`;
