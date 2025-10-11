import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
            <ClassDancer>{Class.favoriteGenres}</ClassDancer>
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
  padding: 0 20px;

  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 36px;

  ${({ theme }) => theme.media.tablet} {
    grid-template-columns: repeat(2, 1fr);
    gap: 110px;
  }
`;

const ClassContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
`;

const ClassImage = styled.img`
  display: inline-block;

  width: 130px;
  height: 130px;

  background-color: white;

  border-radius: 6px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);

  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
    opacity: 1;
  }

  ${({ theme }) => theme.media.tablet} {
    width: 200px;
    height: 200px;

    border-radius: 10px;
  }
`;

const TextContainer = styled.div`
  display: inline-block;
  flex-direction: column;
  align-content: center;
  gap: 5px;
`;

const ClassName = styled.div`
  color: #fff;
  font-size: 18px;
  font-weight: 600;

  ${({ theme }) => theme.media.tablet} {
    font-size: 24px;
  }
`;

const ClassDancer = styled.div`
  color: #b2b2b2;
  font-size: 16px;
  font-weight: 400;
  line-height: 28px;

  ${({ theme }) => theme.media.tablet} {
    font-size: 22px;
    font-weight: 600;
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
