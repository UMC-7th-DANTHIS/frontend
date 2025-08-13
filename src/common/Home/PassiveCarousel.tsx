import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { AllClassData } from '@/types/MainInterface';

type PassiveCarouselProps = {
  danceclass: AllClassData;
};

const PassiveCarousel = ({ danceclass }: PassiveCarouselProps) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleNext = (): void => {
    if (currentIndex < danceclass?.danceClasses.length - 4) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = (): void => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <SliderContainer>
      <ClickArea onClick={handlePrev} position="left" />
      <SlideWrapper currentIndex={currentIndex}>
        {danceclass?.danceClasses?.map((item, index) => (
          <HotImage
            onClick={() => navigate(`/classreservation/${item.id}?tab=detail`)}
            src={item.thumbnailImage}
            alt={'Image'}
            visible={index >= currentIndex && index < currentIndex + 4}
          />
        ))}
      </SlideWrapper>
      <ClickArea onClick={handleNext} position="right" />
    </SliderContainer>
  );
};

const SliderContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 58px;
  overflow: hidden;
`;

const SlideWrapper = styled.div<{ currentIndex: number }>`
  display: flex;
  padding-left: 90px;
  flex-direction: row;
  gap: 20px;

  transform: translateX(${(props) => -props.currentIndex * 320}px);
  transition: transform 0.3s ease;
`;

const HotImage = styled.img<{ visible: boolean }>`
  width: 300px;
  height: 300px;
  border-radius: 10px;
  background-color: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: bold;
  flex-shrink: 0;
  opacity: ${(props) => (props.visible ? 1 : 0.5)};
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
    opacity: 1;
  }
`;

const ClickArea = styled.div<{ position: 'left' | 'right' }>`
  position: absolute;
  top: 0;
  bottom: 0;
  ${(props) => (props.position === 'left' ? 'left: 0;' : 'right: 0;')}
  width: 90px;
  cursor: pointer;
  z-index: 1;
`;

export default PassiveCarousel;
