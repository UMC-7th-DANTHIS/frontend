import React from 'react';
import styled from 'styled-components';
import { ReactComponent as StarFilled } from '../../../../assets/shape/filledYellowStar.svg';
import { ReactComponent as StarNonfilled } from '../../../../assets/shape/nonfilledYellowStar.svg';
import { ReactComponent as ExistPhoto } from '../../../../assets/photo.svg';

const CommentsReview = ({ review }) => {
  const totalStars = 5;

  const formatDate = (date) => {
    if (typeof date === 'string') {
      date = new Date(date);
    }

    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date);
  };

  const CuttingDetail = (detail) => {
    return detail.length > 210 ? detail.slice(0, 210) + '...' : detail;
  }

  return (
    <Container>
      <ReviewWrapper key={review.id}>
        <InfoWrapper>
          <Data>
            <TitleandPhoto>
              <Title>{review.title}</Title>
              {review.images && review.images.filter(image => image !== null).length > 0 && (
                <ExistPhoto width={16} height={16} />
              )}
            </TitleandPhoto>

            <RatingAndDate>
              <Stars>
                {Array.from({ length: totalStars }, (_, index) => (
                  <Star key={index}>
                    {index < review.rate ? <StarFilled width={24} height={24} /> : <StarNonfilled width={24} height={24} />}
                  </Star>
                ))}
              </Stars>
              <Date>{formatDate(review.date)}</Date>
            </RatingAndDate>
          </Data>
        </InfoWrapper>

        <Detail>
          {CuttingDetail(review.detail)}
        </Detail>
      </ReviewWrapper>
    </Container>
  );
};

export default CommentsReview;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 970px;
  margin-left: 27px;
`;

const ReviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;
  border-radius: 10px;
  border: 1px solid #ddd;
  box-shadow: 0px 0px 5px 2px #9819c3;
  margin-bottom: 50px;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Data = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 50px;
  margin-top: 15px;
`;

const TitleandPhoto = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`

const Title = styled.div`
  color: #fff;
  text-align: center;
  font-size: 22px;
  font-weight: 600;
  line-height: 50px;
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
  margin-right: 10px;
`;

const Star = styled.div`
  margin-right: 6px;
`;

const Date = styled.div`
  color: #B2B2B2;
  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.6px;
`;

const Detail = styled.div`
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  margin-left: 50px;
  margin-top: 20px;
  margin-right: 46px;
  margin-bottom: 30px;
`;
