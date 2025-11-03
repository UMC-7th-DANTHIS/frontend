import styled from 'styled-components';
import { Modal } from './Modal';

interface ModalTwoBtnsProps {
  title?: string;
  message?: React.ReactNode;
  onClose?: () => void;
  onSecondaryClick?: () => void;
  onPrimaryClick?: () => void;
  messageColor?: string;
  messagesize?: string;
  marginsize?: string;
  containerWidth?: string;
  containerHeight?: string;
  width?: string;
  showButtons?: boolean;
  primaryLabel?: string;
  secondaryLabel?: string;
}

export const ModalTwoBtns = ({
  title,
  message,
  onClose,
  onSecondaryClick,
  onPrimaryClick,
  messageColor,
  messagesize,
  containerWidth,
  containerHeight,
  width,
  showButtons,
  primaryLabel = '예',
  secondaryLabel = '아니요'
}: ModalTwoBtnsProps) => {
  const handleConfirm = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPrimaryClick?.();
    onClose?.();
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSecondaryClick?.();
  };

  return (
    <Modal onClose={onClose} width={width}>
      <TextContainer width={containerWidth} height={containerHeight}>
        {title && <AlertTitle>{title}</AlertTitle>}
        <AlertMessage color={messageColor} fontSize={messagesize}>
          {message}
        </AlertMessage>
      </TextContainer>
      {showButtons && (
        <Buttons>
          <Cancel onClick={handleCancel}>{secondaryLabel}</Cancel>
          <Confirm onClick={handleConfirm}>{primaryLabel}</Confirm>
        </Buttons>
      )}
    </Modal>
  );
};

const TextContainer = styled.div<{
  width?: string;
  height?: string;
}>`
  border-radius: 10px;
  background: var(--main-white);
  width: 100%;
  height: 100%;
  min-height: 108px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 26px;
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
}>`
  font-size: 14px;
  font-weight: 600;
  color: ${({ color }) => color || 'var(--main-black)'};
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.media.tablet} {
    font-size: ${({ fontSize }) => fontSize || '16px'};
  }
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
  border-radius: 8px;
  background: var(--main-magenta);
  border: 1px solid var(--main-magenta);
  color: white;
  cursor: pointer;
`;

const Cancel = styled.button`
  display: flex;
  width: 160px;
  padding: 8px 10px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: 1px solid var(--main-magenta);
  background-color: black;
  color: white;
  cursor: pointer;
`;
