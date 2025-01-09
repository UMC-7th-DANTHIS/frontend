import React, { useState } from "react";
import styled from "styled-components";
import NewClassForm from "./NewClassForm";
import RegistrationComplete from "./ResgitrationComplete";

const ClassRegistration = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = () => {
    // 수업 등록 처리
    setIsRegistered(true);
  };

  return (
    <Container>
      <Registration>
        <Title>댄스 수업 등록</Title>
        {!isRegistered ? (
          <NewClassForm onRegister={handleRegister} />
        ) : (
          <RegistrationComplete />
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
