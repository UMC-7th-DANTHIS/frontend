import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { ReactComponent as VideoIcon } from '../../../../assets/video.svg';
import { ReactComponent as DeleteIcon } from '../../../../assets/shape/trash.svg';
import { UrlInput } from '../../../../components/FormInputs';

import { ClassFormState, HandleFormChange } from '@/types/registration';
import usePostVideoPresigned from '../../../../hooks/registration/usePostVideoPresigned';
import useUploadToS3 from '../../../../hooks/registration/useUploadToS3';
import useIsMobile from '../../../../hooks/useIsMobile';

const YOUTUBE_REGEX =
  /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/live\/)([\w-]{11})/;
const INSTAGRAM_REGEX = /(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:p|reel|tv)\/([^/?#&]+)/;

interface VideoUplodaerProps {
  video: string;
  handleFormChange: HandleFormChange<ClassFormState>;
  setVideoValid: (isValid: boolean) => void;
}

export const VideoUploader = ({ video, handleFormChange, setVideoValid }: VideoUplodaerProps) => {
  const [fileUrl, setFileUrl] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [localPreview, setLocalPreview] = useState<string>('');
  const [isValidUrl, setIsValidUrl] = useState(true);

  const isMobile = useIsMobile();

  const { mutateAsync: postVideoPresignedUrl } = usePostVideoPresigned();
  const { uploadToS3 } = useUploadToS3();

  useEffect(() => {
    if (fileUrl) {
      handleFormChange('videoUrl', fileUrl);
      setIsValidUrl(true);
      setVideoValid(true);
      return;
    }

    if (!url) {
      handleFormChange('videoUrl', '');
      setIsValidUrl(true);
      setVideoValid(true);
      return;
    }

    const isYoutube = YOUTUBE_REGEX.test(url);
    const isInstagram = INSTAGRAM_REGEX.test(url);

    if (isYoutube || isInstagram) {
      handleFormChange('videoUrl', url);
      setIsValidUrl(true);
      setVideoValid(true);
    } else {
      handleFormChange('videoUrl', '');
      setIsValidUrl(false);
      setVideoValid(false);
    }
  }, [fileUrl, url, handleFormChange, setVideoValid]);

  // 비디오 업로드 핸들러
  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('video/')) return;

    const previewUrl = URL.createObjectURL(file);
    setLocalPreview(previewUrl);
    setIsUploading(true);
    setUrl('');

    try {
      const result = await postVideoPresignedUrl({ file });
      if (!result) return;

      await uploadToS3(result.presignedUrl, file);
      setFileUrl(result.fileUrl);
    } finally {
      setIsUploading(false);
    }

    e.target.value = '';
  };

  const getYoutubeEmbedUrl = (link: string) => {
    const match = link.match(YOUTUBE_REGEX);
    return match ? `https://www.youtube.com/embed/${match[1]}` : '';
  };

  const getInstagramEmbedUrl = (link: string) => {
    const match = link.match(INSTAGRAM_REGEX);
    return match ? `https://www.instagram.com/p/${match[1]}/embed` : '';
  };

  // 비디오 삭제 핸들러
  const deleteVideo = () => {
    handleFormChange('videoUrl', '');
    setFileUrl('');
    setLocalPreview('');
    setUrl('');
    setIsValidUrl(true);
    setVideoValid(true);
  };

  const displayVideo = fileUrl || localPreview || video;

  useEffect(() => {
    return () => {
      if (localPreview) URL.revokeObjectURL(localPreview);
    };
  }, [localPreview]);

  return (
    <Container>
      <VideoInputWrapper>
        <Video htmlFor="video">
          {!displayVideo && <VideoIcon width={isMobile ? '30px' : '48px'} />}

          {displayVideo && (
            <>
              {YOUTUBE_REGEX.test(displayVideo) ? (
                <Iframe src={getYoutubeEmbedUrl(displayVideo)} title="YouTube Video" allowFullScreen />
              ) : INSTAGRAM_REGEX.test(displayVideo) ? (
                <Iframe
                  src={getInstagramEmbedUrl(displayVideo)}
                  title="Instagram Video"
                  sandbox="allow-scripts allow-same-origin allow-popups"
                />
              ) : (
                <video src={displayVideo} controls />
              )}
            </>
          )}

          {isUploading && <LoadingOverlay>업로드 중...</LoadingOverlay>}
        </Video>

        {/* 파일 선택 */}
        {!displayVideo && <HiddenInput type="file" id="video" accept="video/*" onChange={handleUploadFile} />}

        {/* 삭제 버튼 */}
        {displayVideo && !isUploading && (
          <Icon onClick={deleteVideo}>
            <DeleteIcon />
          </Icon>
        )}
      </VideoInputWrapper>

      <UrlInputWrapper>
        <UrlInput value={url} onChange={(e) => setUrl(e.target.value)} placeholder="동영상 링크를 붙여넣으세요." />
        {!isValidUrl && <ErrorMessage>Youtube 또는 Instagram 링크만 등록 가능합니다.</ErrorMessage>}
      </UrlInputWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 55px;
`;
const UrlInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  gap: 6px;
`;
const VideoInputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  flex-shrink: 0;
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
  height: 100px;
  border: none;
  border-radius: 7px;
  background: #d9d9d9;
  overflow: hidden;
  cursor: pointer;
  forced-color-adjust: none;

  ${({ theme }) => theme.media.desktop} {
    height: 200px;
  }

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const Iframe = styled.iframe`
  position: absolute;
  top: -1;
  left: -1;
  width: 103%;
  height: 104%;

  ${({ theme }) => theme.media.desktop} {
    width: 101%;
    height: 102%;
  }
`;
const HiddenInput = styled.input`
  display: none;
`;
const Icon = styled.div`
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  pointer-events: auto;
  forced-color-adjust: none;
  &:focus {
    outline: none;
  }
  &[aria-hidden='true'] {
    display: none;
  }
`;
const LoadingOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  z-index: 2;
`;
const ErrorMessage = styled.span`
  color: var(--highlight-red);
  font-size: 12px;
  padding-right: 4px;
`;
