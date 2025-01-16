import React from 'react';
import styled from 'styled-components';
import Review from './Review';
import dummyReview from '../../../store/reservation/dummyReview';

const ReviewTab = () => {
  const data = dummyReview;

  return (
    <Container>
      {data.map((review, index) => (
        <Review key={index} review={review} />
      ))}
    </Container>
  );
};

export default ReviewTab;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 39px 0;
`;
