import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';

const Carousel = ({ dancer }) => {
  return (
    <CarouselContainer>
      <Slider {...sliderSettings}>
        {dancer?.data.dancers.map((data, id) => (
          <Slide key={id}>
            <ImageContainer>
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

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 3000,
  slidesToShow: 6,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 1,
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
  width: 190px;
  height: 190px;
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
