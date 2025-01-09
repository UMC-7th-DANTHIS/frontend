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
      <Registration>
        <Title>댄서 등록</Title>
        {!isRegistered ? (
          <NewDancerForm onRegister={handleRegister} />
        ) : (
          <RegistrationComplete />
        )}
      </Registration>
    </Container>
  );
};

export default DancerRegistration;

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
