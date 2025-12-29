import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { PartialStars } from './PartialStars';
import { useAuth } from '../../../../hooks/useAuth';
import useGetRating from '../../../../hooks/reservation/useGetRating';
import useIsMobile from '../../../../hooks/useIsMobile';

export const RatingTab = () => {
  const { classId } = useParams<{ classId: string }>();
  const { isLoggedIn } = useAuth();

  const STAR_LENGTH: number = 5;
  const { data } = useGetRating(classId ?? '');

  const isMobile = useIsMobile();

  const getRatingStars = (rate: number) => {
    return Array.from({ length: STAR_LENGTH }, (_, idx) => {
      const remainingRate = rate - idx;
      const percentage = Math.max(0, Math.min(1, remainingRate));

      const starIndex = Math.round(percentage * 10);
      return (
        <PartialStars
          key={idx}
          level={starIndex}
          width={isMobile ? '48px' : '80px'}
          height={isMobile ? '48px' : '80px'}
        />
      );
    });
  };

  return (
    <Container>
      {
        <>
          <Stars>{getRatingStars(data?.averageRating || 0)}</Stars>
          <RatingNumber>{data?.averageRating?.toFixed(1)}</RatingNumber>
        </>
      }
      <Notice>
        이 수업을 수강하셨나요?{'\n'} 직접 이 수업에 대한 만족도를 평가해보세요!
      </Notice>
      <GoReviewButton to={isLoggedIn ? '/mypage?menu=myreview' : '/login'}>
        <span>후기 작성하러 가기</span>
      </GoReviewButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 70px 0;

  ${({ theme }) => theme.media.tablet} {
    padding: 100px 0;
  }
`;
const Stars = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;

  ${({ theme }) => theme.media.tablet} {
    gap: 25px;
  }
`;
const RatingNumber = styled.div`
  margin-top: 12px;
  margin-bottom: 40px;
  color: var(--main-white);
  text-align: center;
  font-size: 30px;
  font-weight: 600;
  line-height: 50px;
  letter-spacing: -1.5px;

  ${({ theme }) => theme.media.tablet} {
    margin-top: 30px;
    margin-bottom: 50px;
    font-size: 40px;
    letter-spacing: -2px;
  }
`;
const Notice = styled.div`
  color: var(--main-white);
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  line-height: 140%;
  white-space: pre-line;

  ${({ theme }) => theme.media.tablet} {
    font-size: 20px;
    white-space: nowrap;
  }
`;
const GoReviewButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 88px;
  margin: 32px 0;
  border-radius: 10px;
  border: 2px solid var(--main-white);
  background: var(--main-black);
  box-shadow: 0 0 15px 0 var(--main-white) inset;
  text-decoration-line: none;
  transition: all 0.3s ease;

  &:hover {
    border: 2px solid var(--main-purple);
    box-shadow: 0 0 14px 0 var(--main-purple) inset;
  }

  span {
    color: var(--main-white);
    text-align: center;
    font-size: 14px;
    font-weight: 600;

    ${({ theme }) => theme.media.tablet} {
      font-size: 16px;
    }
  }
`;
