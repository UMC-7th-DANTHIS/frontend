import React from 'react';
import styled from 'styled-components';
import KakaoMap from './KakaoMap';

const Practice : React.FC=()=> {
  return (
    <Layout>
        <Map>
          <KakaoMap />
        
        </Map> 
    </Layout>
  )
}

export default Practice;

const Layout = styled.div`
display: flex;
padding-top: 16px;
padding-bottom: 393px;
justify-content: center;
${({ theme }) => theme.media.tablet} {
    padding-top: 70px;
    padding-bottom: 208px;
  }
`

const Map = styled.div`
  width : 338px;
  height: 248px;
  //background-color: lightgray;
  ${({ theme }) => theme.media.tablet} {
    width : 1003px;
    height: 737px;
  } 
`