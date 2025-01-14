import React from 'react';
import styled from 'styled-components';

const UserDancer = () => {
  return (
    <Container>
      <Circle1 />
      <Circle2 />
      <Circle3 />
      <Title>Test용 입니다</Title>
      <Circle4 />
      <Circle5 />
      <Circle6 />
    </Container>
  );
};

export default UserDancer;

const Container = styled.div`
  margin-left: 100px;
  margin-right: 100px;
`;

const Circle1 = styled.div`
  border: 5px solid #b30505;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 39.33px;
`;

const Circle2 = styled.div`
  border: 5px solid #b30505;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 50%;
  margin-right: 39.33px;
`;

const Circle3 = styled.div`
  border: 5px solid #b30505;
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  border-radius: 50%;
  margin-right: 31.35px;
`;

const Circle4 = styled.div`
  border: 5px solid #9819c3;
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  border-radius: 50%;
  margin-left: 31.35px;
`;

const Circle5 = styled.div`
  border: 5px solid #9819c3;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 50%;
  margin-left: 39.33px;
`;

const Circle6 = styled.div`
  border: 5px solid #9819c3;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  border-radius: 50%;
  margin-left: 39.33px;
`;

const Title = styled.div`
  width: 520px;
  height: 90px;
  flex-shrink: 0;

  border: 5px solid transparent;
  border-image: linear-gradient(90deg, #b30505 0%, #9819c3 100%);
  border-image-slice: 1;
  border-radius: 73px;

  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  text-align: center;

  background: linear-gradient(90deg, #b30505 0%, #9819c3 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  font-size: 44px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
