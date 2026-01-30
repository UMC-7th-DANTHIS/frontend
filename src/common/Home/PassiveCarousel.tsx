import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useIsMobile from '../../hooks/useIsMobile';
import { AllClassData } from '@/types/MainInterface';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

type PassiveCarouselProps = {
  danceclass: AllClassData;
};

const GAP = 20;

const PassiveCarousel = ({ danceclass }: PassiveCarouselProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  const getVisibleCount = () => {
    if (typeof window === 'undefined') return 3;
    const width = window.innerWidth;
    if (width < 768) return 1; // 모바일
    if (width < 1024) return 2; // 태블릿
    return 3; // 데스크톱
  };

  const [visibleCount, setVisibleCount] = useState<number>(getVisibleCount());

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalItems = danceclass?.danceClasses?.length ?? 0;

  // 1. 화면별 카드 너비 (데스크톱 3개일 때 400px 고정 또는 비율 계산)
  const cardWidth = isMobile
    ? Math.min(window.innerWidth * 0.8, 320)
    : visibleCount === 2
      ? Math.min((window.innerWidth - 160) / 2, 400)
      : 400; // 3개일 때 기본 400px

  const step = cardWidth + GAP;

  // 2. 이동 로직: 1개일 때만 중앙 정렬 오프셋 적용, 나머지는 왼쪽 정렬 기준
  const centerOffset = containerWidth / 2 - cardWidth / 2;
  const translateX =
    visibleCount === 1
      ? -currentIndex * step + centerOffset
      : -currentIndex * step;

  const maxStart = Math.max(0, totalItems - visibleCount);
  const canPrev = currentIndex > 0;
  const canNext = currentIndex < maxStart;

  const handleNext = () => canNext && setCurrentIndex((i) => i + 1);
  const handlePrev = () => canPrev && setCurrentIndex((i) => i - 1);

  const handleDotClick = (targetIndex: number) => {
    setCurrentIndex(Math.min(targetIndex, maxStart));
  };

  const GUTTER = isMobile ? '0px' : 'clamp(48px, 6vw, 90px)';

  return (
    <CarouselWrapper>
      <SliderContainer ref={containerRef} $gutter={GUTTER}>
        <ClickArea
          $side="left"
          $gutter={isMobile ? '40px' : GUTTER}
          $disabled={!canPrev}
          onClick={handlePrev}
        >
          {FaChevronLeft({}) as React.ReactElement}
        </ClickArea>

        <SlideWrapper $offset={translateX}>
          {danceclass?.danceClasses?.map((item, index) => {
            // 현재 활성화된(보이는) 카드들: currentIndex부터 visibleCount 개수만큼
            const isVisible =
              index >= currentIndex && index < currentIndex + visibleCount;

            return (
              <ImageContainer key={item.id ?? index} $width={cardWidth}>
                <HotImage
                  onClick={() => navigate(`/classes/${item.id}?tab=detail`)}
                  src={item.thumbnailImage}
                  alt="Image"
                  $visible={isVisible}
                />
                {isVisible && (
                  <Overlay>
                    <ClassTitle>{item.className}</ClassTitle>
                  </Overlay>
                )}
              </ImageContainer>
            );
          })}
        </SlideWrapper>

        <ClickArea
          $side="right"
          $gutter={isMobile ? '40px' : GUTTER}
          $disabled={!canNext}
          onClick={handleNext}
        >
          {FaChevronRight({}) as React.ReactElement}
        </ClickArea>
      </SliderContainer>

      <DotContainer>
        {Array.from({ length: totalItems }).map((_, index) => (
          <Dot
            key={index}
            $active={index === currentIndex}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </DotContainer>
    </CarouselWrapper>
  );
};

export default PassiveCarousel;

/* --- 스타일 --- */

const CarouselWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow: hidden;
`;

const SliderContainer = styled.div<{ $gutter: string }>`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 58px;
  width: 100%;
  padding-inline: ${(p) => p.$gutter};

  @media (max-width: 767px) {
    padding-inline: 0;
  }
`;

const SlideWrapper = styled.div<{ $offset: number }>`
  display: flex;
  flex-direction: row;
  gap: ${GAP}px;
  transform: translateX(${(p) => p.$offset}px);
  transition: transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
  will-change: transform;
`;

const ImageContainer = styled.div<{ $width: number }>`
  position: relative;
  flex-shrink: 0;
  width: ${(p) => p.$width}px;
  aspect-ratio: 1 / 1;
  max-height: 400px;
`;

const HotImage = styled.img<{ $visible: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  background-color: #222;

  /* 비활성 이미지 효과 */
  opacity: ${(p) => (p.$visible ? 1 : 0.2)};
  transform: ${(p) => (p.$visible ? 'scale(1)' : 'scale(0.94)')};
  filter: ${(p) => (p.$visible ? 'none' : 'brightness(0.5)')};

  /* 비활성 터치 차단 */
  cursor: ${(p) => (p.$visible ? 'pointer' : 'default')};
  pointer-events: ${(p) => (p.$visible ? 'auto' : 'none')};

  transition: all 0.4s ease;
`;

const Overlay = styled.div`
  position: absolute;
  bottom: 16px;
  left: 16px;
  right: 16px;
  padding: 10px 16px;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

const ClassTitle = styled.div`
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ClickArea = styled.button<{
  $side: 'left' | 'right';
  $gutter: string;
  $disabled: boolean;
}>`
  position: absolute;
  top: 0;
  bottom: 0;
  ${(p) => (p.$side === 'left' ? 'left: 0;' : 'right: 0;')}
  width: ${(p) => p.$gutter};
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 0;
  cursor: ${(p) => (p.$disabled ? 'default' : 'pointer')};
  pointer-events: ${(p) => (p.$disabled ? 'none' : 'auto')};
  opacity: 0;

  &::before {
    content: '';
    position: absolute;
    width: 44px;
    height: 44px;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 50%;
    z-index: -1;
  }

  ${CarouselWrapper}:hover & {
    opacity: ${(p) => (p.$disabled ? 0.2 : 1)};
  }

  svg {
    width: 24px;
    height: 24px;
    fill: #fff;
  }
`;

const DotContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 24px;
`;

const Dot = styled.button<{ $active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background-color: ${(p) => (p.$active ? '#fff' : 'rgba(255, 255, 255, 0.3)')};
  cursor: pointer;
  transition: all 0.3s ease;
`;
