import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import EditFooter from '../../components/Comunity/EditFooter';
import EditContent from '../../components/Comunity/EditContent';

const MAX_IMAGES = 4;

const CommunityEdit = () => {
  const location = useLocation();
  const { selectedPost } = location.state || {};

  const [fileName, setFileName] = useState([]);
  const [previews, setPreviews] = useState([]);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const availableSlots = MAX_IMAGES - previews.length;
    const newImageURLs = files
      .slice(0, availableSlots)
      .map((file) => URL.createObjectURL(file));

    setPreviews((prev) => [...prev, ...newImageURLs]);
    setFileName((prev) => [
      ...prev,
      ...files.map((_, idx) => `uploaded-image-${idx + 1}`)
    ]);
  };

  return (
    <Container>
      <ContentContainer>
        <TopHeader>커뮤니티 글 작성</TopHeader>
        <InfoContainer>
          <InfoText>*제목은 최대 50자까지 입력 가능합니다.</InfoText>
        </InfoContainer>
        <InfoContainer>
          <InfoText>*내용은 최대 1000자까지 입력 가능합니다.</InfoText>
        </InfoContainer>
        <EditContent
          fileName={fileName}
          setFileName={setFileName}
          previews={previews}
          setPreviews={setPreviews}
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          selectedPost={selectedPost}
        />
        <EditFooter handleFileChange={handleFileChange} />
      </ContentContainer>
    </Container>
  );
};

const Container = styled.div`
  background-color: #000000;
  padding-bottom: 100px;
`;

const TopHeader = styled.div`
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  color: white;

  margin-left: 55px;
  margin-right: 800px;
`;

const ContentContainer = styled.div`
  margin-left: 235px;
  margin-right: 205px;
  height: 100%;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const InfoText = styled.div`
  color: #b2b2b2;
  font-size: 14px;
`;

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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 21px;
  margin-left: 40px;
  margin-right: 14px;
`;

const ImageInput = styled.label`
  display: inline-block;
  background-color: transparent;
  border: 2px solid #9819c3;
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-align: center;

  &:hover {
    background-color: #9819c3;
    color: #fff;
  }

  input[type='file'] {
    display: none;
  }
`;

const RightButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const CancelButton = styled.button`
  background-color: transparent;
  border: 2px solid #9819c3;
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;

  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  &:hover {
    background-color: #9819c3;
    color: #fff;
  }
`;

const SubmitButton = styled.button`
  background-color: #9819c3;
  border: none;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;

  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  &:hover {
    background-color: #7c16a6;
  }
`;

const CatuionContainer = styled.div`
  margin-left: 40px;
  margin-top: 20px;

  color: white;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const CautionText = styled.div`
  margin-bottom: 5px;
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

const PreviewImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin: 10px;
  border-radius: 5px;
  border: 2px solid #9819c3;
`;

export default CommunityEdit;
