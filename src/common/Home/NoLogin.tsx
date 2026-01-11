import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const NoLogin = () => {
  const navigate = useNavigate();

  return (
    <TextContainer>
      <TextWrapper>
        <TitleText>
          Danthis와 함께 하면
          <br />
          <HightligtText>나에게 딱 맞는 댄서와 수업</HightligtText>을
          <br />
          추천해드려요!
        </TitleText>
      </TextWrapper>

      <LoginButton onClick={() => navigate('/login')}>
        로그인 하러가기
      </LoginButton>
    </TextContainer>
  );
};

const TextContainer = styled.main`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;

  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);

  overflow: hidden;

  padding-top: 70px;
  padding-bottom: 70px;

  gap: 140px;
`;

const TextWrapper = styled.div`
  display: flex;

  width: 100%;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const TitleText = styled.div`
  color: #fff;

  font-size: 40px;
  font-style: normal;
  font-weight: 600;

  line-height: 1.4;
`;

const HightligtText = styled.span`
  color: #bf00ff;

  font-size: 40px;
  font-style: normal;
  font-weight: 600;

  line-height: 1.4;
`;

const LoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 510px;
  height: 60px;

  background-color: #000000;
  border-radius: 1000px;
  border: 1.5px solid var(--main_purple, #9819c3);

  box-shadow: 0 0 20px 0 #9819c3 inset;

  color: var(--main_white, #ffffff);
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.02em;

  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 0 30px 0 #9819c3 inset;
    filter: brightness(1.1);
  }

  &:active {
    transform: scale(0.97);
  }
`;
