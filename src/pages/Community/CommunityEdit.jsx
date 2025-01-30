import React, { useState } from 'react';
import styled from 'styled-components';
import EditFooter from '../../components/Comunity/EditFooter';
import EditContent from '../../components/Comunity/EditContent';

const CommunityEdit = () => {
  const [fileName, setFileName] = useState('');
  const [previews, setPreviews] = useState([]);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const previewUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews(previewUrls);
    setFileName(selectedFiles);
  };

  return (
    <Container>
      <ContentContainer>
        <TopHeader>커뮤니티 글 작성</TopHeader>
        <EditContent
          fileName={fileName}
          previews={previews}
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
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
