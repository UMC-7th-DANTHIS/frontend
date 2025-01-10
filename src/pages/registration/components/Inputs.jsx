import React from "react";
import styled from "styled-components";
import { ReactComponent as StarFilled } from "../../../assets/buttons/starlevel_filled.svg";
import { ReactComponent as StarNonfilled } from "../../../assets/buttons/starlevel_nonfilled.svg";

const Input = ({ label, value, onChange, placeholder }) => {
  return (
    <div>
      <Label>{label}</Label>
      <InputBox value={value} onChange={onChange} placeholder={placeholder} />
    </div>
  );
};

const Textarea = ({ label, value, onChange, placeholder }) => {
  return (
    <div>
      <Label>{label}</Label>
      <TextareaBox
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

const StarRating = ({ label, value, updateForm }) => {
  const totalStars = 5;

  return (
    <div>
      <Label>{label}</Label>
      <StarsContainer>
        {Array.from({ length: totalStars }, (_, index) => {
          const isFilled = index < value; // value == 2 이면 index 0, 1이 true

          return (
            <StarBtn key={index} onClick={() => updateForm("level", index + 1)}>
              {isFilled ? <StarFilled /> : <StarNonfilled />}
            </StarBtn>
          );
        })}
      </StarsContainer>
    </div>
  );
};

const ShortInput = ({ label, value, onChange, placeholder }) => {
  return (
    <ShortContainer>
      <Label>{label}</Label>
      <ShortInputBox
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </ShortContainer>
  );
};

export { Input, Textarea, StarRating, ShortInput };

const Label = styled.div`
  margin-left: 8px;
  color: var(--main_white, #fff);
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
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

  /* 입력창/내용 */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
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

  /* 입력창/내용 */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;
const StarsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 588px;
  margin: 9px 0 28px 8px;
`;
const StarBtn = styled.div`
  cursor: "pointer";
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
`;
