import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as PictureIcon } from '../../../assets/picture.svg';
import { ReactComponent as EditIcon } from '../../../assets/shape/write.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/shape/trash.svg';
import MainBox from './MainBox';

const ImagesUploader = ({ isFor, images, handleFormChange }) => {
  const totalImages = 3;
  const [label, setLabel] = useState(
    isFor === 'dancer' ? 'Profile' : isFor === 'class' ? 'Thumbnail' : ''
  );

  // 이미지 업로드 핸들러
  const handleUploadFile = (e, index) => {
    const file = e.target.files[0]; // 파일 가져오기

    if (file && file.type.startsWith('image/')) {
      const updatedImages = images.map((image, i) =>
        i === index ? file : image
      );
      handleFormChange('images', updatedImages);
    }
  };

  // 파일 객체 URL 변환
  const getPreview = (file) => {
    return file instanceof File ? URL.createObjectURL(file) : file;
  };

  // 이미지 삭제 핸들러
  const deleteImage = (index) => {
    const updatedImages = images.map((image, i) =>
      i === index ? null : image
    );
    handleFormChange('images', updatedImages);
  };

  return (
    <Container>
      {Array.from({ length: totalImages }, (_, index) => (
        <ImageWrapper key={index}>
          {/* MainBox는 가장 첫번째 사진에만 있는 박스 */}
          {index === 0 && <MainBox label={label} />}
          <Image htmlFor={`image-${index}`} $needPointer={!images[index]}>
            {images[index] === null && <PictureIcon />}
            {images[index] && (
              <img src={getPreview(images[index])} alt={`class-${index}`} />
            )}
          </Image>
          {/* 이미지가 업로드 안 된 상태에서만 클릭 가능 */}
          {!images[index] && (
            <HiddenInput
              type="file"
              id={`image-${index}`}
              accept="image/*"
              onChange={(e) => handleUploadFile(e, index)}
            ></HiddenInput>
          )}
          {/* 이미지가 업로드 된 상태에서만 수정/삭제 아이콘 표시 */}
          {images[index] && (
            <Tools>
              <Icon htmlFor={`edit-image-${index}`}>
                <EditIcon />
              </Icon>
              <HiddenInput
                type="file"
                id={`edit-image-${index}`}
                accept="image/*"
                onChange={(e) => handleUploadFile(e, index)}
              ></HiddenInput>

              <Icon onClick={() => deleteImage(index)}>
                <DeleteIcon />
              </Icon>
            </Tools>
          )}
        </ImageWrapper>
      ))}
    </Container>
  );
};

export default ImagesUploader;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 44px;
  width: 568px;
  margin-top: 32px;
  margin-bottom: 134px;
`;
const ImageWrapper = styled.div`
  position: relative;
`;
const Image = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 160px;
  height: 160px;
  border-radius: 7px;
  background: #d9d9d9;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover; // 비율 유지
  }

  ${({ $needPointer }) => $needPointer && `cursor: pointer;`}
`;
const HiddenInput = styled.input`
  display: none;
`;
const Tools = styled.div`
  position: absolute;
  left: 48px;
  display: flex;
  flex-direction: row;
`;
const Icon = styled.label`
  cursor: pointer;
  margin: 5px;
  margin-bottom: 0;
`;
