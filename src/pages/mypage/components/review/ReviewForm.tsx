import React from 'react';
import styled from 'styled-components';
import PhotoUpload from './PhotoUpload';
import { ReactComponent as RemoveIcon } from '../../../../assets/buttons/remove.svg';
import {
  ReviewBoxProps,
  ReviewFormProps,
  TextareaProps
} from '@/types/mypage/ReviewType';

const ReviewForm: React.FC<ReviewFormProps> = ({
  title,
  review,
  handleTitle,
  handleReview,
  selectedImages,
  setSelectedImages
}) => {
  const handleImageUpload = (images: string[] | string) => {
    const newImages = Array.isArray(images) ? images : [images];

    const filtered = newImages.filter((url) => !selectedImages.includes(url));

    if (selectedImages.length < 4) {
      setSelectedImages([...selectedImages, ...filtered].slice(0, 4));
    }
  };

  const removeImage = (indexToRemove: number) => {
    setSelectedImages(
      selectedImages.filter((_, index) => index !== indexToRemove)
    );
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
                    <PreviewImage
                      src={image}
                      alt={`Selected preview ${index}`}
                    />
                    <RemoveButton>
                      <RemoveIcon
                        width={27}
                        height={27}
                        onClick={() => removeImage(index)}
                      />
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

// const getReviewBoxHeight = (imageCount: number) => {
//   switch (imageCount) {
//     case 0:
//       return '400px';
//     case 1:
//     case 2:
//       return '882px';
//     case 3:
//     case 4:
//       return '1130px';
//     default:
//       return '400px';
//   }
// };

const ReviewBox = styled.div<ReviewBoxProps>`
  width: 100%;
  max-width: 660px;
  min-width: 320px;
  height: auto;
  min-height: ${(props) => (props.imageCount > 0 ? '400px' : '300px')};

  border: 2px solid #9819c3;
  border-radius: 10px;
  box-shadow: 0px 0px 5px #9819c3;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 16px 24px;
  box-sizing: border-box;

  @media (max-width: 600px) {
    width: 100%;
    max-width: 100%;
    padding: 12px;
  }
`;

const BoxTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  padding: 12px 24px 0;
`;

const Line = styled.div`
  border: 1.5px solid #b2b2b2;
  width: 100%;
  margin: 14px 0;
`;

const PhotoLine = styled.div`
  border: 1.5px solid #4d4d4d;
  width: 100%;
  margin: 14px 0 27px;
`;

const BoxContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 16px;
  padding: 12px 24px 0;
`;

const Label = styled.div`
  font-size: 18px;
  font-weight: 500;
  min-width: 50px;
  flex-shrink: 0;

  @media (max-width: 600px) {
    font-size: 14px;
    min-width: 40px;
  }
`;

const Input = styled.input`
  flex: 1;
  font-size: 14px;
  font-weight: 400;
  border: none;
  background-color: transparent;
  color: #fff;
  outline: none;

  &::placeholder {
    color: #4d4d4d;
  }

  @media (max-width: 600px) {
    font-size: 13px;
  }
`;

const Textarea = styled.textarea<TextareaProps>`
  flex: 1;
  height: ${(props) => (props.hasImage ? '462px' : '300px')};
  font-size: 14px;
  font-weight: 400;
  border: none;
  background-color: transparent;
  color: #fff;
  outline: none;
  resize: none;

  &::placeholder {
    color: #4d4d4d;
  }

  @media (max-width: 600px) {
    font-size: 13px;
  }
`;

const PreviewImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 13px;

  @media (max-width: 600px) {
    margin-top: 10px;
  }
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 53px;
  row-gap: 43px;
  max-width: 420px;

  @media (max-width: 600px) {
    column-gap: 16px;
    row-gap: 16px;
    max-width: 100%;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 200px;
  height: 200px;

  @media (max-width: 600px) {
    width: 140px;
    height: 140px;
  }
`;

const PreviewImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 7px;

  @media (max-width: 600px) {
    width: 140px;
    height: 140px;
  }
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

  @media (max-width: 600px) {
    top: -10px;
    right: -6px;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;
