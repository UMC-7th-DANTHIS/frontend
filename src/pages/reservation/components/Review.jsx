import React from 'react';
import styled from 'styled-components';
import { ReactComponent as StarFilled } from '../../../assets/shape/filledYellowStar.svg';
import { ReactComponent as StarNonfilled } from '../../../assets/shape/nonfilledYellowStar.svg';

const Review = ({ review }) => {
  const totalStars = 5;

  return (
    <Container>
      <InfoContainer>
        <Image />
        <Data>
          <Name>{review.name}</Name>
          <Title>{review.title}</Title>
          <RatingAndDate>
            <Stars>
              {Array.from({ length: totalStars }, (_, index) => (
                <Star key={index}>
                  {index < review.rate ? <StarFilled /> : <StarNonfilled />}
                </Star>
              ))}
            </Stars>
            <Date>{review.date}</Date>
          </RatingAndDate>
        </Data>
      </InfoContainer>
      <Detail>{review.detail}</Detail>
    </Container>
  );
};

export default Review;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 1240px;
  margin-bottom: 39px;
  border-radius: 15px;
  border: 1px solid var(--sub_light-gray, #ddd);
  box-shadow: 0px 0px 5px 2px var(--main_purple, #9819c3);
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px;
`;
const Detail = styled.div`
  margin: 0 20px 22px 20px;
  color: var(--main_white, #fff);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const Data = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
`;
const Image = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 4px;
  background: url(<path-to-image>) lightgray 50% / cover no-repeat;
`;
const Name = styled.div`
  color: var(--main_white, #fff);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 125% */
  letter-spacing: -0.8px;
`;
const Title = styled.div`
  color: var(--main_white, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 50px; /* 250% */
  letter-spacing: -1px;
`;
const RatingAndDate = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Stars = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 15px;
`;
const Star = styled.div`
  margin-right: 3px;
`;
const Date = styled.div`
  color: var(--text_secondary-gray, #b2b2b2);
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 166.667% */
  letter-spacing: -0.6px;
`;
