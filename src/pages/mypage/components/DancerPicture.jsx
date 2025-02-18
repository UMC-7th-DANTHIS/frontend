import React from 'react';
import styled from 'styled-components';
import { ReactComponent as PictureIcon } from '../../../assets/picture.svg';
import { ReactComponent as EditIcon } from '../../../assets/shape/write.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/shape/trash.svg';
import PictureBox from './PictureBox';

const DancerPicture = ({ isFor, images, handleFormChange }) => {
  const maxImages = 3;
  const label = isFor === 'edit' ? 'Profile' : '';

  const handleUploadFile = (e, index) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith('image/')) {
      const updatedImages = [...images];
      updatedImages[index] = file;
      handleFormChange('images', updatedImages);
    }

    e.target.value = '';
  };

  const getPreview = (image) => {
    if (!image) return null;
    if (image instanceof File) {
      return URL.createObjectURL(image);
    }
    return image;
  };

  const deleteImage = (index) => {
    const updatedImages = [...images];
    updatedImages[index] = null;
    handleFormChange('images', updatedImages);
  };

  return (
    <Container>
      {Array.from({ length: maxImages }, (_, index) => (
        <ImageWrapper key={index}>
          {index === 0 && <PictureBox label={label} />}
          <ImageLabel htmlFor={`image-${index}`} $needPointer={!images[index]}>
            {!images[index] ? (
              <PictureIcon />
            ) : (
              <PreviewImage
                src={getPreview(images[index])}
                alt={`Preview ${index + 1}`}
              />
            )}
          </ImageLabel>

          <HiddenInput
            type="file"
            id={`image-${index}`}
            accept="image/*"
            onChange={(e) => handleUploadFile(e, index)}
          />

          {images[index] && (
            <Tools>
              <IconLabel htmlFor={`edit-image-${index}`}>
                <EditIcon />
              </IconLabel>
              <HiddenInput
                type="file"
                id={`edit-image-${index}`}
                accept="image/*"
                onChange={(e) => handleUploadFile(e, index)}
              />
              <IconButton onClick={() => deleteImage(index)}>
                <DeleteIcon />
              </IconButton>
            </Tools>
          )}
        </ImageWrapper>
      ))}

    </Container>
  );
};

export default DancerPicture;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 44px;
  margin-top: 11px;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const ImageLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 160px;
  height: 160px;
  border-radius: 7px;
  background: #d9d9d9;
  overflow: hidden;
  margin-left: 12px;

  ${({ $needPointer }) => $needPointer && `cursor: pointer;`}
`;

const HiddenInput = styled.input`
  display: none;
`;

const Tools = styled.div`
  position: absolute;
  left: 54px;
  display: flex;
  flex-direction: row;
`;

const IconLabel = styled.label`
  cursor: pointer;
  margin: 5px;
  margin-bottom: 0;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin: 5px;
  margin-bottom: 0;
`;

const PreviewImage = styled.img`
  width: 160px;
  height: 160px;
  object-fit: cover;
`;
