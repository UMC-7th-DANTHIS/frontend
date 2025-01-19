import React, {useState} from 'react'
import styled from 'styled-components'
import CircleIcon from '../../../assets/shape/circle.svg'
import DancerPic from '../../../assets/dummyphoto/dancer.svg'

const Profile = () => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    setIsLiked((prev) => !prev); // 상태 토글
  };
  
  const data = [
    { id: 1, instagram :"paranaaa_88", genre : "코레오, 재즈, 걸스힙합", introduce : "코레오, 재즈 전문 댄서 파라나입니다! 잘 부탁드려요 :)"},
    { id: 2, instagram :"paranaaa_88", genre : "코레오, 재즈, 걸스힙합", introduce : "코레오, 재즈 전문 댄서 파라나입니다! 잘 부탁드려요 :)"},
    { id: 3, instagram :"paranaaa_88", genre : "코레오, 재즈, 걸스힙합", introduce : "코레오, 재즈 전문 댄서 파라나입니다! 잘 부탁드려요 :)"},

  
  ];

  return (
    <Layout>
    <NameContainer>
      <Circle src={CircleIcon} />
      <Name>Parana</Name>
    </NameContainer>
    <ProfileContainer>
      <Dancerimg src={DancerPic} />
      <InfoContainer>
      <Title>Instagram</Title>
      <Content>{data[0].instagram}</Content>
      <Title>주 장르</Title>
      <Content>{data[0].genre}</Content>
      <Title>한 마디 소개글</Title>
      <Content>{data[0].introduce}</Content>
    
      </InfoContainer>
      <ButtonContainer>
        <ChatButton>댄서와 1:1 채팅하기</ChatButton>
        <LikeButton isLiked={isLiked} onClick = {handleLikeClick}>
          {isLiked ? "찜 취소하기" : "댄서 찜해놓기"}
        </LikeButton>
      </ButtonContainer>

    </ProfileContainer>
    </Layout>
  )
}

export default Profile;

const Layout = styled.div`
display : flex;
flex-direction : column;
padding-top : 32px;
`
const NameContainer = styled.div`
display : flex;
flex-direction : row;
align-items : center;
margin-left : 119px;
`
const ProfileContainer = styled.div`
display : flex;
flex-direction : row;
margin-left : 153px;
margin-top : 39.84px;
margin-bottom : 100px;
`

const Circle = styled.img`
width: 24px;
height: 24px;
flex-shrink: 0;
`

const Name = styled.div`
color: var(--main_white, #FFF);
font-family: Pretendard;
font-size: 30px;
font-style: normal;
font-weight: 600;
line-height: normal;
letter-spacing: -1.5px;
margin-left : 10.84px;
`

const Dancerimg = styled.img`
width: 250px;
height: 250px;
flex-shrink: 0;
border-radius: 10px;
//background: url(<path-to-image>) lightgray 50% / cover no-repeat;
`

const InfoContainer=styled.div`
margin-left: 46px;
//margin-top : 3px;
display : flex;
flex-direction : column;
justify-content : center;
`

const ButtonContainer=styled.div`
margin-left : 67px;
display : flex;
flex-direction : column;
justify-content : center;
`

const Title = styled.div`
color: var(--text_purple, #BF00FF);
font-family: Pretendard;
font-size: 22px;
font-style: normal;
font-weight: 600;
line-height: 30px; /* 136.364% */
letter-spacing: -1.1px;
`
const Content = styled.div`
color: var(--main_white, #FFF);
font-family: Pretendard;
font-size: 18px;
font-style: normal;
font-weight: 500;
line-height: 30px;
letter-spacing: -0.9px;
margin-bottom : 30px;

&:last-child{
  margin-bottom: 0;
}
`

const ChatButton = styled.button`
display: flex;
width: 420px;
padding: 10px 43px;
justify-content: center;
align-items: center;
gap: 8px;
border-radius: 68px;
background: var(--main-gradation, linear-gradient(90deg, #B30505 0%, #9819C3 100%));
color: #FFF;
text-align: center;
font-family: Pretendard;
font-size: 24px;
font-style: normal;
font-weight: 600;
line-height: 50px; /* 208.333% */
letter-spacing: -1.2px;
cursor : pointer;`

const LikeButton = styled.button`
display: flex;
width: 420px;
padding: 10px 87px;
justify-content: center;
align-items: center;
gap: 8px;
border-radius: 54px;
border: 4px solid var(--main_purple, #9819C3);
color: var(--main_white, #FFF);
text-align: center;
font-family: Pretendard;
font-size: 24px;
font-style: normal;
font-weight: 600;
line-height: 50px; /* 208.333% */
letter-spacing: -1.2px;
background : none;
margin-top : 26.34px;
cursor : pointer;
`