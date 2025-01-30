import React from 'react';
import styled from 'styled-components';

const EditContent = ({ fileName, previews }) => {
  return (
    <Content>
      <TitleArea>
        <ContentTitle>제목</ContentTitle>
        <TitleInput placeholder="제목을 입력하세요." />
      </TitleArea>
      <ContentArea>
        <ContentMain>내용</ContentMain>
        <ContentInput placeholder="내용을 입력하세요." />
      </ContentArea>
      {fileName.length > 0 && (
        <ImageContainer>
          {previews.map((src, index) => (
            <Image key={index} src={src} alt={`preview-${index}`} />
          ))}
        </ImageContainer>
      )}
    </Content>
  );
};

const Content = styled.div`
  margin-top: 44px;
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
  flex-direction: row;
  gap: 20px;
  margin-left: 20px;
  margin-bottom: 46px;

  width: 900px;
  height: 200px;
`;

const Image = styled.img`
  background-color: white;
  border-radius: 7px;
  width: 200px;
  height: 200px;
`;

export default EditContent;
