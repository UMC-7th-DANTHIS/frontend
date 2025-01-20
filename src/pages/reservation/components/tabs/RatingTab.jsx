import React from 'react';
import styled from 'styled-components';
import { ReactComponent as StarFilled } from '../../../../assets/start_fill.svg';
import { ReactComponent as StarNonfilled } from '../../../../assets/star_nonfill.svg';

const Rating = ({ data }) => {
  const totalStars = 5;
  return (
    <Container>
      <Stars>
        {Array.from({ length: totalStars }, (_, index) => (
          <Star key={index}>
            {index < data.rate ? (
              <StarFilled width="120px" height="120px" />
            ) : (
              <StarNonfilled width="120px" height="120px" />
            )}
          </Star>
        ))}
      </Stars>
      <RatingNumber>{data.rate.toFixed(1)}</RatingNumber>
      <Notice>
        이 수업을 수강하셨나요? 직접 이 수업에 대한 만족도를 평가해보세요!
      </Notice>
      <GotoReview>후기 작성하러 가기</GotoReview>
    </Container>
  );
};

export default Rating;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px;
`;
const Stars = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 15px;
`;
const Star = styled.div`
  margin: 0 15px;
`;
const RatingNumber = styled.div`
  margin: 80px 0;
  color: var(--main_white, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 80px;
  font-style: normal;
  font-weight: 600;
  line-height: 50px; /* 62.5% */
  letter-spacing: -4px;
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
const GotoReview = styled.button`
  width: 360px;
  height: 52px;
  margin: 37px;
  border-radius: 4px;
  border: 4px solid var(--main_purple, #9819c3);
  box-shadow: 0px 0px 4px 0px #b30505;
  background: transparent;
  color: var(--main_white, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  &:hover {
    cursor: pointer;
  }
`;
