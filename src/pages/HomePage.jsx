import React from 'react'
import styled from "styled-components";
import Topbar from "../components/Topbar"
const HomePage = () => {
  return (
    <Container>
        <TitleContainer>
        <Circle1 />
        <Circle2 />
        <Circle3 />
        <Title>요즘 뜨고 있는 댄서를 찾아보세요!</Title>
        <Circle4 />
        <Circle5 />
        <Circle6 />
        </TitleContainer>
    </Container>
  )
}

const Container = styled.div`

`;
export default HomePage;

const TitleContainer = styled.div`
display : flex;
flex-direction : row;
align-items : center;
justify-content : center;
margin-top : 36.5px;
`
const Circle1 = styled.div`
background : var(--main_red, #B30505);
width: 20px;
height: 20px;
flex-shrink: 0;
border-radius : 50%;
margin-right : 39.33px;
`
const Circle2 = styled.div`
background : var(--main_red, #B30505);
width: 40px;
height: 40px;
flex-shrink: 0;
border-radius : 50%;
margin-right : 39.33px;
`
const Circle3 = styled.div`
background : var(--main_red, #B30505);
width: 60px;
height: 60px;
flex-shrink: 0;
border-radius : 50%;
margin-right : 31.35px;
`
const Circle4 = styled.div`
background : var(--main_purple, #9819C3);
width: 60px;
height: 60px;
flex-shrink: 0;
border-radius : 50%;
margin-left : 31.35px;
`
const Circle5 = styled.div`
background : var(--main_purple, #9819C3);
width: 40px;
height: 40px;
flex-shrink: 0;
border-radius : 50%;
margin-left : 39.33px;
`
const Circle6 = styled.div`
background : var(--main_purple, #9819C3);
width: 20px;
height: 20px;
flex-shrink: 0;
border-radius : 50%;
margin-left : 39.33px;
`
const Title=styled.div`
width: 780px;
height: 96px;
flex-shrink: 0;
border-radius : 91px;
background: linear-gradient(90deg, #B30505 0%, #9819C3 100%);
color: var(--main_white, #FFF);
text-align: center;
font-family: Pretendard;
font-size: 44px;
font-style: normal;
font-weight: 600;
line-height: normal;
display : flex;
text-align : center;
justify-content : center;
align-items : center;

`