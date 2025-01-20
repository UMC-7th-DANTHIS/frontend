import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Review from '../Review';
import dummyReviews from '../../../../store/reservation/dummyReviews';
import Pagination from '../Pagination';

const ReviewTab = () => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const perData = 2; // 페이지 당 보여질 요소 개수

  useEffect(() => {
    setReviews(dummyReviews);
  }, []);

  const totalPages = Math.ceil(reviews.length / perData); // 총 페이지 개수

  // 현재 페이지에 보여질 요소 계산
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * perData;
    const endIndex = startIndex + perData;

    return reviews.slice(startIndex, endIndex);
  };

  // 페이지네이션 핸들러
  const handlePageClick = (page) => setCurrentPage(page);

  return (
    <Container>
      {getCurrentPageData().map((review, index) => (
        <Review key={index} review={review} />
      ))}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageClick={handlePageClick}
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
