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
      <DancerWrapper>
        {dancerData?.map((Dancer) => (
          <DancerContent
            onClick={() => navigate(`/dancerprofile/${Dancer.id}`)}
          >
            <DancerImage src={Dancer.images[0]} alt={'프로필 이미지'} />
            <DancerName>{Dancer.dancerName}</DancerName>
            {Dancer?.genres.map((gen) => <DancerGenre>{gen}</DancerGenre>)}
          </DancerContent>
        ))}
      </DancerWrapper>
    </DancerContainer>
  );
};

const DancerContainer = styled.div`
  width: 100%;
  min-width: 0;

  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-x: contain;

  scroll-snap-type: x mandatory;
  padding: 0 20px;
  scroll-padding: 0 20px;

  display: block;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const DancerWrapper = styled.div`
  display: inline-flex;
  flex-wrap: nowrap;
  gap: 20px;
  width: max-content;
`;

const DancerContent = styled.div`
  flex: 0 0 auto;
  text-align: center;
  scroll-snap-align: start;
  scroll-snap-stop: always;
`;

const DancerImage = styled.img`
  width: 150px;
  height: 230px;
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

  ${({ theme }) => theme.media.tablet} {
    width: 200px;
    height: 271px;
  }
`;

const DancerName = styled.div`
  color: white;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 5px;

  ${({ theme }) => theme.media.tablet} {
    font-size: 24px;
    margin-bottom: 10px;
  }
`;

const DancerGenre = styled.div`
  color: #b2b2b2;
  font-size: 16px;
  font-weight: 600;

  ${({ theme }) => theme.media.tablet} {
    font-size: 20px;
  }
`;

export default ForDancer;
