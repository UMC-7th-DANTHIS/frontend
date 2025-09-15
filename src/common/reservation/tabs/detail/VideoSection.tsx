import styled from 'styled-components';

interface VideoSectionProps {
  videoUrl: string;
}

export const VideoSection = ({ videoUrl }: VideoSectionProps) => {
  const getYoutubeEmbedUrl = (link: string) => {
    const match = link.match(
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/live\/)([\w-]{11})/
    );
    return match ? `https://www.youtube.com/embed/${match[1]}?rel=0&origin=https://www.danthis.site/` : '';
  };

  return (
    <Video>
      <VideoInner>
        {videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be') ? (
          <iframe id="ytplayer" title="클래스 소개 영상" width="1024" height="560" src={getYoutubeEmbedUrl(videoUrl)} />
        ) : (
          <video src={videoUrl} controls />
        )}
      </VideoInner>
    </Video>
  );
};

const Video = styled.div`
  width: 100%;
  max-width: 896px;
  aspect-ratio: 64 / 35;
  border-radius: 3px;
  overflow: hidden;
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
