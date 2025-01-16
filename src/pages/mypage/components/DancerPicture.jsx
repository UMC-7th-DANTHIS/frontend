import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as PlusButton } from "../../../assets/buttons/plus-button.svg";

const DancerPicture = () => {
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length <= 4) {
      setImages([...images, ...files]);
    } else {
      alert('최대 4장까지만 등록 가능합니다.');
    }
  };

  return (
    <Container>
      <Example imagesExist={images.length > 0}>
        <ContentContainer>
          {images.map((image, index) => (
            <PreviewContainer key={index}>
              <PreviewImage
                src={URL.createObjectURL(image)}
                alt={`preview-${index}`}
              />
            </PreviewContainer>
          ))}

          <IconContainer>
            <PlusIconContainer>
              <input
                type="file"
                accept="image/*"
                multiple
                style={{ display: 'none' }}
                onChange={handleImageChange}
                id="fileInput"
              />
              <PlusButton onClick={() => document.getElementById('fileInput').click()} />
            </PlusIconContainer>
          </IconContainer>
        </ContentContainer>
      </Example>
    </Container>
  );
};

export default DancerPicture;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Example = styled.div`
  display: flex;
  margin-top: ${(props) => (props.imagesExist ? '30px' : '0')};
`;

const ContentContainer = styled.div`
  display: flex;
  gap: 9px;
`;

const IconContainer = styled.div`
  margin-left: 35px;
`;

const PlusIconContainer = styled.div`
  display: flex;
  cursor: pointer;
  margin-top: 30px;
`;

const PreviewContainer = styled.div`
  position: relative;
  width: 140px;
  height: 140px;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 7px;
`;
