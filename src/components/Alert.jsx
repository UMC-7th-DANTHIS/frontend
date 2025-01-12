import React from 'react';
import styled from 'styled-components';
import { ReactComponent as CloseIcon } from "../assets/buttons/close-button.svg"

const Alert = ({ title, message, onClose, messageColor, messagesize, ContainerWidth, ContainerHeight, AlertWidth, AlertHeight, showButtons }) => (
  <AlertOverlay>
    {/* 검정색 배경부분 width랑 height 설정 */}
    <AlertContainer width={AlertWidth} height={AlertHeight} >
      <CloseButton onClick={onClose}>
        <CloseIcon />
      </CloseButton>
      {/* 흰색 부분 width랑 height 설정 */}
      <TextContainer width={ContainerWidth} height={ContainerHeight}>
        {/* 제목 */}
        <AlertTitle>{title}</AlertTitle>
        {/* 내용이랑 text 색 설정 / 기본색은 검정 */}
        <AlertMessage color={messageColor} fontSize={messagesize}>{message}</AlertMessage>
      </TextContainer>
      {/* 예 아니요 버튼 유무 true/false로 설정 */}
      {showButtons && (
        <Buttons>
          <Cancel onClick={onClose}> 아니요 </Cancel>
          <Confirm onClick={onClose}> 예 </Confirm>
        </Buttons>
      )}
    </AlertContainer>
  </AlertOverlay>
);

export default Alert;

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
    width: ${({ width }) => width || 'auto'};
    height: ${({ height }) => height || 'auto'};
    text-align: center;
    border-radius: 23px;
    border: 3px solid #A60F62;
    box-shadow: 0px 0px 11.9px 2px  #A60F62;
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

`;

const TextContainer = styled.div`
    border-radius: 10px;
    background:  #FFF;
    width: ${({ width }) => width || 'auto'};
    height: ${({ height }) => height || 'auto'};
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    margin-left: 56px;
    margin-right: 56px;
    margin-top: 54px;
`

const AlertTitle = styled.h2`
    font-size: 16px;
    font-weight: 600;
    color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const AlertMessage = styled.p`
    font-size: ${({ fontSize }) => fontSize || "16px"};
    /* font-size: 16px; */
    font-weight: 600;
    color: ${({ color }) => color || "#000"};
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Buttons = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-top: 26px;
`;

const Confirm = styled.button`
    display: flex;
    width: 160px;
    max-width: 160px;
    padding: 8px 10px;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    background: #A60F62;
    border: 1px solid #A60F62;
    color: white;
    cursor: pointer;
`

const Cancel = styled.button`
    display: flex;
    width: 160px;
    padding: 8px 10px;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    border: 1px solid #A60F62;
    background-color: black;
    color: white;
    cursor: pointer;
`