import React, { useEffect } from 'react';
import styled from 'styled-components';

const ImageModal = ({ imgUrl, setIsModalOpen, index }) => {
  // 이미지 확대 모달창
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsModalOpen(null); // Escape 키로 모달 닫기
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [setIsModalOpen]);

  return (
    <Modal onClick={() => setIsModalOpen(null)}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalImage src={imgUrl} alt={`photo ${index}`} />
        <CloseButton onClick={() => setIsModalOpen(null)}>✕</CloseButton>
      </ModalContent>
    </Modal>
  );
};

export default ImageModal;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 30rem;
  height: auto;
  transform: translate(-50%, -50%);
  padding: 20px;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #929292;
`;
const ModalImage = styled.img`
  max-width: 80%;
  max-height: 80%;
`;
const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;

  &:hover {
    color: #ff6961;
  }
`;
