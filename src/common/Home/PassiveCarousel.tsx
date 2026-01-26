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

  const getVisibleCount = () => {
    if (typeof window === 'undefined') return 3;
    const width = window.innerWidth;
    if (width < 768) return 1; // 모바일: 1개
    if (width < 1024) return 2; // 태블릿: 2개
    return 3; // 데스크톱: 3개
  };

  const [visibleCount, setVisibleCount] = useState<number>(getVisibleCount());

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setVisibleCount(1); // 모바일: 1개
      } else if (width < 1024) {
        setVisibleCount(2); // 태블릿: 2개
      } else {
        setVisibleCount(3); // 데스크톱: 3개
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const VISIBLE = visibleCount;
  const GUTTER = isMobile ? 'clamp(24px, 8vw, 72px)' : 'clamp(48px, 6vw, 90px)';

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const firstCardRef = useRef<HTMLImageElement | null>(null);
  const [step, setStep] = useState<number>((isMobile ? 320 : 400) + GAP);

  useEffect(() => {
    const measureStep = () => {
      const w = firstCardRef.current?.clientWidth ?? (isMobile ? 320 : 400);
      setStep(w + GAP);
    };

    measureStep();
    window.addEventListener('resize', measureStep);
    return () => window.removeEventListener('resize', measureStep);
  }, [isMobile, danceclass?.danceClasses?.length, visibleCount]);

  useEffect(() => {
    const maxStart = Math.max(
      0,
      (danceclass?.danceClasses?.length ?? 0) - VISIBLE
    );
    if (currentIndex > maxStart) setCurrentIndex(maxStart);
  }, [VISIBLE, danceclass?.danceClasses?.length, currentIndex]);

  const maxStart = (danceclass?.danceClasses?.length ?? 0) - VISIBLE;
  const canPrev = currentIndex > 0;
  const canNext = currentIndex < maxStart;

  const handleNext = () => canNext && setCurrentIndex((i) => i + 1);
  const handlePrev = () => canPrev && setCurrentIndex((i) => i - 1);

  const totalItems = danceclass?.danceClasses?.length ?? 0;

  const handleDotClick = (targetIndex: number) => {
    const clampedIndex = Math.min(targetIndex, maxStart);
    setCurrentIndex(clampedIndex);
  };

  return (
    <CarouselWrapper>
      <SliderContainer $gutter={GUTTER}>
        <ClickArea
          $side="left"
          $gutter={GUTTER}
          $disabled={!canPrev}
          onClick={handlePrev}
        >
          {FaChevronLeft({}) as React.ReactElement}
        </ClickArea>
        <SlideWrapper $offset={currentIndex * step}>
          {danceclass?.danceClasses?.map((item, index) => {
            const isVisible =
              index >= currentIndex && index < currentIndex + VISIBLE;
            return (
              <ImageContainer key={item.id ?? index}>
                <HotImage
                  ref={index === 0 ? firstCardRef : undefined}
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
          $gutter={GUTTER}
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

const CarouselWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const SliderContainer = styled.div<{ $gutter: string }>`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 58px;
  overflow: hidden;
  width: 100%;
  padding-inline: ${(p) => p.$gutter};
`;

const SlideWrapper = styled.div<{ $offset: number }>`
  display: flex;
  flex-direction: row;
  gap: ${GAP}px;
  transform: translateX(${(p) => -p.$offset}px);
  transition: transform 0.3s ease;
  will-change: transform;
`;

const ImageContainer = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 80vw;
  height: 80vw;
  aspect-ratio: 1 / 1;

  ${({ theme }) => theme.media.tablet} {
    width: calc((100vw - clamp(48px, 6vw, 90px) * 2 - 20px) / 2);
    max-width: 400px;
    height: calc((100vw - clamp(48px, 6vw, 90px) * 2 - 20px) / 2);
    max-height: 400px;
  }

  ${({ theme }) => theme.media.desktop} {
    width: 400px;
    height: 400px;
  }
`;

const HotImage = styled.img<{ $visible: boolean }>`
  width: 100%;
  height: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 10px;
  background-color: #ddd;

  opacity: ${(p) => (p.$visible ? 1 : 0.2)};
  cursor: pointer;
  transition:
    transform 0.3s ease-in-out,
    opacity 0.2s ease;
`;

const Overlay = styled.div`
  position: absolute;
  bottom: 12px;
  left: 12px;
  right: 12px;
  padding: 8px 16px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 36px;

  ${({ theme }) => theme.media.tablet} {
    bottom: 16px;
    left: 16px;
    right: 16px;
    padding: 8px 16px;
    min-height: 36px;
  }
`;

const ClassTitle = styled.div`
  color: var(--main-white);
  font-size: 14px;
  font-weight: 700;
  line-height: 1.2;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;

  ${({ theme }) => theme.media.tablet} {
    font-size: 16px;
  }
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
  z-index: 2;

  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 0;
  cursor: ${(p) => (p.$disabled ? 'default' : 'pointer')};
  pointer-events: ${(p) => (p.$disabled ? 'none' : 'auto')};
  opacity: ${(p) => (p.$disabled ? 0.25 : 1)};

  svg {
    width: 24px;
    height: 24px;
    fill: var(--main-white);
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
  }

  ${({ theme }) => theme.media.tablet} {
    svg {
      width: 32px;
      height: 32px;
    }
  }
`;

const DotContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  width: 100%;
  padding-inline: 0;
`;

const Dot = styled.button<{ $active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background-color: ${(p) =>
    p.$active ? 'var(--main-white)' : 'rgba(255, 255, 255, 0.3)'};
  cursor: pointer;
  transition: background-color 0.2s ease;
  padding: 0;

  &:hover {
    background-color: ${(p) =>
      p.$active ? 'var(--main-white)' : 'rgba(255, 255, 255, 0.5)'};
  }
`;
