import { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { ReactComponent as EditIcon } from '../../assets/shape/write.svg';
import { ReactComponent as DeleteIcon } from '../../assets/shape/trash.svg';
import { ReactComponent as Siren } from '../../assets/Community/SirenButton.svg';
import LoadingSpinner from '../../components/LoadingSpinner';
import ConfirmDeleteAlert from '../../components/ConfirmDelete';
import { ImageModal } from '../../common/reservation';

import formatDate from '../../api/formatDate';
import useGetReview from '../../hooks/reservation/review/useGetReview';
import useGetMyInfo from '../../hooks/user/useGetMyInfo';
import useDeleteReview from '../../hooks/reservation/review/useDeleteReview';

interface ReviewLocationState {
  fromReviewTab: boolean;
  classId: string;
  page: number;
}

export default function ReviewDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { reviewId } = useParams();
  const [isUserAuthorMatch, setIsUserAuthorMatch] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean[]>([]);

  const { fromReviewTab, classId, page } = (location.state as ReviewLocationState) || {}; // 페이지네이션을 기억해 둠

  const { data: review, isLoading } = useGetReview(classId, reviewId ?? '');
  const { data: user } = useGetMyInfo();
  const { mutate: deleteReview } = useDeleteReview();

  useEffect(() => {
    if (user?.nickname === review?.author) setIsUserAuthorMatch(true);
  }, [user, review]);

  const handleBackClick = () => {
    if (fromReviewTab) {
      navigate(`/classreservation/${classId}?tab=reviews`, {
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

  if (!reviewId && isLoading)
    return (
      <Container>
        <LoadingSpinner isLoading={isLoading} />
      </Container>
    );

  return (
    <Container>
      <Title>{review?.title}</Title>
      <DividerLine />
      <InfoWrapper>
        {isUserAuthorMatch ? (
          <Tool>
            <Button onClick={() => navigate(`/review/${review?.reviewId}`)}>
              <EditIcon />
            </Button>
            <Button onClick={() => setShowDeleteAlert(true)}>
              <DeleteIcon />
            </Button>
          </Tool>
        ) : (
          <Button>
            <Siren />
          </Button>
        )}
        <Writer>
          {review && <InfoText>작성일 : {formatDate(review.createdAt, 1)}</InfoText>}
          <InfoText>작성자 : {review?.author}</InfoText>
        </Writer>
      </InfoWrapper>
      <Content>{review?.content}</Content>
      <ImagesContainer>
        <ImagesContainer>
          {review?.reviewImages &&
            review?.reviewImages.map((image, index) => (
              <div key={index}>
                <Image
                  src={image}
                  alt={`review ${review?.reviewId} #${index}`}
                  onClick={() => handleOpenModal(index)}
                />
                {isModalOpen[index] && <ImageModal imgUrl={image} setIsModalOpen={setIsModalOpen} index={index} />}
              </div>
            ))}
        </ImagesContainer>
      </ImagesContainer>
      <DividerLine />
      <ButtonSection>
        <GoBackButton onClick={handleBackClick}>돌아가기</GoBackButton>
      </ButtonSection>

      {showDeleteAlert && (
        <ConfirmDeleteAlert
          message={
            <AlertText>
              해당 게시글을 삭제하면{'\n'}
              추후에 <ColoredText>복구가 불가</ColoredText>합니다.
              {'\n'}
              삭제 하시겠습니까?
            </AlertText>
          }
          onClose={() => setShowDeleteAlert(false)}
          onConfirm={() => deleteReview({ classId, reviewId: reviewId!, page })}
          showButtons={true}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 900px;
  min-height: 560px;
  margin-bottom: 80px;
`;
const Title = styled.div`
  color: var(--main_white, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const DividerLine = styled.div`
  width: 900px;
  height: 1.5px;
  margin: 20px 0;
  background: #d9d9d9;
`;
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 900px;
`;
const Writer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
  gap: 8px;
`;
const Tool = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 14px;
`;
const Button = styled.button`
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
`;
const InfoText = styled.div`
  color: var(--text_secondary-gray, #b2b2b2);
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const Content = styled.div`
  width: 900px;
  margin-top: 48px;
  margin-bottom: 78px;
  color: var(--main_white, #fff);
  text-align: justify;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const ImagesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 38px;
`;
const Image = styled.img`
  width: 200px;
  height: 200px;
  border: none;
  border-radius: 7px;
  overflow: hidden;
  background: url(<path-to-image>) lightgray 50% / cover no-repeat;
  cursor: pointer;
  object-fit: cover;
`;
const ButtonSection = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 900px;
  margin-top: 30px;
`;
const GoBackButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90.963px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid var(--text_purple, #bf00ff);
  background: transparent;
  color: var(--text_purple, #bf00ff);
  text-align: center;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
`;
const AlertText = styled.span`
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px;
  white-space: pre-line;
`;
const ColoredText = styled.span`
  color: #a60f62;
  font-weight: bold;
`;
