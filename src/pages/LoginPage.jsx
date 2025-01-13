import React from 'react'
import styled from 'styled-components'
import LoginImg from "../assets/LoginButton.svg"
import LogoImg from "../assets/logo.svg"
import SignupImg from "../assets/signup.svg"

const LoginPage = () => {
  return (
    <Layout>
      <LoginTitle>로그인</LoginTitle>
      <LoginBtn>
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
