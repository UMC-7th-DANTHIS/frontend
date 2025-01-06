import React from "react";
import styled from "styled-components";
import Check from "../../assets/check.svg";

const RegistrationComplete = () => {
  return (
    <Container>
      <Ellipse>
        <CheckIcon src={Check} alt="Check Icon" />
      </Ellipse>
      <CompleteMsg>댄서 등록 신청이 완료되었어요!</CompleteMsg>
      <DetailMsg>
        운영진의 검토 이후 댄서로 등록될 수 있어요. {"\n"}
        등록 신청에 감사드려요 :)
      </DetailMsg>
      <BackToHomeBtn type="button" onClick={() => {}}>
        <BackToHomeBtnMsg>홈 화면으로 돌아가기</BackToHomeBtnMsg>
      </BackToHomeBtn>
    </Container>
  );
};

export default RegistrationComplete;

const Container = styled.div`
  height: 980.72px;
  justify-items: center;
`;
const Ellipse = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 320px;
  height: 320px;
  flex-shrink: 0;
  border-radius: 320px;
  background: var(
    --main-gradation,
    linear-gradient(90deg, #b30505 0%, #9819c3 100%)
  );
`;
const CheckIcon = styled.img`
  width: 196.684px;
  height: 143.675px;
  flex-shrink: 0;
  fill: var(--main_white, #fff);
`;
const CompleteMsg = styled.div`
  color: var(--main_white, #fff);
  font-family: Pretendard;
  font-size: 30px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: 70.96px;
  margin-bottom: 40px;
`;
const DetailMsg = styled.div`
  color: var(--text_secondary-gray, #b2b2b2);
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  white-space: pre-line;
`;
const BackToHomeBtn = styled.button`
  width: 300px;
  height: 52px;
  flex-shrink: 0;
  border-radius: 15px;
  background: var(--main_purple, #9819c3);
  margin-top: 59.51px;
`;
const BackToHomeBtnMsg = styled.div`
  color: var(--main_white, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
