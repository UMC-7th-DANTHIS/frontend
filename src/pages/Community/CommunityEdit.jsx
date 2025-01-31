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

export default CommunityEdit;
