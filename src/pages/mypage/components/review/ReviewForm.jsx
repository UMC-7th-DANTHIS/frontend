import React, { useState } from 'react';
import styled from 'styled-components';
import PhotoUpload from './PhotoUpload';
import { ReactComponent as RemoveIcon } from '../../../../assets/buttons/remove.svg';

const ReviewForm = ({ title, review, handleTitle, handleReview }) => {
  const [selectedImages, setSelectedImages] = useState([]);


  const handleImageUpload = (newImage) => {
    if (selectedImages.length < 4) {
      setSelectedImages([...selectedImages, newImage]);
    }
  };

  const removeImage = (indexToRemove) => {
    setSelectedImages(selectedImages.filter((_, index) => index !== indexToRemove));
  };

  return (
    <>
      <ReviewBox imageCount={selectedImages.length}>
        <BoxTitle>
          <Label>제목</Label>
          <Input
            placeholder="제목을 입력하세요"
            value={title}
            onChange={handleTitle}
            maxLength={50}
          />
        </BoxTitle>
        <Line />
        <BoxContent>
          <Label>내용</Label>
          <Textarea
            placeholder="내용을 입력하세요"
            value={review}
            onChange={handleReview}
            hasImage={selectedImages.length > 0}
            maxLength={1000}
          />
        </BoxContent>

        {selectedImages.length > 0 && (
          <>
            <PhotoLine />
            <PreviewImageContainer>
              <ImageGrid>
                {selectedImages.map((image, index) => (
                  <ImageWrapper key={index}>
                    <PreviewImage src={image} alt={`Selected preview ${index + 1}`} />
                    <RemoveButton>
                      <RemoveIcon width={27} height={27} onClick={() => removeImage(index)} />
                    </RemoveButton>
                  </ImageWrapper>
                ))}
              </ImageGrid>
            </PreviewImageContainer>
          </>
        )}
      </ReviewBox>

      <PhotoUpload
        setSelectedImage={handleImageUpload}
        disabled={selectedImages.length >= 4}
      />
    </>
  );
};

export default ReviewForm;

const getReviewBoxHeight = (imageCount) => {
  switch (imageCount) {
    case 0:
      return '400px';
    case 1:
    case 2:
      return '882px';
    case 3:
    case 4:
      return '1130px';
    default:
      return '400px';
  }
};

const ReviewBox = styled.div`
  width: 660px;
  height: ${props => getReviewBoxHeight(props.imageCount)};
  border: 2px solid #9819C3;
  border-radius: 10px;
  box-shadow: 0px 0px 5px #9819C3;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const BoxTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 6px;
`;

const Line = styled.div`
  border: 1.5px solid #B2B2B2;
  width: 555px;
  margin-left: 59px;
  margin-top: 14px;
  margin-bottom: 14px;
`;

const PhotoLine = styled.div`
  border: 1.5px solid #4D4D4D;
  width: 555px;
  margin-left: 59px;
  margin-top: 14px;
  margin-bottom: 27px;
`

const BoxContent = styled.div`
  display: flex;
  flex-direction: row;
`;

const Label = styled.div`
  font-size: 18px;
  font-weight: 500;
  margin-left: 59px;
  line-height: normal;
  margin-top: 15px;
`;

const Input = styled.input`
  width: 474px;
  font-size: 14px;
  font-weight: 400;
  border: none;
  background-color: transparent;
  color: #fff;
  outline: none;
  margin-left: 30px;
  margin-top: 18px;

  &::placeholder {
    color: #4D4D4D;
  }
`;

const Textarea = styled.textarea`
  width: 474px;
  height: ${props => props.hasImage ? '462px' : '300px'};
  font-size: 14px;
  font-weight: 400;
  border: none;
  background-color: transparent;
  color: #fff;
  outline: none;
  resize: none;
  margin-top: 18px;
  margin-left: 30px;

  &::placeholder {
    color: #4D4D4D;
  }
`;

const PreviewImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 13px;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 53px;
  row-gap: 43px;
  max-width: 420px;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
`;

const PreviewImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 7px;
`;

const RemoveButton = styled.div`
  position: absolute;
  top: -15px;
  right: -8px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;