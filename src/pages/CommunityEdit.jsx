import React from "react";
import styled from "styled-components";

const CommunityEdit = () => {
  return (
    <Container>
      <ContentContainer>
        <TopHeader>커뮤니티 글 작성</TopHeader>
        <Content>
          <ContentTitle>제목</ContentTitle>
          <ContentMain>내용</ContentMain>
        </Content>
        <ButtonContainer>
          <ImageButton>사진</ImageButton>
          <RightButtons>
            <CancelButton>취소</CancelButton>
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
  height: 1197px;
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

  border-bottom: 1.5px solid #b2b2b2;

  padding-top: 21px;
  padding-bottom: 14px;
  padding-left: 9px;
`;

const TitleInput = styled.input`
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  font-size: 16px;
  color: white;
  background-color: #000;
  border: 1px solid #b2b2b2;
  border-radius: 5px;
  outline: none;

  &::placeholder {
    color: #b2b2b2;
  }
`;

const ContentTextArea = styled.textarea`
  width: 100%;
  height: 300px;
  margin-top: 10px;
  padding: 10px;
  font-size: 16px;
  color: white;
  background-color: #000;
  border: 1px solid #b2b2b2;
  border-radius: 5px;
  resize: none;
  outline: none;

  &::placeholder {
    color: #b2b2b2;
  }
`;

const ContentMain = styled.div`
  padding-top: 15px;
  padding-left: 9px;

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

const ImageButton = styled.button`
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
