import React from 'react';
import styled from 'styled-components';

const HotClass = () => {
  return (
    <Container>
      <Header>유행하는 수업을 한눈에</Header>
      <Glow />
      <ImgContainer>
        <LeftButton>{'<'}</LeftButton>
        <Image>Placeholder 1</Image>
        <Image>Placeholder 2</Image>
        <Image>Placeholder 3</Image>
        <RightButton>{'>'}</RightButton>
      </ImgContainer>
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

const ImgContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;

  margin-bottom: 58px;
`;

const LeftButton = styled.div`
  width: 70px;
  align-content: center;
  text-align: right;
  color: white;
  font-size: 36px;
  font-weight: bold;

  cursor: pointer;
`;

const RightButton = styled.div`
  width: 91px;
  align-content: center;
  color: white;
  font-size: 36px;
  font-weight: bold;

  cursor: pointer;
`;

const Image = styled.div`
  width: 400px;
  height: 400px;
  border-radius: 10px;

  background-color: #ddd;
  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: bold;
`;
