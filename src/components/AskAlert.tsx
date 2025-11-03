import React from 'react';
import styled from 'styled-components';
import { ReactComponent as AlertAsk } from '../assets/shape/askContainer.svg';
import { ReactComponent as Info } from '../assets/shape/info.svg';

const AskAlert = () => {
  return (
    <AlertContainer>
      <AlertAsk />
      <ContentContainer>
        <Info />
        <Text> 운영진에게 문의하러 가기 </Text>
      </ContentContainer>
    </AlertContainer>
  );
};

export default AskAlert;

const AlertContainer = styled.div`
  position: absolute;
  bottom: 5%;
  transform: translateX(-80%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const ContentContainer = styled.div`
  position: relative;
  top: -42px;
  right: 15px;
`;

const Text = styled.div`
  color: #00dd0b;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 170%;
  position: relative;
  top: -24px;
  left: 28px;
  right: 15px;
`;
