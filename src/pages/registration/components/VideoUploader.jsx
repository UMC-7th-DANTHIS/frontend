import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { UrlInput } from './Inputs';
import { ReactComponent as VideoIcon } from '../../../assets/video.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/shape/trash.svg';
import api from '../../../api/api';

const VideoUploader = ({ video, handleFormChange }) => {
  const [fileUrl, setFileUrl] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    console.log('ok: ', fileUrl || url);
    handleFormChange('videoUrl', fileUrl || url);
  }, [fileUrl, url]);

  // Presigned URL 요청
  const getPresignedUrl = async (file) => {
    try {
      const fileExtension = file.name.split('.').pop(); // 파일 확장자
      const response = await api.post(
        `/video/dance-class?fileExtension=${fileExtension}`
      );
      return response.data?.presignedUrl || null; // Presigned URL 반환
    } catch (error) {
      console.error(
        '❌ Presigned URL 발급 실패:',
        error.response?.data || error.message
      );
      return null;
    }
  };

  // S3에 파일 업로드
  const uploadFileToS3 = async (presignedUrl, file) => {
    try {
      const uploadResponse = await fetch(presignedUrl, {
        method: 'PUT',
        body: file
      });
      if (!uploadResponse.ok) {
        throw new Error(`업로드 실패: ${uploadResponse.status}`);
      }
      return presignedUrl.split('?')[0]; // 업로드된 이미지 URL 반환
    } catch (error) {
      console.error('❌ 업로드 실패:', error.message);
      return null;
    }
  };

  // 비디오 업로드 핸들러
  const handleUploadFile = async (e) => {
    const file = e.target.files[0]; // 파일 가져오기
    if (!file || !file.type.startsWith('video/')) return;

    const presignedUrl = await getPresignedUrl(file);
    if (!presignedUrl) return;

    const uploadedVideoUrl = await uploadFileToS3(presignedUrl, file);
    if (uploadedVideoUrl) {
      setFileUrl(uploadedVideoUrl);
    }

    e.target.value = ''; // 파일 선택 초기화
  };

  // 유튜브 url 업로드
  const getYoutubeEmbedUrl = (link) => {
    const match = link.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/live\/)([\w-]{11})/
    );
    return match ? `https://www.youtube.com/embed/${match[1]}` : '';
  };

  // 비디오 삭제 핸들러
  const deleteVideo = () => {
    handleFormChange('videoUrl', '');
    setFileUrl('');
    setUrl('');
  };

  return (
    <>
      <Container>
        <Video htmlFor="video">
          {!video && <VideoIcon />}
          {(video && video.includes('youtube.com')) ||
          video.includes('youtu.be') ? (
            <Iframe
              src={getYoutubeEmbedUrl(video)}
              title="YouTube Video"
              allowFullScreen
            />
          ) : (
            video && <video src={video} controls />
          )}
        </Video>

        {/* 파일 선택 */}
        {!video && (
          <HiddenInput
            type="file"
            id="video"
            accept="video/*"
            onChange={handleUploadFile}
          />
        )}

        {/* 비디오가 업로드 된 상태에서만 삭제 버튼 표시 */}
        {video && (
          <Icon onClick={deleteVideo}>
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
  forced-color-adjust: none;
`;
const Video = styled.label`
  position: relative;
  height: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 7px;
  background: #d9d9d9;
  overflow: hidden;
  cursor: pointer;
  forced-color-adjust: none;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover; // 비율 유지
  }
`;
const Iframe = styled.iframe`
  position: absolute;
  top: -1;
  left: -1;
  width: 100%;
  height: 100%;
`;
const HiddenInput = styled.input`
  display: none;
`;
const Icon = styled.div`
  position: absolute;
  top: 214px;
  left: 278px;
  cursor: pointer;
  pointer-events: auto; // 포커스 가능하도록 설정
  forced-color-adjust: none;
  &:focus {
    outline: none;
  }
  &[aria-hidden='true'] {
    display: none;
  }
`;
