import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { AllDancerData, AllDancerList } from '@/types/MainInterface';

type ForDancerProps = {
  dancer: AllDancerData;
};

const ForDancer = ({ dancer }: ForDancerProps) => {
  const navigate = useNavigate();

  const dancerData: AllDancerList[] = dancer?.dancers
    ? [...dancer?.dancers].sort(() => 0.5 - Math.random()).slice(0, 4)
    : [];

  return (
    <DancerContainer>
      {dancerData?.map((Dancer) => (
        <DancerContent onClick={() => navigate(`/dancerprofile/${Dancer.id}`)}>
          <DancerImage src={Dancer.images[0]} alt={'프로필 이미지'} />
          <DancerName>{Dancer.dancerName}</DancerName>
          {Dancer?.genres.map((gen) => <DancerGenre>{gen}</DancerGenre>)}
        </DancerContent>
      ))}
    </DancerContainer>
  );
};

const DancerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const DancerContent = styled.div`
  text-align: center;
`;

const DancerImage = styled.img`
  width: 200px;
  height: 271px;
  flex-shrink: 0;

  background-color: white;
  border-radius: 50%;
  margin-bottom: 50px;

  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
    opacity: 1;
  }
`;

const DancerName = styled.div`
  color: white;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const DancerGenre = styled.div`
  color: #b2b2b2;
  font-size: 20px;
  font-weight: 600;
`;

export default ForDancer;
