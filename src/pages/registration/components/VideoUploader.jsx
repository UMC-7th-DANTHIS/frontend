import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { UrlInput } from './Inputs';
import { ReactComponent as VideoIcon } from '../../../assets/video.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/shape/trash.svg';

const VideoUploader = ({ video, handleFormChange }) => {
  const [fileUrl, setFileUrl] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    handleFormChange('videoUrl', fileUrl);
  }, [fileUrl]);

  useEffect(() => {
    handleFormChange('videoUrl', url);
  }, [url]);

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // 파일 가져오기

    if (file && file.type.startsWith('video/')) {
      setFileUrl(URL.createObjectURL(file)); // 미리보기 url 생성
    }

    e.target.value = '';
  };

  // 비디오 삭제 핸들러
  const deleteVideo = () => {
    handleFormChange('videoUrl', '');

    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
      setFileUrl('');
    }
    setUrl('');
  };

  return (
    <>
      <Container>
        <Rectangle htmlFor="video">
          {video === '' && <VideoIcon />}
          {video && <video src={video} controls />}
        </Rectangle>
        {/* 파일 선택 */}
        <HiddenInput
          type="file"
          id="video"
          accept="video/*"
          onChange={handleFileChange}
        />
        {/* 비디오가 업로드 된 상태에서만 삭제 버튼 표시 */}
        {video && (
          <Icon onClick={() => deleteVideo()}>
            <DeleteIcon />
          </Icon>
        )}
      </Container>
      <UrlInput
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="동영상 링크를 붙여넣으세요."
      />
    </>
  );
};

export default VideoUploader;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 589px;
  height: 200px;
  flex-shrink: 0;
  margin-top: 25px;
  margin-bottom: 60px;
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
const Icon = styled.div`
  position: absolute;
  top: 214px;
  left: 278px;
  cursor: pointer;
`;
