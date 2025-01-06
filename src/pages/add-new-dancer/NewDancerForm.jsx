import React from "react";
import styled from "styled-components";

const NewDancerForm = ({ onRegister }) => {
  return (
    <FormContainer>
      <InfoContainer></InfoContainer>
      <Notice>*댄서 등록은 내부 운영팀의 심사를 통해 최종 승인됩니다.</Notice>
      <RegBtn type="button" onClick={onRegister}>
        <RegBtnMsg>댄서 등록하기</RegBtnMsg>
      </RegBtn>
    </FormContainer>
  );
};

export default NewDancerForm;

const FormContainer = styled.form`
  height: 2076.72px;
  justify-items: center;
`;
const InfoContainer = styled.div`
  width: 900px;
  height: 1593.515px;
  flex-shrink: 0;
  border-radius: 25px;
  border: 2px solid var(--main_purple, #9819c3);
`;
const Notice = styled.div`
  color: var(--text_secondary-gray, #b2b2b2);
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: 42.71px;
  margin-bottom: 34.06px;
`;
const RegBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 52px;
  flex-shrink: 0;
  border-radius: 15px;
  background: var(--main_purple, #9819c3);

  &:hover {
    cursor: pointer;
  }
`;
const RegBtnMsg = styled.span`
  color: var(--main_white, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
