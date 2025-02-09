import React from 'react';
import styled from 'styled-components';
import { ReactComponent as PictureIcon } from '../../../assets/picture.svg';
import { ReactComponent as EditIcon } from '../../../assets/shape/write.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/shape/trash.svg';
import MainBox from './MainBox';
import api from '../../../api/api';

const ImagesUploader = ({ isFor, images, handleFormChange }) => {
  const totalImages = 3;

  const config = {
    dancer: { label: 'Profile', fieldName: 'dancerImages', urlParam: 'dancer' },
    class: { label: 'Thumbnail', fieldName: 'images', urlParam: 'dance-class' }
  };

  const { label, fieldName, urlParam } = config[isFor] || {};

  // Presigned URL 요청
  const getPresignedUrl = async (file) => {
    try {
      const fileExtension = file.name.split('.').pop(); // 파일 확장자
      const response = await api.post(
        `/images/${urlParam}?fileExtensions=${fileExtension}`
      );
      return response.data[0]?.presignedUrl || null; // Presigned URL 반환
    } catch (error) {
      console.error(
        '❌ Presigned URL 발급 실패:',
        error.response?.data || error.message
      );
      return null;
    }

    e.target.value = '';
  };

  // S3에 파일 업로드
  const uploadFileToS3 = async (presignedUrl, file) => {
    try {
      const uploadResponse = await fetch(presignedUrl, {
        method: 'PUT',
        body: file
      });
      if (!uploadResponse.ok) {
        throw new Error(`업로드 실패: ${uploadResponse.status}`);
      }
      return presignedUrl.split('?')[0]; // 업로드된 이미지 URL 반환
    } catch (error) {
      console.error('❌ 업로드 실패:', error.message);
      return null;
    }
  };

  // 이미지 업데이트 로직
  const updateImageList = (index, newImageUrl) => {
    const updatedImages = images.map((img, i) =>
      i === index ? newImageUrl : img
    );
    handleFormChange(fieldName, updatedImages);
  };

  // 이미지 업로드 핸들러
  const handleUploadFile = async (e, index) => {
    const file = e.target.files[0]; // 파일 가져오기
    if (!file || !file.type.startsWith('image/')) return;

    const presignedUrl = await getPresignedUrl(file);
    if (!presignedUrl) return;

    const uploadedImageUrl = await uploadFileToS3(presignedUrl, file);
    if (uploadedImageUrl) {
      updateImageList(index, uploadedImageUrl);
    }

    e.target.value = ''; // 파일 선택 초기화
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
          <Image htmlFor={`image-${index}`} $isEmpty={!images[index]}>
            {images[index] ? (
              <img src={images[index]} alt={`class-${index}`} />
            ) : (
              <PictureIcon />
            )}
          </Image>

          {/* 이미지가 업로드 안 된 상태에서만 박스 클릭 가능 */}
          <HiddenInput
            type="file"
            id={`image-${index}`}
            accept="image/*"
            onChange={(e) => handleUploadFile(e, index)}
            disabled={!!images[index]}
          ></HiddenInput>

          {/* 이미지가 업로드 된 상태에서만 수정/삭제 버튼 표시 */}
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

              <Icon onClick={() => updateImageList(index, '')}>
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

  ${({ $isEmpty }) => $isEmpty && `cursor: pointer;`}
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
