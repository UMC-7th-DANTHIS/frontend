import React from 'react';
import { ReactComponent as StarFilled } from "../../../../assets/shape/filledYellowStar.svg";
import { ReactComponent as StarNonfilled } from '../../../../assets/shape/nonfilledYellowStar.svg';
import styled from 'styled-components';

const StarRating = ({ starStates, toggleStar }) => (
  <RatingSection>
    <RatingTitle>별점 평가</RatingTitle>
    <Stars>
      {starStates.map((isFilled, index) => (
        <Star key={index} onClick={() => toggleStar(index)}>
          {isFilled ? (
            <StarFilled width={50} height={50} />
          ) : (
            <StarNonfilled width={50} height={50} />
          )}
        </Star>
      ))}
    </Stars>
  </RatingSection>
);

export default StarRating;

const RatingSection = styled.div`
    margin-top: 50px;
`;

const RatingTitle = styled.p`
    font-size: 24px;
    font-weight: 600;
    color: #fff;
    margin-bottom: 21px;
    margin-left: 40px;
`;

const Stars = styled.div`
    display: flex;
    align-items: center;
    margin-left: 166px;
    gap: 20px;
`;

const Star = styled.span`
    cursor: pointer;
`;
