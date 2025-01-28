import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as StarFilled } from "../../../../assets/shape/filledYellowStar.svg"
import { ReactComponent as StarNonfilled } from '../../../../assets/shape/nonfilledYellowStar.svg';
import Alert from '../../../../components/Alert';

const MyReview = () => {
  const [starStates, setStarStates] = useState(Array(5).fill(false));
  const [selectedImage, setSelectedImage] = useState(null);
  const photoInputRef = useRef(null);
  const [showAlert, setShowAlert] = useState(false);

  const toggleStar = (index) => {
    setStarStates((prev) =>
      prev.map((state, i) => (i === index ? !state : state))
    );
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleClickCancel = (e) => {
    setShowAlert(true);
  };

  const hideClickCancel = () => {
    setShowAlert(false);
  };

  return (
    <ReviewContainer>
      <Title>리뷰 작성</Title>
      <ReviewBox>
        <BoxTitle>
          <Label>제목</Label>
          <Input placeholder="제목을 입력하세요" />
        </BoxTitle>

        <Line />

        <BoxContent>
          <Label>내용</Label>
          <Textarea placeholder="내용을 입력하세요" />
        </BoxContent>
      </ReviewBox>

      <PhotoSection>
        <PhotoButton onClick={() => photoInputRef.current.click()}>
          사진
        </PhotoButton>
        <PhotoInput
          ref={photoInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {selectedImage && <PreviewImage src={selectedImage} alt="selected image" />}
        <Warning>
          <li>
            * 사진은 최대 4장까지 등록 가능합니다.
          </li>
          <li>
            * 과도한 비방 및 욕설이 포함된 게시글은 신고에 의해 무통보 삭제될 수 있습니다.
          </li>
          <li>
            * 초상권, 저작권 침해 및 기타 위반한 게시글은 관리자에 의해 무통보 삭제될 수 있습니다.
          </li>
        </Warning>
      </PhotoSection>

      <RatingSection>
        <RatingTitle>별점 평가</RatingTitle>
        <Stars>
          {starStates.map((isFilled, index) => (
            <Star key={index} onClick={() => toggleStar(index)}>
              {isFilled ? <StarFilled width={50} height={50} /> : <StarNonfilled width={50} height={50} />}
            </Star>
          ))}
        </Stars>
      </RatingSection>

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
                      작성 중인 글이 <ColoredText> 모두 삭제 </ColoredText> 됩니다 <br />
                    </span>

                    <span>
                      떠나시겠습니까?
                    </span>
                  </span>
                }
                onClose={hideClickCancel}
                ContainerWidth="280px"
                ContainerHeight="108px"
                mariginsize="24px"
                AlertWidth="392px"
                AlertHeight="260px"
                showButtons={true}
                confirmLabel="남기"
                cancelLabel="떠나기"
              />
            )}
          </CancelButton>
          <SubmitButton>작성</SubmitButton>
        </Buttons>
      </FinalSection>
    </ReviewContainer>
  );
};

export default MyReview;

const ReviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: black;
    color: #fff;
    margin-top: 38px;
    margin-left: 147px;
`;

const Title = styled.h1`
    font-size: 24px;
    margin-bottom: 20px;
    font-weight: 600;
`;

const ReviewBox = styled.div`
    width: 660px;
    height: 400px;
    border: 2px solid #9819C3;
    border-radius: 10px;
    box-shadow: 0px 0px 5px #9819C3;
    display: flex;
    flex-direction: column;
`;

const BoxTitle = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Line = styled.div`
    border: 1.5px solid #B2B2B2;
    width: 400px;
    margin-left: 59px;
`;

const BoxContent = styled.div`
    display: flex;
    flex-direction: row;
`;

const Label = styled.p`
    font-size: 18px;
    font-weight: 500;
    margin-left: 59px;
`;

const Input = styled.input`
    width: 292px;
    font-size: 14px;
    font-weight: 400;
    border: none;
    background-color: transparent;
    color: #fff;
    outline: none;
    margin-left: 30px;

    &::placeholder {
        color: #4D4D4D;
    }
`;

const Textarea = styled.textarea`
    width: 292px;
    height: 300px;
    font-size: 14px;
    font-weight: 400;
    border: none;
    background-color: transparent;
    color: #fff;
    outline: none;
    resize: none;
    margin-top: 18.5px;
    margin-left: 30px;

    &::placeholder {
        color: #4D4D4D;
    }
`;

const PhotoSection = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    margin-top: 21px;
`;

const PhotoButton = styled.button`
    width: 64px;
    height: 36px;
    background-color: transparent;
    color: #fff;
    font-weight: 600;
    font-size: 16px;
    border: 2px solid #9819C3;
    border-radius: 10px;
    cursor: pointer;

    &:hover {
        background-color: #9819C3;
    }
`;

const PhotoInput = styled.input`
    display: none;
`;

const PreviewImage = styled.img`
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 10px;
`;

// 별점 관련
const RatingSection = styled.div`
    margin-top: 50px;
`;

const RatingTitle = styled.p`
    font-size: 24px;
    font-weight: 600;
    color: #fff;
    margin-bottom: 21px;
`;

const Stars = styled.div`
    display: flex;
    align-items: center;
    margin-left: 166px;
    gap: 20px;
`;

const Star = styled.span`
    cursor: pointer;
`;

// 버튼 및 경고
const FinalSection = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 244px;
    gap: 24px;
    margin-top: 57px;
    justify-content: space-around;
`;

const Warning = styled.div`
    width: 495px;
    color: #fff;
    font-size: 12px;
    font-weight: 400;
    list-style: none;
    margin-top: 21px;

    li {
        margin-bottom: 5px;
    }
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
