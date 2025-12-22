import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { AllDancerData } from '@/types/MainInterface';

type CarouselProps = {
  dancer: AllDancerData;
};

const GAP = 20; // 이미지 사이 고정 간격

const Carousel = ({ dancer }: CarouselProps) => {
  const navigate = useNavigate();
  const [offset, setOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const animate = () => {
      setOffset((prev) => {
        const itemWidth = 80 + GAP;
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
  }, [dancer?.dancers?.length]);

  return (
    <CarouselContainer ref={containerRef}>
      <SlideWrapper $offset={offset}>
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
    </CarouselContainer>
  );
};

export default Carousel;

const CarouselContainer = styled.div`
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

const SlideWrapper = styled.div<{ $offset: number }>`
  display: flex;
  flex-direction: row;
  gap: ${GAP}px;
  transform: translateX(${(p) => -p.$offset}px);
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

  ${({ theme }) => theme.media.tablet} {
    font-size: 18px;
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: 16px;
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
