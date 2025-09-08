import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReviewProps } from './Review';
import { ReactComponent as StarFilled } from '../../../../assets/shape/filledYellowStar.svg';
import { ReactComponent as StarNonfilled } from '../../../../assets/shape/nonfilledYellowStar.svg';
import { ReactComponent as GotoIcon } from '../../../../assets/shape/gotoicon.svg';
import defaultProfile from '../../../../assets/profile.svg';
import formatDate from '../../../../api/formatDate';

export const ReviewDesktop = ({ review, classId, page }: ReviewProps) => {
  const navigate = useNavigate();
  const STAR_LENGTH = 5;

  const handleDetailClick = () => {
    navigate(`/classes/reviews/${review.id}`, {
      state: { fromReviewTab: true, classId, page } // 페이지네이션 정보 전달
    });
  };

  return (
    <Container>
      <MetaWrapper>
        <img src={review.authorProfileImage ?? defaultProfile} alt={`${review.author}의 프로필`} />
        <Meta>
          <AuthorName>{review.author}</AuthorName>
          <Title>{review.title}</Title>
          <RatingAndDate>
            <Stars>
              {Array.from({ length: STAR_LENGTH }, (_, index) => (
                <span key={index}>
                  {index < review.rating ? (
                    <StarFilled width={24} height={24} />
                  ) : (
                    <StarNonfilled width={24} height={24} />
                  )}
                </span>
              ))}
            </Stars>
            <p id="created-date">{formatDate(review.createdAt, 4)}</p>
          </RatingAndDate>
        </Meta>
        <ViewDetailButton onClick={handleDetailClick}>
          <span>자세히 보기</span>
          <GotoIcon />
        </ViewDetailButton>
      </MetaWrapper>

      <Detail>{review.content?.length > 680 ? `${review.content.slice(0, 680)} ...` : review.content}</Detail>
      {review.reviewImages.length > 0 && (
        <Images>
          {review.reviewImages.map((image, index) => (
            <Image key={index}>{image && <img src={image} alt={`review #${index}`} />}</Image>
          ))}
        </Images>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: none;

  ${({ theme }) => theme.media.tablet} {
    display: flex;
    flex-direction: column;
    padding: 30px;
    margin: 0 16px;
    gap: 20px;
    border-radius: 15px;
    border: 1px solid var(--sub-light-gray);
    box-shadow: 0px 0px 5px 2px var(--main-purple);
  }

  ${({ theme }) => theme.media.desktop} {
    margin: 0;
  }
`;
const MetaWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 18px;

  img {
    width: 120px;
    height: 120px;
    border-radius: 4px;
    background: url(<path-to-image>) lightgray 50% / cover no-repeat;
    object-fit: cover;
  }
`;
const Meta = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 5px;
`;
const AuthorName = styled.p`
  margin: 0;
  color: var(--text-secondary-gray);
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: -0.8px;
`;
const Title = styled.div`
  color: var(--main-white);
  font-size: 18px;
  font-weight: 600;
  line-height: 50px;
  letter-spacing: -0.9px;
`;
const RatingAndDate = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  #created-date {
    margin: 0;
    color: var(--text-secondary-gray);
    font-size: 12px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: -0.6px;
  }
`;
const Stars = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  margin-right: 15px;
`;
const ViewDetailButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: end;
  gap: 7px;
  margin: 0 0 18px auto;
  background: transparent;
  border: none;
  cursor: pointer;

  span {
    color: var(--highlight-blue, #07f);
    font-size: 12px;
    font-weight: 500;
  }
`;
const Detail = styled.div`
  color: var(--main-white);
  font-size: 14px;
  font-weight: 400;
`;
const Images = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 160px);
  gap: 38px;
  margin-top: 24px;
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
    object-fit: cover;
  }
`;
