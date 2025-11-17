import styled from 'styled-components';
import { Modal } from './Modal';

interface ModalOneBtnProps {
  title?: string;
  message?: React.ReactNode;
  onClose?: () => void;
  onPrimaryClick?: () => void;
  messageColor?: string;
  messagesize?: string;
  marginsize?: string;
  containerWidth?: string;
  containerHeight?: string;
  width?: string;
  showButtons?: boolean;
  primaryLabel?: string;
}

export const ModalOneBtn = ({
  title,
  message,
  onClose,
  onPrimaryClick,
  messageColor,
  messagesize,
  containerWidth,
  containerHeight,
  width,
  showButtons,
  primaryLabel = '확인'
}: ModalOneBtnProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    if (onClose) {
      onClose();
    }
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
          <Confirm onClick={onPrimaryClick || handleClick}>{primaryLabel}</Confirm>
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
  min-width: 240px;
  height: 100%;
  min-height: 96px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 14px;
  white-space: normal;
  word-break: keep-all;
  overflow-wrap: break-word;

  ${({ theme }) => theme.media.tablet} {
    min-width: 280px;
    min-height: 128px;
  }
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

  ${({ theme }) => theme.media.desktop} {
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
  font-size: 14px;

  ${({ theme }) => theme.media.tablet} {
    font-size: 16px;
  }
`;
