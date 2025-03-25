import React, { useState } from 'react';
import styled from 'styled-components';
import Alert from '../../../../components/Alert';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import MypageSidebar from '../../MypageSidebar';
import ReviewForm from './ReviewForm';
import ReviewStar from './ReviewStar';
import api from '../../../../api/api';
import { useMutation } from '@tanstack/react-query';
import SingleBtnAlert from '../../../../components/SingleBtnAlert';

const ReviewDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState([]);
  const [rating, setRating] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [review, setReview] = useState('');
  const [title, setTitle] = useState('');
  const { id: classId } = useParams();
  const selectedMenu =
    new URLSearchParams(location.search).get('menu') || 'myreview';
  const className = location.state?.className || '';
  const [showInvalidAlert, setShowInvalidAlert] = useState(false);

  const handleMenuClick = (menuKey) => {
    navigate(`/mypage?menu=${menuKey}`);
  };

  const createReview = async (reviewData) => {
    console.log('reviewData', reviewData);
    const token = localStorage.getItem('token');

    const response = await api.post(
      `/dance-classes/${classId}/reviews`,
      {
        ...reviewData,
        reviewImages: reviewData.reviewImages // 이미 S3에 업로드된 URL 배열
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('API response:', response.data); // 응답 확인
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      setShowInvalidAlert(true);
    },
    onError: (error) => {
      console.error(error.message);
    }
  });

  const handleReview = (e) => {
    setReview(e.target.value);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!review.trim()) {
      alert('리뷰 내용을 작성해주세요.');
      return;
    }
    if (!title.trim()) {
      alert('리뷰 제목을 작성해주세요');
      return;
    }

    const reviewData = {
      title: title,
      content: review,
      rating: rating,
      reviewImages: selectedImage
    };

    console.log('4444', reviewData);
    mutation.mutate(reviewData);
  };

  const handleClickCancel = () => setShowAlert(true);
  const hideClickCancel = () => setShowAlert(false);

  return (
    <>
      <Container>
        <MypageSidebar
          selectedMenu={selectedMenu}
          onMenuClick={handleMenuClick}
        />

        <ReviewContainer>
          <ClassTitle>{className}</ClassTitle>
          <Title>리뷰 작성</Title>
          <Notice>
            <li> * 제목은 최대 50자까지 입력 가능합니다. </li>
            <li> * 내용은 최대 1000자까지 입력 가능합니다.</li>
          </Notice>

          <ReviewForm
            title={title}
            review={review}
            handleTitle={handleTitle}
            handleReview={handleReview}
            selectedImages={selectedImage}
            setSelectedImages={setSelectedImage}
          />
          <ReviewStar rating={rating} setRating={setRating} />

          <FinalSection>
            <Buttons>
              <CancelButton onClick={handleClickCancel}>
                취소
                {showAlert && (
                  <Alert
                    message={
                      <span>
                        <span>
                          해당 페이지를 벗어나면 <br />
                        </span>
                        <span>
                          작성 중인 글이 <ColoredText> 모두 삭제 </ColoredText>{' '}
                          됩니다 <br />
                        </span>
                        <span>떠나시겠습니까?</span>
                      </span>
                    }
                    onClose={hideClickCancel}
                    mariginsize="22px"
                    ContainerWidth="280px"
                    ContainerHeight="108px"
                    marginsize="24px"
                    AlertWidth="392px"
                    AlertHeight="260px"
                    showButtons={true}
                    confirmLabel="남기"
                    cancelLabel="떠나기"
                  />
                )}
              </CancelButton>

              <SubmitButton onClick={handleSubmit}>작성</SubmitButton>
              {showInvalidAlert && (
                <SingleBtnAlert
                  message={
                    <AlertText>
                      모든 항목을 {'\n'}
                      <ColoredText>적절하게 </ColoredText>
                      입력했는지 확인해주세요.
                    </AlertText>
                  }
                  onClose={() => {
                    setShowInvalidAlert(false);
                    navigate(`/classreservation/${classId}?tab=reviews`);
                  }}
                  mariginsize="33px"
                  showButtons={true}
                />
              )}
            </Buttons>
          </FinalSection>
        </ReviewContainer>
      </Container>
    </>
  );
};

export default ReviewDetail;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  background-color: black;
  width: 1440px;
`;

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: black;
  color: #fff;
  margin-top: 38px;
  width: 880px;
  margin-left: 50px;
`;

const ClassTitle = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 23px;
  margin-left: 200px;
`;

const Title = styled.div`
  font-weight: 600;
  color: #fff;
  font-size: 22px;
  margin-left: 55px;
`;

const Notice = styled.div`
  color: #b2b2b2;
  font-size: 14px;
  list-style: none;
  margin-bottom: 10px;
  text-align: right;
  margin-right: 220px;
`;

const FinalSection = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 244px;
  gap: 24px;
  margin-top: 75px;
  margin-left: 519px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const CancelButton = styled.button`
  width: 64px;
  height: 36px;
  background-color: transparent;
  color: #fff;
  border: 2px solid #9819c3;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background-color: #9819c3;
  }
`;

const SubmitButton = styled.button`
  width: 64px;
  height: 36px;
  background-color: #9819c3;
  color: #fff;
  border: 2px solid #9819c3;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
`;

const ColoredText = styled.span`
  color: #a60f62;
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
