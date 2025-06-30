import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as EditIcon } from '../../assets/shape/write.svg';
import { ReactComponent as DeleteIcon } from '../../assets/shape/trash.svg';
import { ReactComponent as Siren } from '../../assets/Community/SirenButton.svg';
import ConfirmDeleteAlert from '../../components/ConfirmDelete';
import ImageModal from './_components/ImageModal';
import formatDate from '../../api/formatDate';
import useFetchData from '../../hooks/useFetchData';
import { SingleReview, User } from '../../types/ClassInterface';
import axiosInstance from '../../api/axios-instance';

const ReviewDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isUserAuthorMatch, setIsUserAuthorMatch] = useState(false);
  const { data, fetchData } = useFetchData<SingleReview>();
  const { fetchData: fetchUser } = useFetchData<User>();

  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean[]>([]);

  const { reviewId } = useParams();
  const { fromReviewTab, classId, page } = location.state || {}; // 페이지네이션을 기억해 둠

  useEffect(() => {
    const fetchReview = async () => {
      await fetchData(`/dance-classes/${classId}/reviews/${reviewId}`);
    };

    const checkUserInfo = async () => {
      const response = await fetchUser(`/users/me`);

      if (response.data.data?.nickname === data?.author) {
        setIsUserAuthorMatch(true);
      }
    };

    fetchReview();
    checkUserInfo();
  }, [classId, reviewId, fetchData, fetchUser, data]);

  const deleteReview = async () => {
    try {
      await axiosInstance.delete(
        `/dance-classes/${classId}/reviews/${reviewId}`
      );

      navigate(`/classreservation/${classId}?tab=reviews`, {
        state: { fromReviewDetail: true, page } // 페이지네이션 정보 재전달
      });
    } catch (error) {
      console.error('❌ 리뷰를 삭제하는 중 오류 발생:', error);
    }
  };

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

  return (
    <Container>
      <Title>{data?.title}</Title>
      <DividerLine />
      <InfoWrapper>
        {isUserAuthorMatch ? (
          <Tool>
            <Button onClick={() => navigate(`/review/${data?.reviewId}`)}>
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
          {data && (
            <InfoText>작성일 : {formatDate(data.createdAt, 1)}</InfoText>
          )}
          <InfoText>작성자 : {data?.author}</InfoText>
        </Writer>
      </InfoWrapper>
      <Content>{data?.content}</Content>
      <ImagesContainer>
        <ImagesContainer>
          {data?.reviewImages &&
            data?.reviewImages.map((image, index) => (
              <React.Fragment key={index}>
                <Image
                  src={image}
                  alt={`review ${data?.reviewId} #${index}`}
                  onClick={() => handleOpenModal(index)}
                />
                {isModalOpen[index] && (
                  <ImageModal
                    imgUrl={image}
                    setIsModalOpen={setIsModalOpen}
                    index={index}
                  />
                )}
              </React.Fragment>
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
          onConfirm={() => deleteReview()}
          showButtons={true}
        />
      )}
    </Container>
  );
};

export default ReviewDetailPage;

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
