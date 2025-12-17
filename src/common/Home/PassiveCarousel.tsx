import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useIsMobile from '../../hooks/useIsMobile';
import { AllClassData } from '@/types/MainInterface';

type PassiveCarouselProps = {
  danceclass: AllClassData;
};

const GAP = 20;

const PassiveCarousel = ({ danceclass }: PassiveCarouselProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const VISIBLE = isMobile ? 1 : 3;

  const GUTTER = isMobile ? 'clamp(24px, 8vw, 72px)' : 'clamp(48px, 6vw, 90px)';

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const firstCardRef = useRef<HTMLImageElement | null>(null);
  const [step, setStep] = useState<number>((isMobile ? 320 : 400) + GAP);

  const measureStep = () => {
    const w = firstCardRef.current?.clientWidth ?? (isMobile ? 320 : 400);
    setStep(w + GAP);
  };

  useEffect(() => {
    measureStep();
    window.addEventListener('resize', measureStep);
    return () => window.removeEventListener('resize', measureStep);
  }, [isMobile, danceclass?.danceClasses?.length]);

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

  return (
    <SliderContainer $gutter={GUTTER}>
      <ClickArea
        $side="left"
        $gutter={GUTTER}
        $disabled={!canPrev}
        onClick={handlePrev}
      />
      <SlideWrapper $offset={currentIndex * step}>
        {danceclass?.danceClasses?.map((item, index) => (
          <HotImage
            ref={index === 0 ? firstCardRef : undefined}
            key={item.id ?? index}
            onClick={() => navigate(`/classes/${item.id}?tab=detail`)}
            src={item.thumbnailImage}
            alt="Image"
            $visible={index >= currentIndex && index < currentIndex + VISIBLE}
          />
        ))}
      </SlideWrapper>
      <ClickArea
        $side="right"
        $gutter={GUTTER}
        $disabled={!canNext}
        onClick={handleNext}
      />
    </SliderContainer>
  );
};

export default PassiveCarousel;

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

const HotImage = styled.img<{ $visible: boolean }>`
  width: 80vw;
  height: 80vw;
  aspect-ratio: 1 / 1;
  object-fit: cover;

  ${({ theme }) => theme.media.tablet} {
    width: 400px;
    height: 400px;
  }

  border-radius: 10px;
  background-color: #ddd;
  flex-shrink: 0;

  opacity: ${(p) => (p.$visible ? 1 : 0.2)};
  cursor: pointer;
  transition:
    transform 0.3s ease-in-out,
    opacity 0.2s ease;

  &:hover {
    transform: scale(1.06);
    opacity: 1;
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

  background: transparent;
  border: 0;
  cursor: ${(p) => (p.$disabled ? 'default' : 'pointer')};
  pointer-events: ${(p) => (p.$disabled ? 'none' : 'auto')};
  opacity: ${(p) => (p.$disabled ? 0.25 : 1)};
`;
