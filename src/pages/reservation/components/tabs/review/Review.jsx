import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as StarFilled } from '../../../../../assets/shape/filledYellowStar.svg';
import { ReactComponent as StarNonfilled } from '../../../../../assets/shape/nonfilledYellowStar.svg';
import { ReactComponent as GotoIcon } from '../../../../../assets/shape/gotoicon.svg';
import { formatDate } from '../../../formatDate';

const Review = ({ review, classId, page }) => {
  const navigate = useNavigate();
  const totalStars = 5;

  const handleDetailClick = () => {
    navigate(`/classreservation/review/${review.id}`, {
      state: { fromReviewTab: true, classId, page } // 페이지네이션 정보 전달
    });
  };

  return (
    <Container>
      <InfoWrapper>
        <ProfileImage />
        <Data>
          <Name>{review.author}</Name>
          <Title>{review.title}</Title>
          <RatingAndDate>
            <Stars>
              {Array.from({ length: totalStars }, (_, index) => (
                <Star key={index}>
                  {index < review.rating ? (
                    <StarFilled width="24px" height="24px" />
                  ) : (
                    <StarNonfilled width="24px" height="24px" />
                  )}
                </Star>
              ))}
            </Stars>
            <Date>{formatDate(review.createdAt)}</Date>
          </RatingAndDate>
        </Data>
      </InfoWrapper>
      <ViewDetailButton onClick={handleDetailClick}>
        <ViewDetail>자세히 보기</ViewDetail>
        <GotoIcon />
      </ViewDetailButton>

      <Detail>
        {review.content?.length > 680
          ? `${review.content.slice(0, 680)} ...`
          : review.content}
      </Detail>
      {review.reviewImages && (
        <Images>
          {review.reviewImages.map((image, index) => (
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
const ViewDetailButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 7px;
  margin: 0 38px 18px auto;
  background: transparent;
  border: none;
  transition: all 0.3s ease;

  &:hover {
    cursor: pointer;
    transform: translateY(-1px);
  }
`;
const ViewDetail = styled.span`
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
  overflow: hidden;
  background: url(<path-to-image>) lightgray 50% / cover no-repeat;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover; // 비율 유지
  }
`;
