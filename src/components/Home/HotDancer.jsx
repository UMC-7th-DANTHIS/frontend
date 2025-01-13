import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';

const HotDancer = () => {
  return (
    <Container>
      <TitleContainer>
        <Circle1 />
        <Circle2 />
        <Circle3 />
        <Title>요즘 뜨고 있는 댄서를 찾아보세요!</Title>
        <Circle4 />
        <Circle5 />
        <Circle6 />
      </TitleContainer>
      <CarouselContainer>
        <Slider {...sliderSettings}>
          <Slide>
            <Placeholder>Placeholder 1</Placeholder>
          </Slide>
          <Slide>
            <Placeholder>Placeholder 2</Placeholder>
          </Slide>
          <Slide>
            <Placeholder>Placeholder 3</Placeholder>
          </Slide>
          <Slide>
            <Placeholder>Placeholder 4</Placeholder>
          </Slide>
          <Slide>
            <Placeholder>Placeholder 5</Placeholder>
          </Slide>
          <Slide>
            <Placeholder>Placeholder 6</Placeholder>
          </Slide>
        </Slider>
      </CarouselContainer>
    </Container>
  );
};

export default HotDancer;

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

const Container = styled.div`
  margin-left: 100px;
  margin-right: 100px;

  border-bottom: 2px solid #4d4d4d;
`;

const CarouselContainer = styled.div`
  margin-top: 73px;
  margin-bottom: 58px;
  overflow: hidden;
`;

const Slide = styled.div`
  text-align: center;
`;

const Placeholder = styled.div`
  width: 190px;
  height: 190px;
  background-color: #ddd;
  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 36.5px;
`;

const Circle1 = styled.div`
  background: var(--main_red, #b30505);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 39.33px;
`;

const Circle2 = styled.div`
  background: var(--main_red, #b30505);
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 50%;
  margin-right: 39.33px;
`;

const Circle3 = styled.div`
  background: var(--main_red, #b30505);
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  border-radius: 50%;
  margin-right: 31.35px;
`;

const Circle4 = styled.div`
  background: var(--main_purple, #9819c3);
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  border-radius: 50%;
  margin-left: 31.35px;
`;

const Circle5 = styled.div`
  background: var(--main_purple, #9819c3);
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 50%;
  margin-left: 39.33px;
`;

const Circle6 = styled.div`
  background: var(--main_purple, #9819c3);
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  border-radius: 50%;
  margin-left: 39.33px;
`;

const Title = styled.div`
  width: 780px;
  height: 96px;
  flex-shrink: 0;
  border-radius: 91px;
  background: linear-gradient(90deg, #b30505 0%, #9819c3 100%);
  color: var(--main_white, #fff);
  text-align: center;

  font-size: 44px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
`;
