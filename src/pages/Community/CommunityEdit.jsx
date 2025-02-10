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
        <EditFooter
          handleFileChange={handleFileChange}
          title={title}
          content={content}
          fileName={fileName}
        />
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

export default CommunityEdit;
