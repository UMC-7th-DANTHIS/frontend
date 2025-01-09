import React from "react";
import styled from "styled-components";

const InputBox = ({ label, value, onChange, placeholder }) => {
  return (
    <div>
      <Label>{label}</Label>
      <Input value={value} onChange={onChange} placeholder={placeholder} />
    </div>
  );
};

const TextareaBox = ({ label, value, onChange, placeholder }) => {
  return (
    <div>
      <Label>{label}</Label>
      <Textarea value={value} onChange={onChange} placeholder={placeholder} />
    </div>
  );
};

const UrlBox = ({ value, onChange, placeholder }) => {
  return (
    <UrlContainer>
      <Label>URL</Label>
      <UrlInput value={value} onChange={onChange} placeholder={placeholder} />
    </UrlContainer>
  );
};

export { InputBox, TextareaBox, UrlBox };

const Label = styled.div`
  margin-left: 8px;
  color: var(--main_white, #fff);
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const Input = styled.input`
  width: 525px;
  flex-shrink: 0;
  margin-top: 10px;
  margin-bottom: 27px;
  padding: 18px 32px;
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
const Textarea = styled.textarea`
  width: 525px;
  height: 466px;
  flex-shrink: 0;
  margin-top: 10px;
  margin-bottom: 28px;
  padding: 24px 30px;
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
const UrlContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 589px;
`;
const UrlInput = styled.input`
  width: 435px;
  height: 18px;
  flex-shrink: 0;
  margin-left: 21px;
  padding: 20px 32px;
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
