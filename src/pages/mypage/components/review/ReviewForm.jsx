import React from 'react';
import styled from 'styled-components';

const ReviewForm = ({ title, review, handleTitle, handelReview }) => (
  <ReviewBox>
    <BoxTitle>
      <Label>제목</Label>
      <Input
        placeholder="제목을 입력하세요"
        value={title}
        onChange={handleTitle}
      />
    </BoxTitle>
    <Line />
    <BoxContent>
      <Label>내용</Label>
      <Textarea
        placeholder="내용을 입력하세요"
        value={review}
        onChange={handelReview}
      />
    </BoxContent>
  </ReviewBox>
);

export default ReviewForm;

const ReviewBox = styled.div`
  width: 660px;
  height: 400px;
  border: 2px solid #9819C3;
  border-radius: 10px;
  box-shadow: 0px 0px 5px #9819C3;
  display: flex;
  flex-direction: column;
`;

const BoxTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 6px;
`;

const Line = styled.div`
  border: 1.5px solid #B2B2B2;
  width: 555px;
  margin-left: 59px;
  margin-top: 14px;
`;

const BoxContent = styled.div`
  display: flex;
  flex-direction: row;
`;

const Label = styled.div`
  font-size: 18px;
  font-weight: 500;
  margin-left: 59px;
  line-height: normal;
  margin-top: 15px;
`;

const Input = styled.input`
  width: 292px;
  font-size: 14px;
  font-weight: 400;
  border: none;
  background-color: transparent;
  color: #fff;
  outline: none;
  margin-left: 30px;
  margin-top: 18px;

  &::placeholder {
    color: #4D4D4D;
  }
`;

const Textarea = styled.textarea`
  width: 292px;
  height: 300px;
  font-size: 14px;
  font-weight: 400;
  border: none;
  background-color: transparent;
  color: #fff;
  outline: none;
  resize: none;
  margin-top: 18.5px;
  margin-left: 30px;

  &::placeholder {
    color: #4D4D4D;
  }
`;
