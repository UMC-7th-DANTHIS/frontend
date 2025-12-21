import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';

import { AllDancerData } from '@/types/MainInterface';

type CarouselProps = {
  dancer: AllDancerData;
};

const Carousel = ({ dancer }: CarouselProps) => {
  const navigate = useNavigate();

  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2,
    cssEase: 'linear',
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 6 } },
      { breakpoint: 768, settings: { slidesToShow: 5 } },
      { breakpoint: 375, settings: { slidesToShow: 4 } }
    ]
  };

  return (
    <CarouselContainer>
      <Slider {...sliderSettings}>
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
      </Slider>
    </CarouselContainer>
  );
};

const CarouselContainer = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  overflow: hidden;

  ${({ theme }) => theme.media.tablet} {
    margin-top: 3rem;
    margin-bottom: 3rem;
  }
`;

const Slide = styled.div`
  text-align: center;
  padding: 0 0.5;
  ${({ theme }) => theme.media.tablet} {
    padding: 0 0.25;
  }
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
  margin: 0 auto;
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

export default Carousel;
