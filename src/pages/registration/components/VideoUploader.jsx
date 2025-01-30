import React, { useState } from 'react';
import styled from 'styled-components';
import { UrlInput } from './Inputs';
import { ReactComponent as VideoIcon } from '../../../assets/video.svg';

const VideoUploader = ({ video, handleFormChange }) => {
  const [preview, setPreview] = useState(''); // 미리보기 url
  const [url, setUrl] = useState('');

  // 파일 업로드 핸들러
  const handleUploadFile = (e) => {
    const file = e.target.files[0]; // 파일 가져오기

    if (file && file.type.startsWith('video/')) {
      handleFormChange('video', file);
      setPreview(URL.createObjectURL(file)); // 미리보기 url 생성
    }
  };

  // url 업로드 핸들러
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  return (
    <>
      <Container>
        <Rectangle htmlFor="video">
          {video === null && <VideoIcon />}
          {preview && <video src={preview} controls />}
        </Rectangle>
        {/* 파일 선택 */}
        <HiddenInput
          type="file"
          id="video"
          accept="video/*"
          onChange={handleUploadFile}
        />
      </Container>
      <UrlInput
        value={url}
        onChange={(e) => handleUrlChange(e)}
        placeholder="동영상 링크를 붙여넣으세요."
      />
    </>
  );
};

export default VideoUploader;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 589px;
  height: 200px;
  flex-shrink: 0;
  margin-top: 25px;
  margin-bottom: 46px;
`;
const Rectangle = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  border-radius: 7px;
  background: #d9d9d9;
  overflow: hidden;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover; // 비율 유지
  }

  &:hover {
    cursor: pointer;
  }
`;
const HiddenInput = styled.input`
  display: none;
`;
