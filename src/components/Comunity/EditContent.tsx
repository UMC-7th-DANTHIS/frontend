import React, { useEffect } from 'react';
import styled from 'styled-components';

import Close from '../../assets/buttons/CloseButton.svg';

const EditContent = ({
  setFileName,
  previews,
  setPreviews,
  title,
  setTitle,
  content,
  setContent,
  selectedPost
}) => {
  useEffect(() => {
    if (selectedPost) {
      setTitle(selectedPost.title || '');
      setContent(selectedPost.content || '');
      setFileName(
        selectedPost.images
          ? selectedPost.images.map((_, idx) => `image-${idx + 1}`)
          : []
      );
      setPreviews(selectedPost.images || []);
    }
  }, [selectedPost, setTitle, setContent, setFileName, setPreviews]);

  const handleRemoveImage = (index) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Content>
      <TitleArea>
        <ContentTitle>제목</ContentTitle>
        <TitleInput
          placeholder="제목을 입력하세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={50}
        />
      </TitleArea>
      <ContentArea>
        <ContentMain>내용</ContentMain>
        <ContentInput
          placeholder="내용을 입력하세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={1000}
        />
      </ContentArea>
      {previews.length > 0 && (
        <ImageContainer>
          {previews.map((src, index) => (
            <ImageWrapper key={index}>
              <CloseButton
                src={Close}
                onClick={() => handleRemoveImage(index)}
              />
              <Image src={src} alt={`preview-${index}`} />
            </ImageWrapper>
          ))}
        </ImageContainer>
      )}
    </Content>
  );
};

const Content = styled.div`
  margin-top: 10px;
  padding-left: 50px;
  padding-right: 50px;
  border: 2px solid #9819c3;
  border-radius: 10px;

  width: 900px;
  height: 100%;
`;

const ContentTitle = styled.div`
  color: #fff;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const TitleArea = styled.div`
  display: flex;
  justify-content: space-between;

  border-bottom: 1.5px solid #b2b2b2;

  padding-top: 21px;
  padding-bottom: 14px;
  padding-left: 9px;
`;

const TitleInput = styled.input`
  border: transparent;
  background-color: transparent;
  outline: none;

  color: white;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &::placeholder {
    color: #4d4d4d;
    font-size: 14px;
  }

  width: 92%;
  height: 100%;
`;

const ContentArea = styled.div`
  display: flex;
  justify-content: space-between;

  padding-top: 15px;
  margin-bottom: 49px;
  padding-left: 9px;

  display: flex;
`;

const ContentInput = styled.textarea`
  background-color: transparent;
  border: transparent;
  resize: none;
  outline: none;

  color: white;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &::placeholder {
    color: #4d4d4d;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  width: 92%;
  height: 390px;
`;

const ContentMain = styled.div`
  color: #fff;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-left: 20px;
  margin-bottom: 46px;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 7px;
  object-fit: cover;
`;

const CloseButton = styled.img`
  position: absolute;
  top: -10px;
  right: -10px;
  border: none;
  width: 27px;
  height: 27px;
  cursor: pointer;
`;

export default EditContent;
