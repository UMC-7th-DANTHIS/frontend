import styled from 'styled-components';

const Container = styled.div`
  padding-top: 30px;
  background-color: #000000;
  padding-bottom: 100px;
  width: 100%;
  max-width: 900px;
  padding: 0 2rem;
  margin-bottom: 30px;
`;

const Wrapper = styled.div`
  color: white;
`;

const PostHeader = styled.div`
  border-bottom: 1.5px solid #d9d9d9;
  margin-bottom: 20px;
  text-align: center;

  div {
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;

    margin-bottom: 20px;
  }
`;

const CommentSection = styled.div`
  padding-top: 47px;
  border-top: 1px solid #d9d9d9;
`;

const CommentInput = styled.div`
  padding-top: 23px;
  display: flex;
  gap: 20px;

  input {
    flex: 1;
    padding: 10px;
    padding-left: 37px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: transparent;
    color: white;
    font-size: 16px;
  }

  button {
    padding: 13px 18px;
    background-color: #9819c3;
    border: none;
    color: white;
    border-radius: 10px;
    font-size: 16px;
    cursor: pointer;
  }
`;

const InactiveButton = styled.div`
  min-width: 64px;
  min-height: 30px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: grey;
  border: none;
  color: white;
  border-radius: 10px;
  font-size: 16px;
  cursor: inactive;
`;

const BackButton = styled.div`
  width: 90px;
  height: 27px;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 10px;
  border: 1px solid #bf00ff;
  background-color: transparent;
  color: #bf00ff;
  text-align: center;
  cursor: pointer;

  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 49px;
  padding-top: 32px;

  border-top: 1.5px solid #d9d9d9;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    min-width: 64px;
    min-height: 30px;

    background-color: #9819c3;
    border: none;
    color: white;
    border-radius: 10px;
    font-size: 16px;
    cursor: pointer;
  }
`;

const CautionContainer = styled.div`
  margin-top: 10px;
  min-height: 20px;
  color: #f00;
  font-size: 14px;
  text-align: right;
  margin-bottom: 10px;
`;

const AlertText = styled.span`
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px;
  white-space: pre-line;
`;
const ColoredText = styled.span`
  color: #a60f62;
  font-weight: bold;
`;

export {
  Container,
  Wrapper,
  PostHeader,
  CommentSection,
  CommentInput,
  InactiveButton,
  BackButton,
  PaginationContainer,
  ButtonWrapper,
  CautionContainer,
  AlertText,
  ColoredText
};
