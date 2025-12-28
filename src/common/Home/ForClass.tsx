import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { hashTagID } from '../../api/schema';
import { AllClassData, AllClassList } from '@/types/MainInterface';

type ForClassProps = {
  danceclass: AllClassData;
};

const ForClass = ({ danceclass }: ForClassProps) => {
  const navigate = useNavigate();

  const randomDance: AllClassList[] = danceclass?.danceClasses
    ? [...danceclass?.danceClasses].sort(() => 0.5 - Math.random()).slice(0, 4)
    : [];

  return (
    <ClassContainer>
      {randomDance?.map((Class) => (
        <ClassContent
          key={Class.id}
          onClick={() => navigate(`/classes/${Class.id}?tab=detail`)}
        >
          <ClassImage src={Class.thumbnailImage} alt="프로필 이미지" />
          <TextContainer>
            <ClassName>{Class.className}</ClassName>
            <ClassDancer>{Class.dancerName}</ClassDancer>
            <ClassDancer>{Class.genre}</ClassDancer>
            <ClassHashContainer>
              {Class.hashtagIds.map((HashtagID) => {
                const foundTag = hashTagID.find(
                  (tag) => tag.id === String(HashtagID)
                );
                return foundTag ? (
                  <ClassHashtag key={HashtagID}>
                    # {foundTag.hashTag}
                  </ClassHashtag>
                ) : null;
              })}
            </ClassHashContainer>
          </TextContainer>
        </ClassContent>
      ))}
    </ClassContainer>
  );
};

const ClassContainer = styled.div`
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 30px;

  ${({ theme }) => theme.media.desktop} {
    grid-template-columns: repeat(2, 1fr);
    gap: 50px 70px;

    max-width: 1400px;
  }
`;

const ClassContent = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: start;
  align-items: start;

  gap: 25px;
`;

const ClassImage = styled.img`
  display: block;
  flex-shrink: 0;

  width: 130px;
  height: 130px;
  min-width: 130px;
  min-height: 130px;

  background-color: white;

  border-radius: 6px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);

  cursor: pointer;

  object-fit: cover;
  object-position: center;
  overflow: hidden;

  ${({ theme }) => theme.media.tablet} {
    width: 200px;
    height: 200px;
    min-width: 200px;
    min-height: 200px;

    border-radius: 10px;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
  width: 100%;

  justify-content: center;

  min-width: 0;

  ${({ theme }) => theme.media.tablet} {
    gap: 10px;
  }
`;

const ClassName = styled.div`
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 3px;

  width: 100%;
  max-width: 250px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${({ theme }) => theme.media.tablet} {
    font-size: 24px;
    max-width: 500px;
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: 18px;
    max-width: 270px;
  }
`;

const ClassDancer = styled.div`
  color: #b2b2b2;
  font-size: 16px;
  font-weight: 400;
  line-height: 14px;

  margin-bottom: 5px;

  ${({ theme }) => theme.media.tablet} {
    font-size: 22px;
    font-weight: 400;
  }
`;

const ClassHashContainer = styled.div`
  color: #bf00ff;
  font-size: 14px;
  font-weight: 500;
  line-height: 32px;

  ${({ theme }) => theme.media.tablet} {
    font-size: 20px;
  }
`;

const ClassHashtag = styled.div`
  display: inline-block;
  padding-right: 10px;
`;

export default ForClass;
