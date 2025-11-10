import styled from 'styled-components';
import { ReactComponent as CloseIcon } from '../../assets/buttons/close-button.svg';
import { PropsWithChildren } from 'react';

interface ModalProps {
  onClose?: () => void;
  width?: string;
  widthMobile?: string;
}

/**
 * 기본 모달 틀 컴포넌트
 */
export const Modal = ({ onClose, width = '392px', widthMobile = '312px', children }: PropsWithChildren<ModalProps>) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  return (
    <AlertOverlay onClick={handleOverlayClick}>
      <AlertContainer width={width} widthMobile={widthMobile} onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={() => onClose?.()}>
          <CloseIcon />
        </CloseButton>

        {children}
      </AlertContainer>
    </AlertOverlay>
  );
};

const AlertOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const AlertContainer = styled.div<{
  width?: string;
  widthMobile?: string;
}>`
  position: relative;
  background-color: var(--main-black);
  border-radius: 18px;
  max-width: ${({ widthMobile }) => widthMobile};
  padding: 44px 32px 32px 32px;
  text-align: center;
  border: 3px solid var(--main-magenta);
  box-shadow: 0px 0px 11.9px 2px var(--main-magenta);

  ${({ theme }) => theme.media.tablet} {
    max-width: ${({ width }) => width || 'auto'};
    border-radius: 23px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 10px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  ${({ theme }) => theme.media.tablet} {
    top: 8px;
    right: 12px;
  }
`;
