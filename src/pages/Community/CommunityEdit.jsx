import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const CommunityEdit = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <ContentContainer>
        <TopHeader>커뮤니티 글 작성</TopHeader>
        <Content>
          <TitleArea>
            <ContentTitle>제목</ContentTitle>
            <TitleInput placeholder="제목을 입력하세요." />
          </TitleArea>
          <ContentArea>
            <ContentMain>내용</ContentMain>
            <ContentInput placeholder="내용을 입력하세요." />
          </ContentArea>
        </Content>
        <ButtonContainer>
          <ImageInput>
            사진
            <input type="file" />
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
      </ContentContainer>
    </Container>
  );
};

const Container = styled.div`
  background-color: #000000;
  padding-bottom: 100px;
`;

const TopHeader = styled.div`
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  color: white;

  margin-left: 55px;
  margin-right: 800px;
`;

const ContentContainer = styled.div`
  margin-left: 235px;
  margin-right: 205px;
  height: 100%;
`;

const Content = styled.div`
  margin-top: 44px;
  padding-left: 50px;
  padding-right: 50px;
  border: 2px solid #9819c3;
  border-radius: 10px;

  width: 900px;
  height: 500px;
`;

const ContentTitle = styled.div`
  color: #fff;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const TitleArea = styled.div`
  display: flex;
  justify-content: space-between;

  border-bottom: 1.5px solid #b2b2b2;

  padding-top: 21px;
  padding-bottom: 14px;
  padding-left: 9px;
`;

const TitleInput = styled.input`
  border: transparent;
  background-color: transparent;
  outline: none;

  color: white;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &::placeholder {
    color: #4d4d4d;
    font-size: 14px;
  }

  width: 92%;
  height: 100%;
`;

const ContentArea = styled.div`
  display: flex;
  justify-content: space-between;

  padding-top: 15px;
  padding-left: 9px;

  display: flex;
`;

const ContentInput = styled.textarea`
  background-color: transparent;
  border: transparent;
  resize: none;
  outline: none;

  color: white;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &::placeholder {
    color: #4d4d4d;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  width: 92%;
  height: 390px;
`;

const ContentMain = styled.div`
  color: #fff;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
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

export default CommunityEdit;
