import styled from 'styled-components';
import { Modal } from './Modal';

interface ModalAgreeProps {
  onClose: () => void;
  title?: string;
  message: React.ReactNode;
}

export const ModalAgree = ({ onClose, title, message }: ModalAgreeProps) => {
  return (
    <Modal onClose={onClose} width="565px" widthMobile="312px">
      <TextContainer>
        <Title> {title} </Title>
        <Message> {message} </Message>
      </TextContainer>
    </Modal>
  );
};

const TextContainer = styled.div`
  border-radius: 10px;
  background: var(--main-white);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  jusitfy-content: center;
  padding: 20px 16px 32px 16px;
  gap: 26px;
  align-items: center;
  width: 100%;

  ${({ theme }) => theme.media.tablet} {
    padding: 35px 44px 48px 44px;
  }
`;

const Title = styled.div`
  color: #000;
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  ${({ theme }) => theme.media.tablet} {
    font-size: 20px;
  }
`;

const Message = styled.div`
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  max-height: 218px;
  overflow-y: scroll;

  ${({ theme }) => theme.media.tablet} {
    max-height: 218px;
  }
`;
