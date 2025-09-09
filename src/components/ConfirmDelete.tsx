import React from 'react';
import styled from 'styled-components';
import { ReactComponent as CloseIcon } from '../assets/buttons/close-button.svg';

interface ConfirmDeleteAlertProps {
  title?: string;
  message: React.ReactNode;
  onClose: () => void;
  onConfirm: () => void;
  messageColor?: string;
  messagesize?: string;
  mariginsize?: string;
  ContainerWidth?: string;
  ContainerHeight?: string;
  AlertWidth?: string;
  AlertHeight?: string;
  showButtons?: boolean;
  cancelLabel?: string;
  deleteLabel?: string;
}

const ConfirmDeleteAlert = ({
  title,
  message,
  onClose,
  onConfirm,
  messageColor,
  messagesize,
  mariginsize = '22.5px', //margin-top 설정
  ContainerWidth = '280px',
  ContainerHeight = '108px',
  AlertWidth = '386px',
  AlertHeight = '254px',
  showButtons,
  cancelLabel = '취소',
  deleteLabel = '삭제하기'
}: ConfirmDeleteAlertProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    if (onClose) {
      onClose();
    }
  };

  return (
    <AlertOverlay>
      <AlertContainer
        width={AlertWidth}
        height={AlertHeight}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <CloseButton onClick={handleClick}>
          <CloseIcon />
        </CloseButton>
        {/* 흰색 부분 width랑 height 설정 */}
        <TextContainer width={ContainerWidth} height={ContainerHeight}>
          {/* 제목 */}
          {title && <AlertTitle>{title}</AlertTitle>}
          {/* 내용이랑 text 색 설정 / 기본색은 검정 */}
          <AlertMessage color={messageColor} fontSize={messagesize} margintop={mariginsize}>
            {message}
          </AlertMessage>
        </TextContainer>
        {/* 예 아니요 버튼 유무 true/false로 설정 */}
        {showButtons && (
          <Buttons>
            <Leave onClick={onConfirm}>{deleteLabel}</Leave>
            <Stay onClick={handleClick}>{cancelLabel}</Stay>
          </Buttons>
        )}
      </AlertContainer>
    </AlertOverlay>
  );
};

export default ConfirmDeleteAlert;

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

const AlertContainer = styled.div<{
  width?: string;
  height?: string;
}>`
  position: relative;
  justify-items: center;
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

const TextContainer = styled.div<{
  width?: string;
  height?: string;
}>`
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

const AlertMessage = styled.div<{
  fontSize?: string;
  color?: string;
  margintop?: string;
}>`
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
  text-align: center;
`;

const Stay = styled.button`
  display: flex;
  width: 160px;
  max-width: 160px;
  padding: 8px 10px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: #a60f62;
  border: 1px solid #a60f62;
  color: var(--sub_light-gray, #ddd);
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  cursor: pointer;
`;

const Leave = styled.div`
  display: flex;
  width: 137px;
  padding: 8px 10px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 1px solid #a60f62;
  background-color: black;
  text-decoration-line: none;
  color: var(--sub_light-gray, #ddd);
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  cursor: pointer;
`;
