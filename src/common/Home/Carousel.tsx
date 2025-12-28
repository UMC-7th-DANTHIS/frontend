import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { AllDancerData } from '@/types/MainInterface';

type CarouselProps = {
  dancer: AllDancerData;
};

const GAP = 20; // 이미지 사이 고정 간격
const AUTO_SCROLL_RESUME_DELAY = 500; // 수동 스크롤 후 자동 스크롤 재개까지의 시간 (ms)

const Carousel = ({ dancer }: CarouselProps) => {
  const navigate = useNavigate();
  const [offset, setOffset] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isManualScrolling, setIsManualScrolling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const manualScrollTimeoutRef = useRef<number | undefined>(undefined);

  // 아이템 너비 계산 (모바일/태블릿 반응형)
  const getItemWidth = () => {
    if (typeof window === 'undefined') return 80;
    const width = window.innerWidth;
    if (width < 768) return 80; // 모바일
    return 160; // 태블릿 이상
  };

  // 자동 스크롤 애니메이션
  useEffect(() => {
    // 호버 중이거나 수동 스크롤 중이면 자동 스크롤 멈춤
    if (isHovered || isManualScrolling) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = undefined;
      }
      return;
    }

    const animate = () => {
      setOffset((prev) => {
        const itemWidth = getItemWidth() + GAP;
        const totalWidth = (dancer?.dancers?.length ?? 0) * itemWidth;
        const nextOffset = prev + 0.5;

        if (nextOffset >= totalWidth) {
          return 0;
        }
        return nextOffset;
      });
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dancer?.dancers?.length, isHovered, isManualScrolling]);

  // 수동 스크롤 핸들러
  const handleManualScroll = (direction: 'left' | 'right') => {
    const itemWidth = getItemWidth() + GAP;
    const scrollAmount = itemWidth * 2; // 한 번에 2개씩 스크롤

    setOffset((prev) => {
      const totalWidth = (dancer?.dancers?.length ?? 0) * itemWidth;
      let newOffset = prev;

      if (direction === 'left') {
        newOffset = prev - scrollAmount;
        if (newOffset < 0) {
          newOffset = totalWidth - (totalWidth % scrollAmount);
        }
      } else {
        newOffset = prev + scrollAmount;
        if (newOffset >= totalWidth) {
          newOffset = 0;
        }
      }

      return newOffset;
    });

    // 수동 스크롤 상태 설정 및 타이머 리셋
    setIsManualScrolling(true);
    if (manualScrollTimeoutRef.current) {
      window.clearTimeout(manualScrollTimeoutRef.current);
    }
    manualScrollTimeoutRef.current = window.setTimeout(() => {
      setIsManualScrolling(false);
    }, AUTO_SCROLL_RESUME_DELAY);
  };

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (manualScrollTimeoutRef.current) {
        window.clearTimeout(manualScrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <CarouselContainer
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <NavButton
        $side="left"
        onClick={() => handleManualScroll('left')}
        aria-label="이전 댄서 보기"
      >
        {FaChevronLeft({}) as React.ReactElement}
      </NavButton>
      <SlideWrapper $offset={offset} $isManualScrolling={isManualScrolling}>
        {dancer?.dancers?.map((data, id) => (
          <Slide key={id}>
            <ImageContainer
              onClick={() => navigate(`/dancerprofile/${data.id}`)}
            >
              <PlaceholderImg src={data.images[0]} alt={data.dancerName} />
              <Overlay />
              <DancerName>{data.dancerName}</DancerName>
            </ImageContainer>
          </Slide>
        ))}

        {dancer?.dancers?.map((data, id) => (
          <Slide key={`duplicate-${id}`}>
            <ImageContainer
              onClick={() => navigate(`/dancerprofile/${data.id}`)}
            >
              <PlaceholderImg src={data.images[0]} alt={data.dancerName} />
              <Overlay />
              <DancerName>{data.dancerName}</DancerName>
            </ImageContainer>
          </Slide>
        ))}
      </SlideWrapper>
      <NavButton
        $side="right"
        onClick={() => handleManualScroll('right')}
        aria-label="다음 댄서 보기"
      >
        {FaChevronRight({}) as React.ReactElement}
      </NavButton>
    </CarouselContainer>
  );
};

export default Carousel;

const CarouselContainer = styled.div`
  position: relative;
  margin-top: 2rem;
  margin-bottom: 2rem;
  overflow: hidden;
  width: 100%;
  padding-inline: clamp(16px, 4vw, 48px);

  ${({ theme }) => theme.media.tablet} {
    margin-top: 3rem;
    margin-bottom: 3rem;
    padding-inline: clamp(24px, 6vw, 72px);
  }
`;

const SlideWrapper = styled.div<{
  $offset: number;
  $isManualScrolling: boolean;
}>`
  display: flex;
  flex-direction: row;
  gap: ${GAP}px;
  transform: translateX(${(p) => -p.$offset}px);
  transition: ${(p) =>
    p.$isManualScrolling ? 'transform 0.3s ease-out' : 'none'};
  will-change: transform;
`;

const Slide = styled.div`
  flex-shrink: 0;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
`;

const DancerName = styled.div`
  position: absolute;
  left: 10px;
  bottom: 10px;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  max-width: calc(100% - 20px);

  ${({ theme }) => theme.media.tablet} {
    font-size: 18px;
  }

  @media (max-width: 767px) {
    font-size: 12px;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;

  &:hover ${Overlay} {
    opacity: 1;
  }
  &:hover ${DancerName} {
    opacity: 1;
  }

  ${({ theme }) => theme.media.tablet} {
    width: 160px;
    height: 160px;
  }
`;

const PlaceholderImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
`;

const NavButton = styled.button<{ $side: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${(p) => (p.$side === 'left' ? 'left: 0;' : 'right: 0;')}
  transform: translateY(-50%);
  z-index: 10;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0;
  transition:
    opacity 0.3s ease,
    background 0.3s ease;
  color: var(--main-white);

  ${({ theme }) => theme.media.tablet} {
    width: 48px;
    height: 48px;
  }

  svg {
    width: 20px;
    height: 20px;
    ${({ theme }) => theme.media.tablet} {
      width: 24px;
      height: 24px;
    }
  }

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }

  ${CarouselContainer}:hover & {
    opacity: 1;
  }

  @media (hover: none) {
    opacity: 0.7;
  }
`;
