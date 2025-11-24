import React, {useEffect} from 'react'
import axios from 'axios'
import styled from 'styled-components'
import LoginMobile from "../../assets/buttons/LoginMobile.svg"
import LoginDesktop from "../../assets/buttons/LoginDesktop.svg"
import SignupMobile from "../../assets/buttons/SignupMobile.svg"
import SignupDesktop from "../../assets/buttons/SignupDesktop.svg"
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
        <Login alt="로그인하러가기" />
      </LoginBtn>
      <Line />
      <Info>
        <Text src={TextImg} />
      </Info>
      <SignupTitle>회원가입</SignupTitle>
      <SignupBtn onClick={loginHandler}>
        <Signup alt="회원가입하러가기" />
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
   ${({ theme }) => theme.media.tablet} {
    width: 544px;
    height: 66px;
  }
`;

const Login = styled.img`
  width: 100%;
  content: url(${LoginMobile}); 
  ${({ theme }) => theme.media.tablet} {
    content: url(${LoginDesktop}); 
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
   ${({ theme }) => theme.media.tablet} {
    width: 544px;
    height: 66px;
  }
`;

const Signup = styled.img`
     width: 100%;
  content: url(${SignupMobile}); 

  ${({ theme }) => theme.media.tablet} {
    content: url(${SignupDesktop}); 
  }
  `;
