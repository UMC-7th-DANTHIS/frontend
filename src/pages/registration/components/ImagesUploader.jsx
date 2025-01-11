import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as PictureIcon } from "../../../assets/picture.svg";

const ImagesUploader = ({ images, handleFormChange }) => {
  const totalImages = 3;

  // 이미지 업로드 핸들러
  const handleUploadFile = (e, index) => {
    const file = e.target.files[0]; // 파일 가져오기

    if (file && file.type.startsWith("image/")) {
      const updatedImages = images.map((image, i) =>
        i === index ? file : image
      );
      handleFormChange("images", updatedImages);
    }
  };

  // 파일 객체 URL 변환
  const getPreview = (file) => {
    return file instanceof File ? URL.createObjectURL(file) : file;
  };

  return (
    <Container>
      {Array.from({ length: totalImages }, (_, index) => (
        <div key={index}>
          <Rectangle htmlFor={`image-${index}`}>
            {images[index] === null && <PictureIcon />}
            {images[index] && (
              <img src={getPreview(images[index])} alt={`class-${index}`} />
            )}
          </Rectangle>
          <HiddenInput
            type="file"
            id={`image-${index}`}
            accept="image/*"
            onChange={(e) => handleUploadFile(e, index)}
          ></HiddenInput>
        </div>
      ))}
    </Container>
  );
};

export default ImagesUploader;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 13.5px;
  width: 627px;
  height: 200px;
  flex-shrink: 0;
  margin-top: 32px;
  margin-bottom: 63px;
`;
const Rectangle = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  height: 100%;
  border-radius: 7px;
  background: #d9d9d9;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover; // 비율 유지
  }
`;
const HiddenInput = styled.input`
  display: none;
`;
