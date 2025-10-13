import React, { useState } from 'react';
import { useLocation, useOutletContext, useNavigate } from 'react-router-dom';
import * as S from './styled';

import EditFooter from '../../../common/Comunity/EditFooter';
import EditContent from '../../../common/Comunity/EditContent';

import axiosInstance from '../../../api/axios-instance';
import { SinglePostData } from '@/types/CommunityInterface';

const MAX_IMAGES: number = 4;

interface PostEditReload {
  setForceReload: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CommunityEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedPost = (location.state as SinglePostData) || {};
  const { setForceReload } = useOutletContext<PostEditReload>();

  const [fileName, setFileName] = useState<string[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [fileObjects, setFileObjects] = useState<File[]>([]);

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;
    const availableSlots: number = MAX_IMAGES - previews.length;

    const newImageFiles: File[] = Array.from(files!).slice(0, availableSlots);

    const newImageURLs: string[] = newImageFiles.map((file) =>
      URL.createObjectURL(file)
    );

    setPreviews((prev: string[]) => [...prev, ...newImageURLs]);
    setFileObjects((prev: File[]) => [...prev, ...newImageFiles]);
    setFileName((prev: string[]) => [
      ...prev,
      ...newImageFiles.map((file: any) => {
        const array: any = new Uint32Array(4);
        window.crypto.getRandomValues(array);
        const hash: string = Array.from(array, (num: number) =>
          num.toString(16)
        ).join('');
        const extension: string = file.name.split('.').pop();
        return `${hash}.${extension}`;
      })
    ]);
  };

  const createPost = async (
    title: string,
    content: string,
    uploadedImageUrls: string[]
  ): Promise<void> => {
    const postData = {
      title,
      content,
      images: uploadedImageUrls
    };

    try {
      await axiosInstance.post(`/community/posts`, postData);
      setForceReload((prev) => !prev);
      navigate('/community');
    } catch (error) {
      alert('게시글 작성 실패');
    }
  };

  return (
    <S.Container>
      <S.ContentContainer>
        <S.TopHeader>커뮤니티 글 작성</S.TopHeader>
        <S.InfoContainer>
          <S.InfoText>*제목은 최대 50자까지 입력 가능합니다.</S.InfoText>
        </S.InfoContainer>
        <S.InfoContainer>
          <S.InfoText>*내용은 최대 1000자까지 입력 가능합니다.</S.InfoText>
        </S.InfoContainer>
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
      </S.ContentContainer>
    </S.Container>
  );
};
