import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AllClassData } from '@/types/MainInterface';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

type PassiveCarouselProps = {
  danceclass: AllClassData;
};

const GAP = 20;

const PassiveCarousel = ({ danceclass }: PassiveCarouselProps) => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const [cardSize, setCardSize] = useState(
    window.innerWidth >= 1024 ? 300 : 260
  );

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsSmallScreen(width < 768);
      setCardSize(width >= 1024 ? 300 : 260);
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const step = cardSize + GAP;
  const totalItems = danceclass?.danceClasses?.length ?? 0;
  const SIDE_PADDING = isSmallScreen ? 0 : window.innerWidth >= 1024 ? 60 : 40;

  const { offset, maxStart } = useMemo(() => {
    if (isSmallScreen) {
      const initialOffset = (containerWidth - cardSize) / 2;
      return {
        offset: currentIndex * step - initialOffset,
        maxStart: totalItems - 1
      };
    } else {
      const itemsInView = (containerWidth - SIDE_PADDING * 2) / step;
      return {
        offset: currentIndex * step - SIDE_PADDING,
        maxStart: Math.max(0, totalItems - Math.floor(itemsInView))
      };
    }
  }, [
    isSmallScreen,
    currentIndex,
    step,
    containerWidth,
    cardSize,
    totalItems,
    SIDE_PADDING
  ]);

  const canPrev = currentIndex > 0;
  const canNext = currentIndex < maxStart;

  const handleNext = () => canNext && setCurrentIndex((i) => i + 1);
  const handlePrev = () => canPrev && setCurrentIndex((i) => i - 1);

  return (
    <CarouselWrapper>
      <SliderContainer ref={containerRef}>
        <ClickArea
          $side="left"
          $disabled={!canPrev}
          onClick={handlePrev}
          $isMobile={isSmallScreen}
        >
          {FaChevronLeft({}) as React.ReactElement}
        </ClickArea>

        <SlideWrapper $offset={offset}>
          {danceclass?.danceClasses?.map((item, index) => (
            <ImageContainer key={item.id ?? index} $size={cardSize}>
              <HotImage
                onClick={() => navigate(`/classes/${item.id}?tab=detail`)}
                src={item.thumbnailImage}
                alt={item.className}
              />
              <Overlay>
                <ClassTitle>{item.className}</ClassTitle>
              </Overlay>
            </ImageContainer>
          ))}
        </SlideWrapper>

        <ClickArea
          $side="right"
          $disabled={!canNext}
          onClick={handleNext}
          $isMobile={isSmallScreen}
        >
          {FaChevronRight({}) as React.ReactElement}
        </ClickArea>
      </SliderContainer>
    </CarouselWrapper>
  );
};

export default PassiveCarousel;

const CarouselWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow: hidden;
`;

const SliderContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: auto;
  margin-bottom: 40px;
`;

const SlideWrapper = styled.div<{ $offset: number }>`
  display: flex;
  flex-direction: row;
  gap: ${GAP}px;
  transform: translateX(${(p) => -p.$offset}px);
  transition: transform 0.5s cubic-bezier(0.2, 0, 0, 1);
  will-change: transform;
`;

const ImageContainer = styled.div<{ $size: number }>`
  position: relative;
  flex-shrink: 0;
  width: ${(p) => p.$size}px;
  height: ${(p) => p.$size}px;
`;

const HotImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  background-color: #f0f0f0;
  cursor: pointer;
`;

const Overlay = styled.div`
  position: absolute;
  bottom: 12px;
  left: 12px;
  right: 12px;
  padding: 10px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  border-radius: 8px;
  text-align: center;
`;

const ClassTitle = styled.div`
  color: white;
  font-size: 15px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ClickArea = styled.button<{
  $side: 'left' | 'right';
  $disabled: boolean;
  $isMobile: boolean;
}>`
  position: absolute;
  top: 0;
  bottom: 0;
  ${(p) => (p.$side === 'left' ? 'left: 0;' : 'right: 0;')}
  width: ${(p) => (p.$isMobile ? '50px' : '60px')};
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: ${(p) => (p.$disabled ? 'default' : 'pointer')};
  opacity: ${(p) => (p.$disabled ? 0 : 1)};
  transition: opacity 0.3s ease;

  svg {
    filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.8));
    font-size: 28px;
    color: white;
  }

  &:hover {
    background: linear-gradient(
      ${(p) => (p.$side === 'left' ? 'to right' : 'to left')},
      rgba(0, 0, 0, 0.1),
      transparent
    );
  }
`;
