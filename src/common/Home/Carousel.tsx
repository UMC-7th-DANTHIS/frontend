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

  return (
    <CarouselContainer>
      <Slider {...sliderSettings}>
        {dancer?.dancers?.map((data, id) => (
          <Slide key={id}>
            <ImageContainer>
              <PlaceholderImg src={data.images[0]} alt={data.dancerName} />
              <Overlay onClick={() => navigate(`/dancerprofile/${data.id}`)} />
              <DancerName>{data.dancerName}</DancerName>
            </ImageContainer>
          </Slide>
        ))}
      </Slider>
    </CarouselContainer>
  );
};

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 3000,
  slidesToShow: 7,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2,
  cssEase: 'linear'
};

const CarouselContainer = styled.div`
  margin-top: 73px;
  margin-bottom: 58px;
  overflow: hidden;
`;

const Slide = styled.div`
  text-align: center;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
`;

const DancerName = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: white;
  font-size: 20px;
  font-weight: bold;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 160px;
  height: 160px;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  &:hover ${Overlay} {
    opacity: 1;
  }

  &:hover ${DancerName} {
    opacity: 1;
  }
`;

const PlaceholderImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

export default Carousel;
