import React, { useState } from 'react';
import { useLocation, useOutletContext, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import EditFooter from '../../components/Comunity/EditFooter';
import EditContent from '../../components/Comunity/EditContent';

import axiosInstance from '../../api/axios-instance';

import { SinglePostData } from '@/types/CommunityInterface';

const MAX_IMAGES = 4;

interface PostPutReload {
  setForceReload: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommunityPut = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedPost = (location.state as SinglePostData) || {};
  const { setForceReload } = useOutletContext<PostPutReload>();

  const [fileName, setFileName] = useState<string[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [fileObjects, setFileObjects] = useState<string[]>([]);

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const handleFileChange = (event: any) => {
    const files: string[] = Array.from(event.target.files);
    const availableSlots: number = MAX_IMAGES - previews.length;

    const newImageFiles: string[] = files.slice(0, availableSlots);
    const newImageURLs: string[] = newImageFiles.map((file: any) =>
      URL.createObjectURL(file)
    );

    // files Interface 찾기
    setPreviews((prev: string[]) => [...prev, ...newImageURLs]);
    setFileObjects((prev: string[]) => [...prev, ...newImageFiles]);
    setFileName((prev: string[]) => [
      ...prev,
      ...newImageFiles.map((file: any) => {
        const array = new Uint32Array(4);
        window.crypto.getRandomValues(array);
        const hash: string = Array.from(array, (num: number) =>
          num.toString(16)
        ).join('');
        const extension: string = file.name.split('.').pop();
        return `${hash}.${extension}`;
      })
    ]);
  };

  // Overriding
  const createPost = async (
    title: string,
    content: string,
    uploadedImageUrls: string[]
  ) => {
    const postData = {
      title,
      content,
      images: uploadedImageUrls
    };

    try {
      await axiosInstance.put(
        `/community/posts/${selectedPost.postId}`,
        postData
      );
      setForceReload((prev: boolean) => !prev);
      navigate('/community');
    } catch (error) {
      alert('게시글 수정 실패');
    }
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
          fileObjects={fileObjects}
          setForceReload={setForceReload}
          createPost={createPost}
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

export default CommunityPut;
