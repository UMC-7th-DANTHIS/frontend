import React from 'react';
import styled from 'styled-components';
import { ReactComponent as CloseIcon } from '../assets/buttons/close-button.svg';

const Alert = ({
  title,
  message,
  onClose,
  onCancel,
  onConfirm,
  messageColor,
  messagesize,
  mariginsize,
  ContainerWidth,
  ContainerHeight,
  AlertWidth,
  AlertHeight,
  showButtons,
  confirmLabel = "예",
  cancelLabel = "아니요"
}) => {
  const handleConfirm = (e) => {
    e.stopPropagation();
    if (onConfirm) {
      onConfirm();
    }
    if (onClose) {
      onClose();
    }
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    if (onCancel) {
      onCancel();
    }
  }

  const handleClose = (e) => {
    e.stopPropagation();
    if (onClose) {
      onClose();
    }
  };

  return (
    <AlertOverlay>
      <AlertContainer width={AlertWidth} height={AlertHeight} onClick={e => e.stopPropagation()}>
        <CloseButton onClick={handleClose}>
          <CloseIcon />
        </CloseButton>
        <TextContainer width={ContainerWidth} height={ContainerHeight}>
          {title && <AlertTitle>{title}</AlertTitle>}
          <AlertMessage
            color={messageColor}
            fontSize={messagesize}
            margintop={mariginsize}
          >
            {message}
          </AlertMessage>
        </TextContainer>
        {showButtons && (
          <Buttons>
            <Cancel onClick={handleCancel}>{cancelLabel}</Cancel>
            <Confirm onClick={handleConfirm}>{confirmLabel}</Confirm>
          </Buttons>
        )}
      </AlertContainer>
    </AlertOverlay>
  );
};

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
  cursor: pointer;
`;

const Cancel = styled.button`
  display: flex;
  width: 160px;
  padding: 8px 10px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 1px solid #a60f62;
  background-color: black;
  color: white;
  cursor: pointer;
`;
