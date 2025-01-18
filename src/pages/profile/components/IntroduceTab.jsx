import React from 'react'
import styled from 'styled-components'
import DancerPic from '../../../assets/dummyphoto/introduce.svg'

 const IntroduceTab =( ) => {
    const data = [
        "2024 Female star vol.5 1등 WINNER",
        "2024 Master Piece 1등 WINNER",
        "2023 Peace Out  1등 WINNER",
        "2023 10th Feedback Compettion Final 진출",
        "2023 female star vol.4 3rd (dancers night)",
        "2023 Urbansummer Opening Guest Showcase",
        "2022 vol.2 byehi Guestshow",
        "Street Allaround Championship -Guest show",
    ];
  return (
    <Layout>
        <ImageContainer>
            <Picture src = {DancerPic} />
            <Picture src = {DancerPic} />
            <Picture src = {DancerPic} />
        </ImageContainer>
        <CareerContainer>
            <Title>댄서 이력</Title>
            <List>
                {data.map((item, index)=>(
                    <ListItem key={index}>{item}</ListItem>
                ))}
            </List>
        </CareerContainer>

    </Layout>
  )
}
export default IntroduceTab;

const Layout = styled.div`
display : flex;
padding-top : 47px;
//align-items : center;
//justify-content : center;
flex-direction : column;
margin-bottom : 388.34px;
padding-left : 100px;
padding-right : 100px;
`

const ImageContainer=styled.div`
display : grid;
grid-template-columns: repeat(3, 1fr);
gap : 20px;
`

const Picture = styled.img`
width: 400px;
height: 400px;
flex-shrink: 0;`

const CareerContainer=styled.div`
margin-top : 83px;
`

const Title = styled.div`
color: var(--text_purple, #BF00FF);
font-family: Pretendard;
font-size: 28px;
font-style: normal;
font-weight: 700;
line-height: 50px; /* 178.571% */
letter-spacing: -1.4px;
`

const List = styled.div`
`

const ListItem=styled.div`
color: var(--main_white, #FFF);
font-family: Pretendard;
font-size: 20px;
font-style: normal;
font-weight: 400;
line-height: 40px;
letter-spacing: -1px;
`