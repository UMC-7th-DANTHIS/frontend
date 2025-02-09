import React, { useRef } from 'react';
import styled from 'styled-components';

const PhotoUpload = ({ setSelectedImage }) => {
  const photoInputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) setSelectedImage(URL.createObjectURL(file));
  };

  return (
    <PhotoSection>
      <PhotoButton onClick={() => photoInputRef.current.click()}>사진</PhotoButton>
      <PhotoInput
        ref={photoInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      <Warning>
        <li>* 사진은 최대 4장까지 등록 가능합니다.</li>
        <li>* 과도한 비방 및 욕설이 포함된 게시글은 신고에 의해 무통보 삭제될 수 있습니다.</li>
        <li>* 초상권, 저작권 침해 및 기타 위반한 게시글은 관리자에 의해 무통보 삭제될 수 있습니다.</li>
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
`;

const PhotoButton = styled.button`
  width: 64px;
  height: 36px;
  margin-left: 14px;
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

const Warning = styled.div`
  width: 495px;
  color: #fff;
  font-size: 12px;
  font-weight: 400;
  list-style: none;
`;
