import React from 'react'
import styled from 'styled-components'
import { ReactComponent as CloseIcon } from '../assets/buttons/close-button.svg';

const AgreeAlert = ({
  onClose,
  title,
  message,
}) => {
  const handleClick = (e) => {
    e.stopPropagation();
    if (onClose) {
      onClose();
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <AlertOverlay onClick={handleOverlayClick}>
      <AlertContainer>
        <CloseButton onClick={handleClick}>
          <CloseIcon />
        </CloseButton>

        <TextContainer>
          <Title> {title}  </Title>
          <Message> {message}  </Message>
        </TextContainer>
      </AlertContainer>

    </AlertOverlay>
  )
}

export default AgreeAlert

const AlertOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const AlertContainer = styled.div`
  position: relative;
  background-color: black;
  border-radius: 23px;
  width: 565px;
  height: 529px;
  text-align: center;
  border-radius: 23px;
  border: 3px solid #a60f62;
  box-shadow: 0px 0px 11.9px 2px #a60f62;
`;


const CloseButton = styled.button`
  position: absolute;
  top: 14px;
  right: 17px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const TextContainer = styled.div`
  border-radius: 10px;
  background: #fff;
  width: 460px;
  height: 400px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  margin-left: 52px;
  margin-right: 52px;
  margin-top: 70px;
  overflow-x: scroll;
  
`;

const Title = styled.div`
  color: #000;
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: 35px;
`;

const Message = styled.div`
  width: 372px;
  height: 272px;
  display: flex;
  color: #000;
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  padding: 26px 44px 0 44px;
`;