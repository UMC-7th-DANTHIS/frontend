import React from "react";
import styled from "styled-components";
import { ReactComponent as PictureIcon } from "../../../assets/picture.svg";

const ImagesUploader = ({ images, updateForm }) => {
  const totalImages = 3;

  return (
    <Container>
      {Array.from({ length: totalImages }, (_, index) => (
        <div key={index}>
          <Rectangle htmlFor="file">
            <PictureIcon />
          </Rectangle>
          <HiddenInput type="file" id="file" accept="image/*"></HiddenInput>
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
`;
const HiddenInput = styled.input`
  display: none;
`;
