import React, { useState } from 'react';
import styled from 'styled-components';

import HotClass1 from '../../assets/main/NowHotClass/HotDancer1.svg';
import HotClass2 from '../../assets/main/NowHotClass/HotDancer2.svg';
import HotClass3 from '../../assets/main/NowHotClass/HotDancer3.svg';
import HotClass4 from '../../assets/main/NowHotClass/HotDancer4.svg';

const HotClass = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const classes = [HotClass1, HotClass2, HotClass3, HotClass4];

  const handleNext = () => {
    if (currentIndex < classes.length - 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <Container>
      <Header>유행하는 수업을 한눈에</Header>
      <Glow />
      <SliderContainer>
        <ClickArea onClick={handlePrev} position="left" />
        <SlideWrapper currentIndex={currentIndex}>
          {classes.map((item, index) => (
            <HotImage
              src={item}
              visible={index >= currentIndex && index < currentIndex + 3}
            />
          ))}
        </SlideWrapper>
        <ClickArea onClick={handleNext} position="right" />
      </SliderContainer>
    </Container>
  );
};

export default HotClass;

const Container = styled.div`
  margin-top: 120px;
  border-bottom: 2px solid #4d4d4d;
`;

const Header = styled.div`
  margin-left: 96.5px;
  margin-bottom: 21px;
  position: relative;
  z-index: 1;

  color: white;
  font-size: 36px;
  font-weight: 600;
  line-height: normal;
`;

const Glow = styled.div`
  position: relative;
  bottom: 40px;
  left: 50%;
  transform: translateX(-180%);
  width: 356px;
  height: 18px;

  background: radial-gradient(
    ellipse at center,
    #9819c3 100%,
    transparent 100%
  );
  filter: blur(3px);
  border-radius: 50%;
`;

const SliderContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 58px;
  overflow: hidden;
`;

const SlideWrapper = styled.div`
  display: flex;
  padding-left: 90px;
  flex-direction: row;
  gap: 20px;
  transform: translateX(${(props) => -props.currentIndex * 420}px);
  transition: transform 0.3s ease;
`;

const HotImage = styled.img`
  width: 400px;
  height: 400px;
  border-radius: 10px;
  background-color: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: bold;
  flex-shrink: 0;
  opacity: ${(props) => (props.visible ? 1 : 0.5)};
`;

const ClickArea = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  ${(props) => (props.position === 'left' ? 'left: 0;' : 'right: 0;')}
  width: 90px;
  cursor: pointer;
  z-index: 1;
`;
