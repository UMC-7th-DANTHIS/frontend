import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Review from './Review';
import Pagination from '../../../../../components/Pagination';
import api from '../../../../../api/api';

const ReviewTab = () => {
  const location = useLocation();
  const [reviews, setReviews] = useState([]);
  const { classId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const perData = 5; // 페이지 당 보여질 요소 개수

  const { fromReviewDetail, page } = location.state || {}; // 이동했던 페이지로부터 이전 페이지네이션 정보를 전달 받음

  const fetchReviews = async (page) => {
    try {
      const response = await api.get(
        `/dance-classes/${classId}/reviews?page=${page}`
      );

      setReviews(response.data.data);
    } catch (error) {
      console.error('❌ 리뷰 정보를 불러오는 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    fetchReviews(currentPage);
  }, [classId, currentPage]);

  // 이동했던 페이지로부터 이전 페이지네이션 정보를 받았을 경우
  // currentPage를 해당 페이지(이전 페이지)로 설정
  useEffect(() => {
    if (fromReviewDetail && page) {
      setCurrentPage(page);
      fetchReviews(page);
    }
  }, [fromReviewDetail, page]);

  return (
    <Container>
      {reviews.classReviews?.map((review, index) => (
        <Review
          key={index}
          review={review}
          page={reviews.pagination?.currentPage}
        />
      ))}
      <Pagination
        dataLength={reviews.pagination?.totalReviews}
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
