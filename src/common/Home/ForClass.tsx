import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { hashTagID, hashTagIDInterface } from '../../api/schema';
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
        <ClassContent onClick={() => navigate(`/classes/${Class.id}?tab=detail`)}>
          <ClassImage src={Class.thumbnailImage} alt={'프로필 이미지'} />
          <TextContainer>
            <ClassName>{Class.className}</ClassName>
            <ClassDancer>{Class.dancerName}</ClassDancer>
            <ClassDancer>{Class.favoriteGenres}</ClassDancer>
            <ClassHashContainer>
              {Class.hashtagIds.map((HashtagID) => {
                const foundTag: hashTagIDInterface | undefined = hashTagID.find((tag) => tag.id === String(HashtagID));
                return foundTag ? <ClassHashtag key={HashtagID}># {foundTag.hashTag}</ClassHashtag> : null;
              })}
            </ClassHashContainer>
          </TextContainer>
        </ClassContent>
      ))}
    </ClassContainer>
  );
};

const ClassContainer = styled.div``;

const ClassContent = styled.div`
  display: inline-flex;
  flex-direction: row;
  width: 620px;
  height: 200px;

  margin-bottom: 113px;
`;

const ClassImage = styled.img`
  display: inline-block;
  width: 200px;
  height: 200px;
  background-color: white;

  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
    opacity: 1;
  }

  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
`;

const TextContainer = styled.div`
  display: inline-block;
  flex-direction: column;
  padding-left: 30px;
  align-content: center;

  height: 200px;
`;

const ClassName = styled.div`
  color: #fff;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 15px;
`;

const ClassDancer = styled.div`
  color: #b2b2b2;
  font-size: 22px;
  font-weight: 600;
  line-height: 28px;
`;

const ClassHashContainer = styled.div`
  padding-top: 5px;

  color: #bf00ff;
  font-size: 22px;
  font-weight: 500;
  line-height: 32px;
`;

const ClassHashtag = styled.div`
  display: inline-block;
  padding-right: 10px;
`;

export default ForClass;
