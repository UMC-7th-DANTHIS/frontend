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
  const scrollRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  const getVisibleCount = () => {
    if (typeof window === 'undefined') return 3;
    const width = window.innerWidth;
    if (width < 768) return 1;
    if (width < 1024) return 2;
    return 3;
  };

  const [visibleCount, setVisibleCount] = useState<number>(getVisibleCount());

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
      if (scrollRef.current) {
        setContainerWidth(scrollRef.current.clientWidth);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalItems = danceclass?.danceClasses?.length ?? 0;

  // 카드 너비 계산
  const getCardWidth = () => {
    if (visibleCount === 1) {
      // 1개일 때: 양옆 여백을 제외하고 화면의 약 80% 차지 (이미지 느낌 재현)
      return Math.min(window.innerWidth * 0.75, 340);
    }
    const preciseWidth =
      (containerWidth - GAP * (visibleCount - 1)) / visibleCount;
    return Math.min(preciseWidth, 400);
  };

  const cardWidth = getCardWidth();
  const step = cardWidth + GAP;
  const maxStartIndex = Math.max(0, totalItems - visibleCount);

  // 현재 상태가 1개 모드인지 확인
  const isSingle = visibleCount === 1;

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;

    const newIndex = Math.round(scrollLeft / step);

    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  };

  const scrollTo = (index: number) => {
    if (!scrollRef.current) return;
    const targetIndex = Math.min(Math.max(0, index), maxStartIndex);

    // 1개일 때는 snap-align center가 작동하므로 단순 인덱스 계산
    scrollRef.current.scrollTo({
      left: targetIndex * step,
      behavior: 'smooth'
    });
  };

  const handleNext = () =>
    currentIndex < maxStartIndex && scrollTo(currentIndex + 1);
  const handlePrev = () => currentIndex > 0 && scrollTo(currentIndex - 1);

  const GUTTER = isMobile ? '0px' : 'clamp(48px, 6vw, 90px)';
  const dotCount = totalItems > visibleCount ? maxStartIndex + 1 : 1;

  return (
    <CarouselWrapper>
      <SliderContainer $gutter={GUTTER}>
        <ClickArea
          $side="left"
          $gutter={isMobile ? '40px' : GUTTER}
          $disabled={currentIndex === 0}
          onClick={handlePrev}
        >
          {FaChevronLeft({})}
        </ClickArea>

        <ScrollContainer ref={scrollRef} onScroll={handleScroll}>
          <SlideWrapper $isSingle={isSingle} $cardWidth={cardWidth}>
            {danceclass?.danceClasses?.map((item, index) => {
              const isVisible =
                index >= currentIndex && index < currentIndex + visibleCount;

              return (
                <ImageContainer
                  key={item.id ?? index}
                  $width={cardWidth}
                  $isSingle={isSingle}
                >
                  <HotImage
                    onClick={() => navigate(`/classes/${item.id}?tab=detail`)}
                    src={item.thumbnailImage}
                    alt="Class Thumbnail"
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
        </ScrollContainer>

        <ClickArea
          $side="right"
          $gutter={isMobile ? '40px' : GUTTER}
          $disabled={currentIndex >= maxStartIndex}
          onClick={handleNext}
        >
          {FaChevronRight({})}
        </ClickArea>
      </SliderContainer>

      <DotContainer>
        {Array.from({ length: dotCount }).map((_, index) => (
          <Dot
            key={index}
            $active={index === currentIndex}
            onClick={() => scrollTo(index)}
          />
        ))}
      </DotContainer>
    </CarouselWrapper>
  );
};

export default PassiveCarousel;

/* --- CSS 스타일 --- */

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
  width: 100%;
  padding-inline: ${(p) => p.$gutter};
  box-sizing: border-box;

  @media (max-width: 767px) {
    padding-inline: 0;
  }
`;

const ScrollContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SlideWrapper = styled.div<{ $isSingle: boolean; $cardWidth: number }>`
  display: flex;
  flex-direction: row;
  gap: ${GAP}px;
  width: max-content;

  /* 1개일 때 핵심: 양옆 패딩을 주어 첫 번째/마지막 카드가 화면 중앙에 오게 함 */
  padding-left: ${(p) =>
    p.$isSingle ? `calc(50% - ${p.$cardWidth / 2}px)` : '0px'};
  padding-right: ${(p) =>
    p.$isSingle ? `calc(50% - ${p.$cardWidth / 2}px)` : `${GAP}px`};
`;

const ImageContainer = styled.div<{ $width: number; $isSingle: boolean }>`
  position: relative;
  flex-shrink: 0;
  width: ${(p) => p.$width}px;
  aspect-ratio: 1 / 1;

  /* 1개일 때 너무 커지는 것 방지 */
  max-height: ${(p) => (p.$isSingle ? '450px' : 'none')};

  /* 1개일 때는 중앙 스냅, 여러 개일 때는 왼쪽 정렬 스냅 */
  scroll-snap-align: ${(p) => (p.$isSingle ? 'center' : 'start')};
`;

const HotImage = styled.img<{ $visible: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  background-color: #222;
  /* 보여주는 카드 외에는 흐리게 처리하여 강조 효과 */
  opacity: ${(p) => (p.$visible ? 1 : 0.3)};
  transform: ${(p) => (p.$visible ? 'scale(1)' : 'scale(0.9)')};
  filter: ${(p) => (p.$visible ? 'none' : 'brightness(0.4)')};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: ${(p) => (p.$visible ? 'pointer' : 'default')};
  pointer-events: ${(p) => (p.$visible ? 'auto' : 'none')};
`;

const Overlay = styled.div`
  position: absolute;
  bottom: 16px;
  left: 16px;
  right: 16px;
  padding: 10px 16px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
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
    opacity: ${(p) => (p.$disabled ? 0 : 1)};
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
  padding: 0;
`;
