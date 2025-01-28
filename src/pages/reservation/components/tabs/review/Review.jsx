import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as StarFilled } from '../../../../../assets/shape/filledYellowStar.svg';
import { ReactComponent as StarNonfilled } from '../../../../../assets/shape/nonfilledYellowStar.svg';
import { ReactComponent as GotoIcon } from '../../../../../assets/shape/gotoicon.svg';

const Review = ({ review }) => {
  const totalStars = 5;

  const formatDate = (date) => {
    if (typeof date === 'string') {
      date = new Date(date);
    }

    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(date);
  };

  return (
    <Container>
      <InfoWrapper>
        <ProfileImage />
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
            <Date>{formatDate(review.date)}</Date>
          </RatingAndDate>
        </Data>
      </InfoWrapper>
      <ViewDetailLink>
        <ViewDetail>자세히 보기</ViewDetail>
        <GotoIcon />
      </ViewDetailLink>

      <Detail>
        {review.detail.length > 680
          ? `${review.detail.slice(0, 680)} ...`
          : review.detail}
      </Detail>

      {review.images && (
        <Images>
          {review.images.map((image, index) => (
            <Image key={index}>
              {image && <img src={image} alt={`review #${index}`} />}
            </Image>
          ))}
        </Images>
      )}
    </Container>
  );
};

export default Review;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 1240px;
  padding: 20px 0;
  margin-bottom: 39px;
  border-radius: 15px;
  border: 1px solid var(--sub_light-gray, #ddd);
  box-shadow: 0px 0px 5px 2px var(--main_purple, #9819c3);
`;
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 20px;
`;
const Data = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 10px;
`;
const ProfileImage = styled.img`
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
const ViewDetailLink = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 7px;
  margin: 0 38px 18px auto;
  text-decoration-line: none;

  &:hover {
    cursor: pointer;
  }
`;
const ViewDetail = styled.div`
  color: var(--highlight_blue, #07f);
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
const Detail = styled.div`
  margin: 0 20px;
  color: var(--main_white, #fff);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const Images = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 160px);
  gap: 38px;
  margin: 24px 42px 0 42px;
`;
const Image = styled.div`
  width: 160px;
  height: 160px;
  border-radius: 4px;
  background: url(<path-to-image>) lightgray 50% / cover no-repeat;
`;
