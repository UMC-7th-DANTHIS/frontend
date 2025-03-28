import React from 'react';
import styled from 'styled-components';
import { ReactComponent as CloseIcon } from '../assets/buttons/close-button.svg';

type SingleBtnAlertProps = {};

const SingleBtnAlert = ({
  title,
  message,
  onClose,
  messageColor,
  messagesize,
  mariginsize = '24px', // margin-top 설정
  ContainerWidth = '280px',
  ContainerHeight = '108px',
  AlertWidth = '386px',
  AlertHeight = '254px',
  showButtons,
  confirmLabel = '확인'
}: SingleBtnAlertProps) => {
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
      <AlertContainer
        width={AlertWidth}
        height={AlertHeight}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton onClick={handleClick}>
          <CloseIcon />
        </CloseButton>
        {/* 흰색 부분 width랑 height 설정 */}
        <TextContainer width={ContainerWidth} height={ContainerHeight}>
          {/* 제목 */}
          {title && <AlertTitle>{title}</AlertTitle>}
          {/* 내용이랑 text 색 설정 / 기본색은 검정 */}
          <AlertMessage
            color={messageColor}
            fontSize={messagesize}
            margintop={mariginsize}
          >
            {message}
          </AlertMessage>
        </TextContainer>
        {/* 확인 버튼 유무 true/false로 설정 */}
        {showButtons && (
          <Buttons>
            <Confirm onClick={handleClick}>{confirmLabel}</Confirm>
          </Buttons>
        )}
      </AlertContainer>
    </AlertOverlay>
  );
};

export default SingleBtnAlert;

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
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || 'auto'};
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  margin-left: 56px;
  margin-right: 56px;
  margin-top: 54px;
`;

const AlertTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AlertMessage = styled.div`
  font-size: ${({ fontSize }) => fontSize || '16px'};
  /* font-size: 16px; */
  font-weight: 600;
  color: ${({ color }) => color || '#000'};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${({ margintop }) => margintop || ''};
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
  background: #a60f62;
  border: 1px solid #a60f62;
  color: white;
  font-family: Pretendard;
  cursor: pointer;
`;
