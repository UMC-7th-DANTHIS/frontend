import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as EditIcon } from '../../assets/shape/write.svg';
import { ReactComponent as DeleteIcon } from '../../assets/shape/trash.svg';
import { formatDateWithTime } from './formatDate';
import api from '../../api/api';

const ReviewDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [review, setReview] = useState([]);
  const { reviewId } = useParams();
  const { fromReviewTab, classId, page } = location.state || {}; // 페이지네이션을 기억해 둠

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await api.get(
          `/dance-classes/${classId}/reviews/${reviewId}`
        );
        setReview(response.data.data);
      } catch (error) {
        console.error('❌ 리뷰 상세 정보를 불러오는 중 오류 발생:', error);
      }
    };
    fetchReview();
  }, [classId, reviewId]);

  // 돌아가기 버튼 핸들러
  const handleBackClick = () => {
    if (fromReviewTab) {
      navigate(`/classreservation/${classId}?tab=reviews`, {
        state: { fromReviewDetail: true, page } // 페이지네이션 정보 재전달
      });
    }
  };

  return (
    <Container>
      <Title>{review.title}</Title>
      <DividerLine />
      <InfoWrapper>
        <Tool>
          <EditIcon />
          <DeleteIcon />
        </Tool>
        <InfoText>작성일 : {formatDateWithTime(review.createdAt)}</InfoText>
        <InfoText>작성자 : {review.author}</InfoText>
      </InfoWrapper>
      <Content>{review.content}</Content>
      <ImagesContainer>
        {review.images &&
          review.images.map((image, index) => (
            <Image key={index}>
              <img src={image} alt={`review ${review.id} #${index}`} />
            </Image>
          ))}
      </ImagesContainer>
      <DividerLine />
      <ButtonSection>
        <GoBackButton onClick={handleBackClick}>돌아가기</GoBackButton>
      </ButtonSection>
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
  align-items: center;
  width: 900px;
`;
const Tool = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 14px;
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
const Image = styled.div`
  width: 200px;
  height: 200px;
  border: none;
  border-radius: 7px;
  background: url(<path-to-image>) lightgray 50% / cover no-repeat;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover; // 비율 유지
  }
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
