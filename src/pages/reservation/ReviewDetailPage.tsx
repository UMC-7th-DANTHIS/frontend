import { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import LoadingSpinner from '../../components/LoadingSpinner';
import { ImageModal } from '../../common/reservation';
import useGetReview from '../../hooks/reservation/review/useGetReview';
import useGetMyInfo from '../../hooks/user/useGetMyInfo';
import { ReviewDetailHeader } from '../../common/reservation/ReviewDetailHeader';
import { useAuth } from '../../hooks/useAuth';

interface ReviewLocationState {
  fromReviewTab: boolean;
  classId: string;
  page: number;
}

export default function ReviewDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { reviewId } = useParams();

  const { isLoggedIn } = useAuth();

  const [isUserAuthorMatch, setIsUserAuthorMatch] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean[]>([]);

  const { fromReviewTab, classId, page } = (location.state as ReviewLocationState) || {}; // 페이지네이션을 기억해 둠

  const { data: review, isLoading } = useGetReview(classId, reviewId ?? '');
  const { data: user } = useGetMyInfo({ enabled: isLoggedIn });

  useEffect(() => {
    if (!user || !review) return;
    if (user?.nickname === review.author) setIsUserAuthorMatch(true);
  }, [user, review]);

  const handleBackClick = () => {
    if (fromReviewTab) {
      navigate(`/classes/${classId}?tab=reviews`, {
        state: { fromReviewDetail: true, page } // 페이지네이션 정보 재전달
      });
    }
  };

  const handleOpenModal = (index: number) => {
    setIsModalOpen((prev) => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  if (!review || !reviewId || isLoading)
    return (
      <Container>
        <LoadingSpinner isLoading={isLoading} marginTop="0" />
      </Container>
    );

  return (
    <Container>
      <ReviewDetailHeader
        title={review.title}
        author={review.author}
        reviewId={review.reviewId}
        isAuthor={isUserAuthorMatch}
        createdAt={review.createdAt}
        classId={classId}
        page={page}
      />
      <Content>{review.content}</Content>
      <ImagesContainer>
        {review.reviewImages.length > 0 &&
          review.reviewImages.map((image, index) => (
            <div key={index}>
              <Image src={image} alt={`review ${review.reviewId} #${index}`} onClick={() => handleOpenModal(index)} />
              {isModalOpen[index] && <ImageModal imgUrl={image} setIsModalOpen={setIsModalOpen} index={index} />}
            </div>
          ))}
      </ImagesContainer>
      <DividerLine />
      <GoBackButtonWrapper>
        <button onClick={handleBackClick}>돌아가기</button>
      </GoBackButtonWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 932px;
  min-height: 560px;
  padding: 32px 16px;

  ${({ theme }) => theme.media.desktop} {
    padding: 16px;
  }
`;
const DividerLine = styled.div`
  width: 100%;
  height: 0.8px;
  margin: 24px 0;
  background: #d9d9d9;

  ${({ theme }) => theme.media.tablet} {
    height: 1.5px;
    margin: 56px 0;
  }
`;
const Content = styled.div`
  margin: 36px 27px;
  color: var(--main-white);
  text-align: justify;
  font-size: 14px;
  font-weight: 400;

  ${({ theme }) => theme.media.tablet} {
    margin: 76px 0;
    text-size: 16px;
  }
`;
const ImagesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 80px);
  width: 100%;
  gap: 7px;

  ${({ theme }) => theme.media.tablet} {
    grid-template-columns: repeat(4, 160px);
    gap: 20px;
  }

  ${({ theme }) => theme.media.desktop} {
    grid-template-columns: repeat(4, 200px);
  }
`;
const Image = styled.img`
  width: 80px;
  height: 80px;
  border: none;
  border-radius: 7px;
  overflow: hidden;
  background: url(<path-to-image>) lightgray 50% / cover no-repeat;
  cursor: pointer;
  object-fit: cover;

  ${({ theme }) => theme.media.tablet} {
    width: 160px;
    height: 160px;
  }

  ${({ theme }) => theme.media.desktop} {
    width: 200px;
    height: 200px;
  }
`;
const GoBackButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 9px 18px;
    margin-bottom: 32px;
    border-radius: 10px;
    border: 1px solid var(--main-purple);
    background: transparent;

    color: var(--main-purple);
    text-align: center;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
  }
`;
