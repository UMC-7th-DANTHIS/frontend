import react, { useState } from "react";
import styled from "styled-components";
import NewDancerForm from "./NewDancerForm";
import RegistrationComplete from "./ResgitrationComplete";

const DancerRegistration = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = () => {
    // 댄서 등록 처리
    setIsRegistered(true);
  };

  return (
    <Container>
      <AddDancerTitle>댄서 등록</AddDancerTitle>
      {!isRegistered ? (
        <NewDancerForm onRegister={handleRegister} />
      ) : (
        <RegistrationComplete />
      )}
    </Container>
  );
};

export default DancerRegistration;

const Container = styled.div`
  width: 1440px;
  background-color: black;
  justify-items: center;
  border-top: 1px solid white; // 임시
`;
const AddDancerTitle = styled.div`
  color: var(--main_white, #fff);
  font-family: Pretendard;
  font-size: 48px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: 65.72px; // 질문
  margin-bottom: 69.93px; // 질문
`;
