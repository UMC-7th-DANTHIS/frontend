import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const EditFooter = ({ handleFileChange }) => {
  const navigate = useNavigate();

  return (
    <>
      <ButtonContainer>
        <ImageInput>
          사진
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            accept="image/*"
          />
        </ImageInput>
        <RightButtons>
          <CancelButton onClick={() => navigate('/community')}>
            취소
          </CancelButton>
          <SubmitButton>작성</SubmitButton>
        </RightButtons>
      </ButtonContainer>
      <CatuionContainer>
        <CautionText>
          * 과도한 비방 및 욕설이 포함된 게시글은 신고에 의해 무통보 삭제될 수
          있습니다.
        </CautionText>
        <CautionText>
          * 초상권, 저작권 침해 및 기타 위법한 게시글은 관리자에 의해 무통보
          삭제될 수 있습니다.
        </CautionText>
      </CatuionContainer>
    </>
  );
};

const CatuionContainer = styled.div`
  margin-left: 40px;
  margin-top: 20px;

  color: white;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const CautionText = styled.div`
  margin-bottom: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 21px;
  margin-left: 40px;
  margin-right: 14px;
`;

const ImageInput = styled.label`
  display: inline-block;
  background-color: transparent;
  border: 2px solid #9819c3;
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-align: center;

  &:hover {
    background-color: #9819c3;
    color: #fff;
  }

  input[type='file'] {
    display: none;
  }
`;

const RightButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const CancelButton = styled.button`
  background-color: transparent;
  border: 2px solid #9819c3;
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;

  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  &:hover {
    background-color: #9819c3;
    color: #fff;
  }
`;

const SubmitButton = styled.button`
  background-color: #9819c3;
  border: none;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;

  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  &:hover {
    background-color: #7c16a6;
  }
`;

export default EditFooter;
