import styled from 'styled-components';

export const SubmitButton = ({ text }: { text: string }) => {
  return (
    <Btn type="submit">
      <BtnText>{text}</BtnText>
    </Btn>
  );
};

const Btn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 52px;
  flex-shrink: 0;
  margin-top: 34px;
  border: none;
  border-radius: 15px;
  background: var(--main_purple, #9819c3);

  &:hover {
    cursor: pointer;
  }
`;
const BtnText = styled.span`
  color: var(--main_white, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
