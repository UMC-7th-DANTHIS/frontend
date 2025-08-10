import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { ReactComponent as VideoIcon } from '../../assets/video.svg';
import { ReactComponent as DeleteIcon } from '../../assets/shape/trash.svg';
import { UrlInput } from './Inputs';

import { ClassFormState, HandleFormChange } from '../../types/registration';
import usePostVideoPresigned from '../../hooks/registration/usePostVideoPresigned';
import useUploadToS3 from '../../hooks/registration/useUploadToS3';

interface VideoUplodaerProps {
  video: string;
  handleFormChange: HandleFormChange<ClassFormState>;
}

export const VideoUploader = ({ video, handleFormChange }: VideoUplodaerProps) => {
  const [fileUrl, setFileUrl] = useState<string>('');
  const [url, setUrl] = useState<string>('');

  const { mutateAsync: postVideoPresignedUrl } = usePostVideoPresigned();
  const { uploadToS3 } = useUploadToS3();

  useEffect(() => {
    handleFormChange('videoUrl', fileUrl || url);
  }, [fileUrl, url, handleFormChange]);

  // 비디오 업로드 핸들러
  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // 파일 가져오기
    if (!file || !file.type.startsWith('video/')) return;

    const presignedUrl = await postVideoPresignedUrl({ file });
    if (!presignedUrl) return;

    await uploadToS3(presignedUrl, file);
    setFileUrl(presignedUrl);

    e.target.value = ''; // 파일 선택 초기화
  };

  const getYoutubeEmbedUrl = (link: string) => {
    const match = link.match(
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/live\/)([\w-]{11})/
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
          {(video && video.includes('youtube.com')) || video.includes('youtu.be') ? (
            <Iframe src={getYoutubeEmbedUrl(video)} title="YouTube Video" allowFullScreen />
          ) : (
            video && <video src={video} controls />
          )}
        </Video>

        {/* 파일 선택 */}
        {!video && <HiddenInput type="file" id="video" accept="video/*" onChange={handleUploadFile} />}

        {/* 비디오가 업로드 된 상태에서만 삭제 버튼 표시 */}
        {video && (
          <Icon onClick={deleteVideo}>
            <DeleteIcon />
          </Icon>
        )}
      </Container>
      <UrlInput value={url} onChange={(e) => setUrl(e.target.value)} placeholder="동영상 링크를 붙여넣으세요." />
    </>
  );
};

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
