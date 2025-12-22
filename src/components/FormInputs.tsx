import styled from 'styled-components';
import { addPostposition } from '../utils/format';

interface BaseInputProps<T extends HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<T>) => void;
  placeholder?: string;
  maxLength?: number;
}

type InputProps = BaseInputProps<HTMLInputElement>;
type TextareaProps = BaseInputProps<HTMLTextAreaElement>;

export const Input = ({ label, value, onChange, placeholder, maxLength }: InputProps) => {
  const isExeedingMaxLength = maxLength && value.length > maxLength;

  return (
    <Container>
      <InputBox value={value} onChange={onChange} placeholder={placeholder} />
      {isExeedingMaxLength && label && (
        <WarningMessage>
          {addPostposition(label)} 최대 {maxLength}자까지 입력 가능합니다.
        </WarningMessage>
      )}
    </Container>
  );
};

export const Textarea = ({ label, value, onChange, placeholder, maxLength }: TextareaProps) => {
  const isExeedingMaxLength = maxLength && value.length > maxLength;

  return (
    <Container>
      <TextareaBox value={value} onChange={onChange} placeholder={placeholder} />
      {isExeedingMaxLength && label && (
        <WarningMessage>
          {addPostposition(label)} 최대 {maxLength}자까지 입력 가능합니다.
        </WarningMessage>
      )}
    </Container>
  );
};

export const UrlInput = ({ value, onChange, placeholder }: InputProps) => {
  return (
    <ShortInput>
      <label>URL</label>
      <input value={value} onChange={onChange} placeholder={placeholder} />
    </ShortInput>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
`;
const InputBox = styled.input`
  width: 100%;
  flex-shrink: 0;
  box-sizing: border-box;
  padding: 12px 10px;
  border-radius: 8px;
  border: 1px solid var(--sub-light-gray);
  background-color: transparent;
  color: var(--text-secondary-gray);

  font-family: Pretendard;
  font-size: 12px;
  font-weight: 400;
  transition: all 0.2s ease-in-out;

  &:hover {
    border: 1px solid var(--main-purple);
  }

  &:focus::placeholder {
    color: transparent;
  }

  ${({ theme }) => theme.media.tablet} {
    padding: 12px 14px;
    font-size: 16px;
  }

  ${({ theme }) => theme.media.desktop} {
    padding: 20px 30px;
  }
`;
const TextareaBox = styled.textarea`
  width: 100%;
  min-height: 432px;
  flex-shrink: 0;
  margin-top: 10px;
  margin-bottom: 28px;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid var(--sub-light-gray);
  background-color: transparent;

  color: var(--text-secondary-gray);
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 300;
  font-family: inherit;
  transition: all 0.2s ease-in-out;
  resize: none;

  &:hover {
    border: 1px solid var(--main-purple);
  }

  &:focus::placeholder {
    color: transparent;
  }

  ${({ theme }) => theme.media.tablet} {
    padding: 12px 14px;
    font-size: 16px;
  }

  ${({ theme }) => theme.media.desktop} {
    padding: 24px 30px;
  }
`;
const WarningMessage = styled.div`
  position: absolute;
  bottom: -20px;
  right: 0px;
  color: var(--highlight-red);
  text-align: right;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 400;

  ${({ theme }) => theme.media.tablet} {
    font-size: 14px;
  }
`;
const ShortInput = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;

  label {
    color: var(--main-white);
    font-size: 14px;
    font-weight: 600;
    flex-shrink: 0;

    ${({ theme }) => theme.media.tablet} {
      margin-left: 28px;
      font-size: 20px;
    }
  }

  input {
    flex: 1;
    padding: 8px 10px;
    border-radius: 8px;
    border: 1px solid var(--sub-light-gray);
    background-color: transparent;
    color: var(--text-secondary-gray);

    font-family: Pretendard;
    font-size: 12px;
    font-weight: 300;

    ${({ theme }) => theme.media.tablet} {
      padding: 12px 14px;
      font-size: 16px;
    }

    ${({ theme }) => theme.media.desktop} {
      padding: 20px 30px;
    }

    &:hover {
      border: 1px solid var(--main-purple);
    }

    &:focus::placeholder {
      color: transparent;
    }
  }
`;
