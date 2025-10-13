import React, { ChangeEvent, useRef, useState } from 'react';
import styled from 'styled-components';
import api from '../../../../api/api';
import { PhotoUploadProps } from '@/types/mypage/ReviewType';

const PhotoUpload = ({ setSelectedImage, disabled }: PhotoUploadProps) => {
  const photoInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedImages, setSelectedImagesState] = useState<string[]>([]);

  const getPresignedUrl = async (file: File): Promise<string | null> => {
    try {
      const fileExtension = file.name.split('.').pop();
      const response = await api.post(
        `/images/review?fileExtensions=${fileExtension}`
      );

      return response.data[0]?.presignedUrl || null;
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      return null;
    }
  };

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;

    if (selectedImages.length >= 4) {
      alert('사진은 최대 4장까지 등록할 수 있습니다.');
      return;
    }

    const presignedUrl = await getPresignedUrl(file);

    if (!presignedUrl) return;

    const uploadedImageUrl = await uploadFileToS3(presignedUrl, file);

    if (uploadedImageUrl) {
      const updatedImages = [...selectedImages, uploadedImageUrl];
      setSelectedImagesState(updatedImages);
      setSelectedImage(updatedImages);
    }

    event.target.value = '';
  };

  const uploadFileToS3 = async (
    presignedUrl: string,
    file: File
  ): Promise<string | null> => {
    try {
      const uploadResponse = await fetch(presignedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type
        }
      });

      if (!uploadResponse.ok) {
        throw new Error(`업로드 실패: ${uploadResponse.status}`);
      }

      return presignedUrl.split('?')[0];
    } catch (error: any) {
      return null;
    }
  };

  return (
    <PhotoSection>
      <PhotoButton
        onClick={() => photoInputRef.current?.click()}
        disabled={disabled}
      >
        사진
      </PhotoButton>
      <PhotoInput
        ref={photoInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />

      <Warning>
        <li>* 사진은 최대 4장까지 등록 가능합니다.</li>
        <li>
          * 과도한 비방 및 욕설이 포함된 게시글은 신고에 의해 무통보 삭제될 수
          있습니다.
        </li>
        <li>
          * 초상권, 저작권 침해 및 기타 위반한 게시글은 관리자에 의해 무통보
          삭제될 수 있습니다.
        </li>
      </Warning>
    </PhotoSection>
  );
};

export default PhotoUpload;

const PhotoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  margin-top: 21px;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
    text-align: center;
  }
`;

const PhotoButton = styled.button`
  width: 64px;
  height: 36px;
  margin-left: 14px;
  background-color: transparent;
  color: #fff;
  font-weight: 600;
  font-size: 16px;
  border: 2px solid #9819c3;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #9819c3;
  }

  @media (max-width: 600px) {
    margin-left: 0;
  }
`;

const PhotoInput = styled.input`
  display: none;
`;

const Warning = styled.div`
  width: 495px;
  color: #fff;
  font-size: 12px;
  font-weight: 400;
  list-style: none;

  @media (max-width: 600px) {
    width: 100%;
    max-width: 320px;
    font-size: 10px;
    text-align: start;
  }
`;
