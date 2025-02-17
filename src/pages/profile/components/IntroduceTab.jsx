import React from 'react'
import styled from 'styled-components'
import DancerPic from '../../../assets/dummyphoto/introduce.svg'

 const IntroduceTab =({dancer}) => {
   
    if (!dancer) {
        return <div>로딩 중...</div>; // dancer가 null일 때 로딩 메시지 표시
      }
  return (
    <Layout>
        <ImageContainer>
        {dancer.imageUrlList?.map((imageUrl, index) => (
          <Picture key={index} src={imageUrl} alt={`Dancer Image ${index + 1}`} />
        ))}
        </ImageContainer>
        <CareerContainer>
            <Title>댄서 이력</Title>
            <List>
                {dancer.history}
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
color: var(--main_white, #FFF);
font-family: Pretendard;
font-size: 20px;
font-style: normal;
font-weight: 400;
line-height: 40px;
letter-spacing: -1px;
`

