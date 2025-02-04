import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Alert from '../../../../components/Alert';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import dummyClass from '../../../../store/mypage/dummyClass';
import MypageSidebar from '../../MypageSidebar';
import ReviewForm from './ReviewForm';
import ReviewStar from './ReviewStar';



const ReviewDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [starStates, setStarStates] = useState(Array(5).fill(false));
  const [selectedImage, setSelectedImage] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [review, setReview] = useState("");
  const [title, setTitle] = useState("");
  const { id } = useParams();
  const [classData, setClassData] = useState(null);
  const selectedMenu = new URLSearchParams(location.search).get('menu') || 'myreview';
  const handleMenuClick = (menuKey) => {
    navigate(`/mypage?menu=${menuKey}`);
  };

  useEffect(() => {
    const selectedClass = dummyClass.find((classItem) => classItem.id === parseInt(id));
    setClassData(selectedClass);
  }, [id]);

  const handleReview = (e) => setReview(e.target.value);
  const handleTitle = (e) => setTitle(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("제목", title);
    console.log("리뷰", review);
    console.log("별점", starStates.filter(state => state).length);
    console.log("사진", selectedImage);
    setTitle("");
    setReview("");
    setSelectedImage([]);
  };

  const toggleStar = (index) => {
    setStarStates((prev) => prev.map((state, i) => (i === index ? !state : state)));
  };

  const handleClickCancel = () => setShowAlert(true);
  const hideClickCancel = () => setShowAlert(false);

  return (
    <>
      <Container>
        <MypageSidebar selectedMenu={selectedMenu} onMenuClick={handleMenuClick} />


        {classData && (
          <ReviewContainer>
            <ClassTitle>{classData.className}</ClassTitle>
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
            />
            <ReviewStar starStates={starStates} toggleStar={toggleStar} />

            <FinalSection>
              <Buttons>
                <CancelButton onClick={handleClickCancel}>
                  취소
                  {showAlert && (
                    <Alert
                      message={
                        <span>
                          <span>해당 페이지를 벗어나면 <br /></span>
                          <span>작성 중인 글이 <ColoredText> 모두 삭제 </ColoredText> 됩니다 <br /></span>
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
              </Buttons>
            </FinalSection>
          </ReviewContainer>
        )}
      </Container>
    </>
  );
}
export default ReviewDetail;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    background-color: black;
    width: 1440px;
`

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
    color: #FFF;
    font-size: 30px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-bottom: 23px;
    margin-left: 200px;
`

const Title = styled.div`
    font-weight: 600;
    color: #FFF;
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-left: 55px;
`;

const Notice = styled.div`
    color:#B2B2B2;
    font-size: 14px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    list-style: none;
    margin-bottom: 10px;
    text-align: right;
    margin-right: 220px;
`


// 버튼 및 경고
const FinalSection = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 244px;
    gap: 24px;
    margin-top: 21px;
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
    border: 2px solid #9819C3;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 600;

    &:hover {
        background-color: #9819C3;
    }
`;

const SubmitButton = styled.button`
    width: 64px;
    height: 36px;
    background-color: #9819C3;
    color: #fff;
    border: 2px solid #9819C3;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 600;
`;

//alert
const ColoredText = styled.span`
  color: #A60F62;
`
