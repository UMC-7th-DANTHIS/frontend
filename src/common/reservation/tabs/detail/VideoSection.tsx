import styled, { css } from 'styled-components';

const YOUTUBE_REGEX =
  /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/live\/)([\w-]{11})/;
const INSTAGRAM_REGEX = /(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:p|reel|tv)\/([^/?#&]+)/;

interface VideoSectionProps {
  videoUrl: string;
}

export const VideoSection = ({ videoUrl }: VideoSectionProps) => {
  const getYoutubeEmbedUrl = (link: string) => {
    const match = link.match(YOUTUBE_REGEX);
    return match ? `https://www.youtube.com/embed/${match[1]}?rel=0&origin=https://www.danthis.site/` : '';
  };

  const getInstagramEmbedUrl = (link: string) => {
    const match = link.match(INSTAGRAM_REGEX);
    return match ? `https://www.instagram.com/p/${match[1]}/embed` : '';
  };

  const isYoutube = YOUTUBE_REGEX.test(videoUrl);
  const isInstagram = INSTAGRAM_REGEX.test(videoUrl);

  return (
    <Video $isInstagram={isInstagram}>
      <VideoInner>
        {isYoutube ? (
          <iframe
            id="ytplayer"
            title="클래스 소개 영상"
            width="1024"
            height="560"
            src={getYoutubeEmbedUrl(videoUrl)}
            allowFullScreen
          />
        ) : isInstagram ? (
          <iframe
            title="인스타그램 영상"
            width="100%"
            height="100%"
            src={getInstagramEmbedUrl(videoUrl)}
            sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
          />
        ) : (
          <video src={videoUrl} controls />
        )}
      </VideoInner>
    </Video>
  );
};

const Video = styled.div<{ $isInstagram: boolean }>`
  width: 100%;
  border-radius: 3px;
  overflow: hidden;
  margin: 0 auto;

  ${({ $isInstagram }) =>
    $isInstagram
      ? css`
          max-width: 400px;
          aspect-ratio: 9 / 16;
        `
      : css`
          max-width: 896px;
          aspect-ratio: 64 / 35;
        `}
`;

const VideoInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  iframe,
  video {
    width: 100%;
    height: 100%;
    border: none;
    object-fit: cover;
  }
`;
