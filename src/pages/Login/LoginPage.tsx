import styled from 'styled-components';
import TextImg from '../../assets/buttons/danthis.svg';
import { ReactComponent as KakaoDesktopIcon } from '../../assets/kakaodesktop.svg';

const LoginPage = () => {
  const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY!;
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI!;
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  //const code = new URL(document.location.toString()).searchParams.get('code');

  const loginHandler = () => {
    console.log(' 카카오 로그인 요청 URL:', link); // URL 확인

    window.location.href = link;
  };

  return (
    <Layout>
      <LoginTitle>로그인</LoginTitle>
      <LoginBtn onClick={loginHandler}>
        <KakaoIcon />
        <LoginText>카카오로 로그인</LoginText>
      </LoginBtn>
      <Line />
      <Info>
        <Text src={TextImg} />
      </Info>
      <SignupTitle>회원가입</SignupTitle>
      <SignupBtn onClick={loginHandler}>
        <KakaoIcon />
        <SignupText>카카오로 회원가입</SignupText>
      </SignupBtn>
    </Layout>
  );
};

export default LoginPage;

const Layout = styled.div`
  background-color: black;
  display: flex;
  flex-direction: column;
  padding-bottom: 236px;
  padding-top: 116px;
  align-items: center;
  ${({ theme }) => theme.media.tablet} {
    padding-top: 90px;
    padding-bottom: 287px;
  }
`;
const LoginTitle = styled.div`
  color: var(--main_white, #fff);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  display: flex;
  justify-content: center;
  text-align: center;
  margin-bottom: 20px;
  ${({ theme }) => theme.media.tablet} {
    font-size: 32px;
    margin-top: 57px;
    margin-bottom: 30px;
  }
`;
const LoginBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  width: 282px;
  height: 40px;
  border-radius: 8px;
  background: #ffe812;
  padding: 4px 67px 4px 14px;
  display: flex;
  align-items: center;
  gap: 53px;
  ${({ theme }) => theme.media.tablet} {
    width: 544px;
    height: 66px;
    padding: 10px 196px 10px 26px;
    border-radius: 12px;
    gap: 120px;
  }
`;

const KakaoIcon = styled(KakaoDesktopIcon)`
  width: 36px;
  height: 36px;

  ${({ theme }) => theme.media.tablet} {
    width: 50px;
    height: 50px;
  }
`;

const LoginText = styled.span`
  color: var(--kakaotalk_label, #191919);
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  ${({ theme }) => theme.media.tablet} {
    font-size: 24px;
  }
`;

const Line = styled.div`
  width: 90vw;
  height: 1px;
  flex-shrink: 0;
  background: var(--text_secondary-gray, #b2b2b2);
  margin-top: 35px;
  justify-content: center;
  display: flex;
  align-items: center;
  ${({ theme }) => theme.media.tablet} {
    width: 1200px;
    margin-top: 71px;
  }
`;
const Info = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 57px;
  ${({ theme }) => theme.media.tablet} {
    margin-top: 71px;
  }
`;

const Text = styled.img`
  width: 195px;
  height: 37px;
  ${({ theme }) => theme.media.tablet} {
    width: 298px;
  }
`;

const SignupTitle = styled.div`
  color: var(--main_white, #fff);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  display: flex;
  justify-content: center;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 15px;
  ${({ theme }) => theme.media.tablet} {
    font-size: 32px;
    margin-bottom: 30px;
    margin-top: 20px;
  }
`;

const SignupBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  width: 282px;
  height: 40px;
  border-radius: 8px;
  background: #ffe812;
  padding: 4px 67px 4px 14px;
  display: flex;
  align-items: center;
  gap: 53px;
  ${({ theme }) => theme.media.tablet} {
    width: 544px;
    height: 66px;
    padding-left: 26px;
    border-radius: 12px;
    gap: 120px;
  }
`;

const SignupText = styled.span`
  color: var(--kakaotalk_label, #191919);
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: fit-content;
  ${({ theme }) => theme.media.tablet} {
    font-size: 24px;
  }
`;
