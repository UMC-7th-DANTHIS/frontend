import React from 'react';
import styled from 'styled-components';

// 은/는 처리 함수
const addPostposition = (word) => {
  const hasJongseong = (word) => {
    const lastChar = word[word.length - 1];
    const code = lastChar.charCodeAt(0);
    return (code - 0xac00) % 28 !== 0;
  };
  return hasJongseong(word) ? `${word}은` : `${word}는`;
};

const Input = ({ label, value, onChange, placeholder, maxLength }) => {
  const isExeedingMaxLength = maxLength && value.length > maxLength;

  return (
    <Container>
      <InputBox value={value} onChange={onChange} placeholder={placeholder} />
      {isExeedingMaxLength && (
        <WarningMessage>
          {addPostposition(label)} 최대 {maxLength}자까지 입력 가능합니다.
        </WarningMessage>
      )}
    </Container>
  );
};

const Textarea = ({ label, value, onChange, placeholder, maxLength }) => {
  const isExeedingMaxLength = maxLength && value.length > maxLength;

  return (
    <Container>
      <TextareaBox
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {isExeedingMaxLength && (
        <WarningMessage>
          {label}은 최대 {maxLength}자까지 입력 가능합니다.
        </WarningMessage>
      )}
    </Container>
  );
};

const ShortInput = ({ value, onChange, placeholder }) => {
  return (
    <ShortContainer>
      <ShortInputBox
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </ShortContainer>
  );
};

export { Input, Textarea, ShortInput };

const Container = styled.div`
  position: relative;
`;
const InputBox = styled.input`
  width: 525px;
  flex-shrink: 0;
  margin-top: 10px;
  margin-bottom: 27px;
  padding: 18px 32px;
  border-radius: 8px;
  border: 1px solid var(--sub_light-gray, #ddd);
  background-color: transparent;
  color: var(--text_secondary-gray, #b2b2b2);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;

  &:hover {
    border: 1px solid var(--main_purple, #9819c3);
  }

  &:focus::placeholder {
    color: transparent;
  }
`;
const TextareaBox = styled.textarea`
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
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;

  &:hover {
    border: 1px solid var(--main_purple, #9819c3);
  }

  &:focus::placeholder {
    color: transparent;
  }
`;
const WarningMessage = styled.div`
  position: absolute;
  bottom: 5px;
  right: 0px;
  color: var(--highlight_red, #f00);
  text-align: right;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const ShortContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 589px;
`;
const ShortInputBox = styled.input`
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

  &:hover {
    border: 1px solid var(--main_purple, #9819c3);
  }
`;
