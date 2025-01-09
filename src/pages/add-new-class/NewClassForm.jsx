import React, { useState } from "react";
import styled from "styled-components";

const NewClassForm = ({ onRegister }) => {
  // 수업 등록 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {};
    onRegister(formData);
    console.log(formData); // 임시
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <InputContainer>
        <div>
          <Label>수업 이름</Label>
          <InputBox onChange={(e) => {}} placeholder="수업 이름을 입력하세요" />
        </div>
      </InputContainer>

      <Notice>
        *댄스 수업 등록은 내부 운영팀의 심사를 통해 최종 승인됩니다
      </Notice>
      <RegBtn type="submit">
        <RegBtnText>댄스 수업 등록하기</RegBtnText>
      </RegBtn>
    </FormContainer>
  );
};

export default NewClassForm;

const FormContainer = styled.form`
  justify-items: center;
  padding-bottom: 142.79px;
`;
const InputContainer = styled.div`
  width: 900px;
  flex-shrink: 0;
  padding-top: 58.23px;
  padding-bottom: 64.09px;
  justify-items: center;
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
const Label = styled.div`
  margin-bottom: 10px;
  margin-left: 8.11px;
  color: var(--main_white, #fff);
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const InputBox = styled.input`
  width: 524.72px;
  flex-shrink: 0;
  margin-bottom: 27.42px;
  padding: 18px 31.64px;
  border-radius: 8px;
  border: 1px solid var(--sub_light-gray, #ddd);
  background-color: transparent;
  color: var(--text_secondary-gray, #b2b2b2);

  /* 입력창/내용 */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;
const TextareaBox = styled.textarea`
  width: 524.72px;
  height: 466px;
  flex-shrink: 0;
  margin-bottom: 27.42px;
  padding: 23.64px 30.29px;
  border-radius: 8px;
  border: 1px solid var(--sub_light-gray, #ddd);
  background-color: transparent;
  color: var(--text_secondary-gray, #b2b2b2);

  /* 입력창/내용 */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;
const GenreBtn = styled.button`
  display: flex;
  width: 160px;
  max-width: 160px;
  padding: 8px 10px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  border: 1px solid
    ${(props) =>
      props.selected
        ? "var(--main_purple, #9819C3)"
        : "var(--sub_light-gray, #ddd)"};
  background-color: ${(props) =>
    props.selected ? "var(--main_purple, #9819C3)" : "transparent"};

  color: var(--sub_light-gray, #ddd);
  text-align: center;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  &:hover {
    cursor: pointer;
    border: 1px solid var(--main_purple, #9819c3);
  }

  &:nth-last-child(1) {
    grid-column: 2;
  }
`;
// 제출 버튼
const RegBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 52px;
  flex-shrink: 0;
  border: none;
  border-radius: 15px;
  background: var(--main_purple, #9819c3);

  &:hover {
    cursor: pointer;
  }
`;
const RegBtnText = styled.span`
  color: var(--main_white, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
