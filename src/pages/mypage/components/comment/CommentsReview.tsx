import styled from 'styled-components';
import { ReactComponent as StarFilled } from '../../../../assets/shape/filledYellowStar.svg';
import { ReactComponent as StarNonfilled } from '../../../../assets/shape/nonfilledYellowStar.svg';
import { ReactComponent as ExistPhoto } from '../../../../assets/photo.svg';
import { useNavigate } from 'react-router-dom';
import { CommentsReviewProps } from '@/types/mypage/CommentPostType';

const CommentsReview = ({ review }: CommentsReviewProps) => {
  const totalStars = 5;
  const navigate = useNavigate();

  const CuttingDetail = (content: string): string => {
    return content.length > 210 ? content.slice(0, 210) + '...' : content;
  };

  const formatDate = (dateString: string): string => {
    return dateString.split('T')[0].replace(/-/g, '.');
  };


  return (
    <Container>
      <ReviewWrapper
        key={review.reviewId}
        onClick={() => navigate(`/classes/reviews/${review.reviewId}`)}
      >
        <InfoWrapper>
          <Data>
            <TitleandPhoto>
              <Title>{review.title}</Title>
              {(review.images?.filter((image) => image !== null) || []).length >
                0 && <ExistPhoto width={16} height={16} />}
            </TitleandPhoto>

            <RatingAndDate>
              <Stars>
                {Array.from({ length: totalStars }, (_, index) => (
                  <Star key={index}>
                    {index < review.rating ? (
                      <StarFilled width={24} height={24} />
                    ) : (
                      <StarNonfilled width={24} height={24} />
                    )}
                  </Star>
                ))}
              </Stars>
              <Date>{formatDate(review.createdAt)}</Date>
            </RatingAndDate>
            <Detail>{CuttingDetail(review.content)}</Detail>
          </Data>
        </InfoWrapper>

      </ReviewWrapper>
    </Container>
  );
};

export default CommentsReview;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;


  @media (max-width: 600px) {
    width: 100%;
    margin-left: 0;
  }
`;

const ReviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border: 1px solid #ddd;
  margin-bottom: 50px;
  cursor: pointer;

  @media (max-width: 600px) {
    height: auto;
    margin-bottom: 24px;
    padding: 18px 22px 18px 22px;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Data = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 30px;

  @media (max-width: 600px) {
  padding: 0;
  }
`;

const TitleandPhoto = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;

  @media (max-width: 600px) {
    gap: 5px;
  }
`;

const Title = styled.div`
  color: #fff;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 14px;
  letter-spacing: -1px;

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const RatingAndDate = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  @media (max-width: 600px) {
    margin-top: 4px;
  }
`;

const Stars = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 600px) {
    margin-right: 6px;

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

const Star = styled.div`
  margin-right: 6px;
`;

const Date = styled.div`
  color: #b2b2b2;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: -0.6px;
  margin-left: 10px;

  @media (max-width: 600px) {
    font-size: 11px;
  }
`;

const Detail = styled.div`
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  margin-top: 14px;

  @media (max-width: 600px) {
    font-size: 14px;
    margin: 12px 0 0 0;
  }
`;
