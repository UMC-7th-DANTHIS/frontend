import React from 'react'
import styled from 'styled-components'
import Logoimg from '../assets/logo.svg'
import Instagram from '../assets/buttons/instagram.svg'

const Footer = () => {
  return (
    <Layout>
        <Line />
        <TopContainer>
            <TextContainer>
                <Text>고객센터 문의</Text>
                <Text1>tel. 010-0000-0000</Text1>
                <Text1>email. tuyu000@naver.com</Text1>
            </TextContainer>
            <LogoContainer>
                <Logo src={Logoimg} />
            </LogoContainer>
        </TopContainer>
        <BottomContainer>
            <InstagramBtn src={Instagram} />
            <Text2>서비스 이용약관</Text2>
            <Text2>개인정보 처리방침</Text2>
        </BottomContainer>

    </Layout>
  )
}

export default Footer;

const Layout = styled.div`
background-color : black;
display : flex;
flex-direction : column;
width: 1440px;
height: 165px;
`
const Line=styled.div`
width: 1440px;
height: 3px;
background: #D9D9D9;
`
const TopContainer = styled.div`
display : flex;
flex-direction : row;
`

const TextContainer=styled.div`
margin-top : 23.7px;
margin-left: 59px;
`
const Text = styled.div`
color: var(--main_white, #FFF);
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: normal;
margin-bottom : 17px;
`
const Text1 = styled.div`
color: var(--main_white, #FFF);
font-family: Pretendard;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 16px;
`

const Text2 = styled.div`
color: var(--main_white, #FFF);
font-family: Pretendard;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 16px;
margin-top : 21px;
margin-right : 24px;
`

const LogoContainer=styled.div`
margin-top : 23.7px;
flex-shrink: 0;
margin-left : 1055px;


`
const Logo = styled.img`
width: 138.464px;
height: 35.569px;`

const BottomContainer=styled.div`
display : flex;
flex-direction : row;
margin-top : 21.65px;
margin-left: 59px;
`
const InstagramBtn = styled.img`
margin-right : 1117.48px;
width: 35px;
height: 35px;
flex-shrink: 0;`

