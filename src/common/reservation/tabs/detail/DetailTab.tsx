import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Speaker } from '../../../../assets/emoji/speaker.svg';
import { ReactComponent as ThumbsUp } from '../../../../assets/emoji/thumbsup.svg';
import { ReactComponent as Cursor } from '../../../../assets/reservation/Cursor.svg';
import { hashTagID } from '../../../../api/schema';
import { DanceClassDetail } from '../../../../types/class';
import { DetailSection } from './DetailSection';
import useIsMobile from '../../../../hooks/useIsMobile';
import { VideoSection } from './VideoSection';
import { ImagesSection } from './ImageSection';

interface DetailTabProps {
  classData: DanceClassDetail;
}

export const DetailTab = ({ classData }: DetailTabProps) => {
  const isMobile = useIsMobile();

  return (
    <Container>
      {/* 수업 영상 */}
      <VideoSection videoUrl={classData.details.videoUrl} />
      {/* 소개글 */}
      <DetailSection title="수업 소개" icon={<Speaker width={isMobile ? 24 : 30} />}>
        <Text>{classData.details.description}</Text>
      </DetailSection>
      {/* 추천 대상 */}
      <DetailSection title="이 수업은 이런 분들에게 추천해요!" icon={<ThumbsUp width={isMobile ? 24 : 30} />}>
        <Text>{classData.details.targetAudience}</Text>
        <Tags>
          {classData.details.hashtags.map((tag) => {
            const tagName = hashTagID.find((t) => Number(t.id) === tag)?.hashTag;
            return tagName ? <Tag key={tag}>#{tagName}</Tag> : null;
          })}
        </Tags>
      </DetailSection>
      {/* 수업 사진 */}
      <DetailSection title="수업 사진">
        <ImagesSection images={classData.details.danceClassImages} profileImage={classData.dancer?.profileImage} />
      </DetailSection>

      <ButtonWrapper>
        <MoreAboutDancer to={`/dancerprofile/${classData.details.dancerId}`}>
          {classData.dancer.name} 댄서에 대해 더 알고싶다면?{' '}
          <span>
            <Cursor />
          </span>
        </MoreAboutDancer>
      </ButtonWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 43px 28px;
  gap: 50px;

  ${({ theme }) => theme.media.desktop} {
    padding: 78px 0;
    gap: 90px;
  }
`;
const Text = styled.div`
  color: var(--main-white);
  font-size: 12px;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.6px;

  ${({ theme }) => theme.media.tablet} {
    font-size: 18px;
    line-height: 40px;
    letter-spacing: -0.9px;
  }
`;
const Tags = styled.div`
  display: flex;
  margin-top: 12px;
  gap: 12px;

  ${({ theme }) => theme.media.tablet} {
    gap: 20px;
  }
`;
const Tag = styled.div`
  display: inline-flex;
  padding: 4px 10px;
  justify-content: center;
  align-items: center;
  border-radius: 80px;
  border: 1px solid var(--text-purple);

  color: var(--main-white);
  font-size: 10px;
  font-weight: 500;
  line-height: 140%;
  letter-spacing: -0.5px;

  ${({ theme }) => theme.media.tablet} {
    padding: 0 30px;
    font-size: 16px;
    line-height: 36px;
    letter-spacing: -0.8px;
  }
`;
const ButtonWrapper = styled.div`
  width: 100%;
  justify-content: flex-start;
  white-space: pre-line;
`;
const MoreAboutDancer = styled(Link)`
  padding: 10px 48px;
  border-radius: 10px;
  border: 1px solid var(--main-white);
  background: var(--main-black);
  box-shadow: 0 0 14px 0 var(--main-white) inset;
  text-decoration-line: none;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--main-white);
  font-size: 12px;
  font-weight: 600;

  ${({ theme }) => theme.media.tablet} {
    padding: 15px 68px;
    border-radius: 15px;
    box-shadow: 0 0 20px 0 var(--main-white) inset;
    font-size: 18px;

    &:hover {
      border: 1px solid var(--main-purple);
      box-shadow: 0 0 20px 0 var(--main-purple) inset;
    }
  }

  span {
    display: inline-block;
    padding-bottom: 3px;
    transform: rotate(162deg);

    ${({ theme }) => theme.media.tablet} {
      padding: 0;
    }
  }
`;
