import React from 'react'
import styled from 'styled-components'

const Quit = () => {
  return (
    <QuitContainer>
      <Title> 회원 탈퇴 </Title>
      <Content> 유저님 가지 마세요 엉엉 제가 잘할게요 유저님 가지 마세요 엉엉 제가 잘할게요 유저님 가지 마세요 엉엉 제가 잘할게요 유저님 가지 마세요 엉엉 제가 잘할게요 유저님 가지 마세요 엉엉 제가 잘할게요 유저님 가지 마세요 엉엉 제가 잘할게요 유저님 가지 마세요 엉엉 제가 잘할게요 유저님 가지 마세요 엉엉 제가 잘할게요 유저님 가지 마세요 엉엉 제가 잘할게요 유저님 가지 마세요 엉엉 제가 잘할게요 유저님 가지 마세요 엉엉 제가 잘할게요 유저님 가지 마세요 엉엉 제가 잘할게요 유저님 가지 마세요 엉엉 제가 잘할게요 유저님 가지 마세요 엉엉 제가 잘할게요 유저님 가지 마세요 엉엉 제가 잘할게요 유저님 가지 마세요 엉엉 제가 잘할게요 유저님 가지 마세요 엉엉 제가 잘할게요 유저님 가지 마세요 엉엉 제가 잘할게요 유저님 가지 마세요 엉엉 제가 잘할게요 유저님 가지 마세요 엉엉 제가 잘할게요 유저님 가지 마세요 엉엉 제가 잘할게요 유저님 가지 마세요 엉엉 제가 잘할게요 유저님 가지 마세요 엉엉 제가 잘할게요 유저님 가지 마세요 엉엉 제가 잘할게요 유저님 가지 마세요 엉엉 제가 잘할게요 유저님 가지 마세요 엉엉 제가 잘할게요 유저님 가지 마세요 엉엉 제가 잘할게요 유저님 가지 마세요</Content>
      <QuitButton> 탈퇴하기 </QuitButton>
    </QuitContainer>
  )
}

export default Quit

const QuitContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 73px;
  flex-direction: column;
`

const Title = styled.div`
  color: #FFF;
  font-size: 22px;
  font-weight: 600;
  line-height: normal;
`

const Content = styled.div`
  color: #FFF;
  width: 691.688px;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 78px;
  text-align: justify;
`

const QuitButton = styled.button`
  margin-top: 102px;
  width: 300px;
  height: 52px;
  flex-shrink: 0;
  border-radius: 15px;
  border: 2px solid #9819C3;
  background-color: transparent;
  color: #fff;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;

  &:hover {
      background-color: #9819C3;
    }
`