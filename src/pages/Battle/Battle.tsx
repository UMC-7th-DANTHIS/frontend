import React from 'react';
import styled from 'styled-components';

const Battle = () => {
  return (
    <Layout>
        <Text>런칭 준비 중인 Beta 기능이에요</Text>
        <Text1>빠른 시일 내에 돌아올게요</Text1>
    </Layout>
  )
}

export default Battle;

const Layout = styled.div`
display: flex;
flex-direction: column;
padding-bottom: 740px;
${({ theme }) => theme.media.tablet} {
   padding-bottom: 460px;
  }
`
const Text= styled.div`
color: #FFF;
text-align: center;
font-size: 20px;
font-style: normal;
font-weight: 400;
line-height: normal;
margin-top: 180px;
${({ theme }) => theme.media.tablet} {
   font-size: 36px;
   line-height: 140%;
   margin-top: 205px;
  }
`
const Text1= styled.div`
color: #FFF;
text-align: center;
font-size: 20px;
font-style: normal;
font-weight: 400;
line-height: normal;
${({ theme }) => theme.media.tablet} {
   font-size: 36px;
   line-height: 140%;
  }
`