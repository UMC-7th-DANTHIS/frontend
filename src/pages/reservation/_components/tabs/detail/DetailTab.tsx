import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Speaker } from '../../../../../assets/emoji/speaker.svg';
import { ReactComponent as ThumbsUp } from '../../../../../assets/emoji/thumbsup.svg';
import { hashTagID } from '../../../../../api/schema';
import { DanceClass } from '../../../../../types/ClassInterface';

interface DetailTabProps {
  classData: DanceClass | null;
}

const DetailTab = ({ classData }: DetailTabProps) => {
  const getYoutubeEmbedUrl = (link: string) => {
    const match = link.match(
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/live\/)([\w-]{11})/
    );
    return match ? `https://www.youtube.com/embed/${match[1]}` : '';
  };

  return (
    <Container>
      <Video>
        {(classData?.details.videoUrl &&
          classData?.details.videoUrl.includes('youtube.com')) ||
        classData?.details.videoUrl.includes('youtu.be') ? (
          <Iframe
            src={getYoutubeEmbedUrl(classData?.details.videoUrl)}
            title="YouTube Video"
            allowFullScreen
          />
        ) : (
          classData?.details.videoUrl && (
            <video src={classData?.details.videoUrl} controls />
          )
        )}
      </Video>
      <Section>
        <Title>
          <Emoji>
            <Speaker />
          </Emoji>
          수업 소개
        </Title>
        <Text>{classData?.details.description}</Text>
      </Section>
      <Section>
        <Title>
          <Emoji>
            <ThumbsUp />
          </Emoji>
          이 수업은 이런 분들에게 추천해요!
        </Title>
        <Text>{classData?.details.targetAudience}</Text>
        <Tags>
          {classData?.details.hashtags.map((tag) => {
            const tagName = hashTagID.find(
              (t) => Number(t.id) === tag
            )?.hashTag;
            return tagName ? <Tag key={tag}>#{tagName}</Tag> : null;
          })}
        </Tags>
      </Section>
      <Section>
        <Title>수업 사진</Title>
        <Images>
          {classData?.details.danceClassImages[0] === '' ? (
            <Image
              src={classData.dancer?.profileImage}
              alt={`dancer profile of class #${classData?.id}`}
            />
          ) : (
            classData?.details.danceClassImages.map(
              (image, index) =>
                image && (
                  <Image key={index} src={image} alt={`class #${index}`} />
                )
            )
          )}
        </Images>
      </Section>
      <Section>
        <MoreAboutDancer to={`/dancerprofile/${classData?.details.dancerId}`}>
          {classData?.dancer.name} 댄서에 대해 더 알고싶다면?
        </MoreAboutDancer>
      </Section>
    </Container>
  );
};

export default DetailTab;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1240px;
  padding: 77px 108px;
`;
const Video = styled.div`
  position: relative;
  width: 1024px;
  height: 560px;
  margin-bottom: 50px;
  border: none;
  border-radius: 3px;
  overflow: hidden;
  background: url(<path-to-image>) lightgray 50% / cover no-repeat;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover; // 비율 유지
  }
`;
const Iframe = styled.iframe`
  position: absolute;
  top: -1px;
  left: -1px;
  width: 100%;
  height: 100%;
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 1240px;
  padding: 50px;
  white-space: pre-line;
`;
const Title = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  color: var(--main_white, #fff);
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 50px;
  letter-spacing: -1.6px;
`;
const Emoji = styled.span`
  margin-top: 5px;
`;
const Text = styled.div`
  color: var(--main_white, #fff);
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 50px;
  letter-spacing: -1.2px;
`;
const Tags = styled.div`
  margin: 18px 0;
`;
const Tag = styled.div`
  display: inline-flex;
  padding: 4px 38px;
  justify-content: center;
  align-items: center;
  margin-right: 28px;
  border-radius: 80px;
  border: 2px solid var(--text_purple, #bf00ff);

  color: var(--main_white, #fff);
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 50px; /* 208.333% */
  letter-spacing: -1.2px;
`;
const Images = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 1240px;
  margin-top: 21px;
  gap: 20px;
`;
const Image = styled.img`
  width: 400px;
  height: 400px;
  border-radius: 10px;
  background: url(<path-to-image>) lightgray 50% / cover no-repeat;
  object-fit: cover; // 비율 유지
`;
const MoreAboutDancer = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 448px;
  height: 60px;
  text-decoration-line: none;
  border-radius: 15px;
  background: var(--main_purple, #9819c3);

  color: var(--main_white, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  &:hover {
    cursor: pointer;
  }
`;
