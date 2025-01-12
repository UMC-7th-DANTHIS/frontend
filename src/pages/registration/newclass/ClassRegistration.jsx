import React, { useState } from "react";
import styled from "styled-components";
import ClassForm from "./ClassForm";
import Complete from "../components/Complete";

const ClassRegistration = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  // 등록 완료 메시지
  const title = "댄스 수업 등록 신청이 완료되었어요!";
  const detail =
    "운영진의 검토 이후, 정식 댄스 수업으로 등록될 수 있어요. \n등록 신청에 감사드려요 :)";

  const handleRegister = () => {
    // 수업 등록 처리
    setIsRegistered(true);
  };

  return (
    <Container>
      <Registration>
        <Title>댄스 수업 등록</Title>
        {!isRegistered ? (
          <ClassForm onRegister={handleRegister} />
        ) : (
          <Complete title={title} detail={detail} />
        )}
      </Registration>
    </Container>
  );
};

export default ClassRegistration;

const Container = styled.div`
  display: flex;
  background-color: black;
  justify-content: center;
`;
const Registration = styled.div`
  width: 1440px;
  justify-items: center;
`;
const Title = styled.div`
  color: var(--main_white, #fff);
  font-family: Pretendard;
  font-size: 48px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: 33px;
  margin-bottom: 70px;
`;
