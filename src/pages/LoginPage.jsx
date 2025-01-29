import React, {useEffect} from 'react'
import axios from 'axios'
import styled from 'styled-components'
import LoginImg from "../assets/LoginButton.svg"
import LogoImg from "../assets/logo.svg"
import SignupImg from "../assets/signup.svg"

const LoginPage = () => {
  
  //const link = `https://api.danthis.site/auth/login/kakao`;
  const REST_API_KEY = '5404b0149b95af5aeca51b6c4d4dd9e4';
  const REDIRECT_URI = 'http://localhost:3000/oauth/kakao/callback';
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  
  //const code = new URL(document.location.toString()).searchParams.get('code');
  
  const loginHandler = () => {
    window.location.href = link;
  };

  // useEffect(() => {
  //   const code = new URL(window.location.href).searchParams.get("code"); // 인가 코드 추출
  //   console.log(code);
  //   if (code) {
  //     axios.post(`https://api.danthis.site/auth/login/kakao?code=${code}`)
  //       .then((response) => {
  //         console.log("로그인 성공!", response.data);
  //         localStorage.setItem("token", response.data.access_token); // 토큰 저장
  //         //navigate("/home"); // 로그인 성공 후 홈으로 이동
  //       })
  //       .catch((error) => {
  //         console.error("로그인 실패", error);
  //       });
  //   }
  // }, []);
 

  return (
    <Layout>
      <LoginTitle>로그인</LoginTitle>
      <LoginBtn onClick={loginHandler}>
      <Login src={LoginImg} alt = "로그인하러가기" />
      </LoginBtn>
      <Line />
      <Info>
      <Text> 아직  </Text>
      <Logo src ={LogoImg} />
      <Text>의 회원이 아니신가요?</Text>
      </Info>
      <SignupBtn>
        <Signup src={SignupImg} alt = "회원가입하러가기" />
      </SignupBtn>
    </Layout>
  )
}

export default LoginPage;

const Layout= styled.div`
background-color : black;
display:flex;
flex-direction : column;
padding-bottom : 236px;
align-items : center;
`
const LoginTitle=styled.div`
color: var(--main_white, #FFF);
font-family: Pretendard;
font-size: 44px;
font-style: normal;
font-weight: 600;
line-height: normal;
margin-top : 15.72px;
display : flex;
justify-content : center;
text-align : center;
`
const LoginBtn = styled.button`
background : none;
border : none;
margin-top : 48.72px;
cursor : pointer;

`

const Login = styled.img`

`
const Line = styled.div`
width: 1200px;
height: 1px;
flex-shrink: 0;
background: var(--text_secondary-gray, #B2B2B2);
margin-top : 88.14px;
justify-content : center;
display : flex;
align-items : center;
`
const Info = styled.div`
display : flex;
flex-direction : row;
align-items : center;
justify-content : center;
margin-top : 88.14px;
`

const Text=styled.div`
color: var(--main_white, #FFF);
font-family: Pretendard;
font-size: 44px;
font-style: normal;
font-weight: 600;
line-height: normal;
`

const Logo=styled.img`
width: 160.972px;
height: 41.351px;
flex-shrink: 0;
display : flex;
align-items : center;
margin-left : 19px;
`

const SignupBtn = styled.button`
background : none;
border : none;
margin-top : 48.72px;
`

const Signup = styled.img`
`
