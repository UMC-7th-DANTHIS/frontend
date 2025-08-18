import React, {useEffect} from 'react'
import axios from 'axios'
import styled from 'styled-components'
import LoginImg from "../../assets/LoginButton.svg"
import SignupImg from "../../assets/signup.svg"
import TextImg from "../../assets/buttons/danthis.svg"

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
        <Login src={LoginImg} alt="로그인하러가기" />
      </LoginBtn>
      <Line />
      <Info>
        <Text src={TextImg} />
      </Info>
      <SignupTitle>회원가입</SignupTitle>
      <SignupBtn onClick={loginHandler}>
        <Signup src={SignupImg} alt="회원가입하러가기" />
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
  align-items: center;
   /* ${({ theme }) => theme.media.tablet} {
    padding: 120px 24px 160px;
  }
  ${({ theme }) => theme.media.desktop} {
    padding: 48px 24px 236px;
  } */
`;
const LoginTitle = styled.div`
  color: var(--main_white, #fff);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: 57px;
  display: flex;
  justify-content: center;
  text-align: center;
  margin-bottom: 30px;
    ${({ theme }) => theme.media.tablet} {
    font-size: 32px;
  }
`;
const LoginBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  //width: 544px;
  width: 282px;
   ${({ theme }) => theme.media.tablet} {
    width: 544px;
  }
   /* width: clamp(282px, 50vw, 544px); */
`;

const Login = styled.img`
  width: 100%;`;

const Line = styled.div`
  width: 1200px;
  height: 1px;
  flex-shrink: 0;
  background: var(--text_secondary-gray, #b2b2b2);
  margin-top: 71px;
  justify-content: center;
  display: flex;
  align-items: center;
`;
const Info = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 71px;
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
  margin-bottom: 30px;
  margin-top: 20px;
  ${({ theme }) => theme.media.tablet} {
    font-size: 32px;
  }
`;

const SignupBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  //width: 564px;
    width: 282px;
   ${({ theme }) => theme.media.tablet} {
    width: 544px;
  }
`;

const Signup = styled.img`
  width: 100%;`;
