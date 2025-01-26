import React from 'react';
import styled from 'styled-components';
import { ReactComponent as StarFilled } from '../../../../assets/shape/filledYellowStar.svg';
import { ReactComponent as StarNonfilled } from '../../../../assets/shape/nonfilledYellowStar.svg';
import { ReactComponent as StarHalf } from '../../../../assets/shape/circle.svg';

const Rating = ({ data }) => {
  const totalStars = 5;

  const getRatingStars = (rate) => {
    const fullStars = Math.floor(rate); // 채워진 별 개수
    const hasHalfStar = rate % 1 !== 0; // 반 개짜리 별 필요 여부
    const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0); // 빈 별 개수

    return [
      ...Array(fullStars).fill(<StarFilled width="120px" height="120px" />),
      ...(hasHalfStar ? [<StarHalf width="120px" height="120px" />] : []),
      ...Array(emptyStars).fill(<StarNonfilled width="120px" height="120px" />)
    ];
  };

  return (
    <Container>
      <Stars>
        {getRatingStars(data.rate).map((star, index) => (
          <Star key={index}>{star}</Star>
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
