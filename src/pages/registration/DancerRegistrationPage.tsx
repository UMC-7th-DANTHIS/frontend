import { useState } from 'react';
import styled from 'styled-components';

import DancerForm from '../../common/registration/DancerForm';
import { RegisterComplete } from '../../common/registration';

export default function DancerRegistrationPage() {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  // 등록 완료 메시지
  const title = '댄서 등록 신청이 완료되었어요!';
  const detail = '운영진의 검토 이후 댄서로 등록될 수 있어요. \n등록 신청에 감사드려요 :)';

  return (
    <Container>
      <Registration>
        <Title>댄서 등록</Title>
        {!isRegistered ? (
          <DancerForm setIsRegistered={setIsRegistered} />
        ) : (
          <RegisterComplete title={title} detail={detail} />
        )}
      </Registration>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: black;
  justify-content: center;
`;
const Registration = styled.div`
  width: 1440px;
  justify-content: center;
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
