import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useIsMobile from '../../hooks/useIsMobile';
import { AllClassData } from '@/types/MainInterface';
import { Weekday } from '@/types/registration';

type PassiveCarouselProps = {
  danceclass: AllClassData;
};

const GAP = 20;

const WEEKDAY_TO_ENGLISH: Record<Weekday, string> = {
  MON: 'Mon',
  TUE: 'Tue',
  WED: 'Wed',
  THU: 'Thu',
  FRI: 'Fri',
  SAT: 'Sat',
  SUN: 'Sun'
};

function formatSchedule(days: string[], dates: string[]): string {
  if (days.length > 0) {
    const dayLabels = days
      .filter((day): day is Weekday => day in WEEKDAY_TO_ENGLISH)
      .map((day) => WEEKDAY_TO_ENGLISH[day])
      .join(', ');
    if (dayLabels) {
      return `Every ${dayLabels}`;
    }
  }

  if (dates.length > 0) {
    const firstDate = dates[0];
    const timeMatch = firstDate?.match(/T(\d{2}:\d{2})/);
    if (timeMatch) {
      const startTime = timeMatch[1];

      if (dates.length > 1) {
        const secondTimeMatch = dates[1]?.match(/T(\d{2}:\d{2})/);
        if (secondTimeMatch) {
          return `${startTime} ~ ${secondTimeMatch[1]}`;
        }
      }

      return startTime;
    }
  }

  return '';
}

const PassiveCarousel = ({ danceclass }: PassiveCarouselProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const VISIBLE = isMobile ? 1 : 3;

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
                  <Schedule>
                    {formatSchedule(item.days || [], item.dates || [])}
                  </Schedule>
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

const ImageContainer = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 80vw;
  height: 80vw;
  aspect-ratio: 1 / 1;

  ${({ theme }) => theme.media.tablet} {
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
  padding: 20px;
  background: #0000004d;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 80px;

  ${({ theme }) => theme.media.tablet} {
    bottom: 16px;
    left: 16px;
    right: 16px;
    padding: 24px;
    gap: 10px;
    min-height: 100px;
  }
`;

const ClassTitle = styled.div`
  color: var(--main-white);
  font-size: 18px;
  font-weight: 600;
  line-height: 1.3;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);

  ${({ theme }) => theme.media.tablet} {
    font-size: 24px;
  }
`;

const Schedule = styled.div`
  color: var(--main-white);
  font-size: 14px;
  font-weight: 400;
  line-height: 1.3;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  opacity: 0.95;
  min-height: 20px;

  ${({ theme }) => theme.media.tablet} {
    font-size: 16px;
    min-height: 22px;
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
