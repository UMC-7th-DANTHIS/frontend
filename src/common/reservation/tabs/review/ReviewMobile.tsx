import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReviewProps } from './Review';
import { ReactComponent as StarFilled } from '../../../../assets/shape/filledYellowStar.svg';
import { ReactComponent as StarNonfilled } from '../../../../assets/shape/nonfilledYellowStar.svg';
import { ReactComponent as GotoIcon } from '../../../../assets/shape/gotoicon.svg';
import defaultProfile from '../../../../assets/profile.svg';
import formatDate from '../../../../api/formatDate';

export const ReviewMobile = ({ review, classId, page }: ReviewProps) => {
  const navigate = useNavigate();
  const STAR_LENGTH = 5;

  const handleDetailClick = () => {
    navigate(`/classes/reviews/${review.id}`, {
      state: { fromReviewTab: true, classId, page } // 페이지네이션 정보 전달
    });
  };

  return (
    <Container>
      <Wrapper>
        <MetaWrapper>
          <img src={review.authorProfileImage ?? defaultProfile} alt={`${review.author}의 프로필`} />
          <Meta>
            <AuthorAndDate>
              <p id="author-name">{review.author}</p>
              <p id="created-date">{formatDate(review.createdAt, 4)}</p>
            </AuthorAndDate>
            <Title>{review.title}</Title>
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
          </Meta>
        </MetaWrapper>

        <Detail>{review.content?.length > 680 ? `${review.content.slice(0, 680)} ...` : review.content}</Detail>
      </Wrapper>

      <ViewDetailButton onClick={handleDetailClick}>
        <span>자세히 보기</span>
        <GotoIcon />
      </ViewDetailButton>

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
  display: flex;
  flex-direction: column;
  padding: 30px;
  margin: 0 16px;
  border-radius: 5px;
  border: 0.333px solid var(--sub-light-gray);
  box-shadow: 0px 0px 1.6px 0.6px var(--main-purple);

  ${({ theme }) => theme.media.tablet} {
    display: none;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;
const MetaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  img {
    width: 100px;
    height: 100px;
    border-radius: 4px;
    background: url(<path-to-image>) lightgray 50% / cover no-repeat;
    object-fit: cover;
  }
`;
const Meta = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 5px;
  gap: 8px;
`;
const AuthorAndDate = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;

  #author-name {
    margin: 0;
    color: var(--text-secondary-gray);
    font-size: 12px;
    font-weight: 600;
    line-height: 100%;
    letter-spacing: -0.6px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 50px;
  }

  #created-date {
    margin: 0;
    color: var(--text-secondary-gray);
    font-size: 10px;
    font-weight: 300;
    line-height: 6.66px;
    letter-spacing: -0.5px;
  }
`;
const Title = styled.div`
  color: var(--main-white);
  font-size: 12px;
  font-weight: 600;
  line-height: 16.65px;
  letter-spacing: -0.6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
`;
const Stars = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;
const ViewDetailButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: end;
  gap: 7px;
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
  font-size: 12px;
  font-weight: 400;
`;
const Images = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 160px);
  gap: 15px;
  margin-top: 12px;
`;
const Image = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 3px;
  overflow: hidden;
  background: url(<path-to-image>) lightgray 50% / cover no-repeat;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
