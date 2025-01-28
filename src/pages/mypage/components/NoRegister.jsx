import React from 'react'
import styled from 'styled-components';

const NoRegister = () => {
  return (
    <Noregister>
      <Text> 내가 등록한 수업이 존재하지 않습니다. </Text>
      <Button> 댄스 수업 등록하러 가기 </Button>
    </Noregister>
  )
}

export default NoRegister;


const Text = styled.div`
  color: #FFF;
  text-align: center;
  font-size: 32px;
  font-weight: 500;
`

const Noregister = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 231px;
`

const Button = styled.button`
  width: 474px;
  height: 66px;
  flex-shrink: 0;
  border-radius: 15px;
  background: #9819C3;
  color: white;
  border: 1px solid #9819C3;
  font-size: 28px;
  font-weight: 600;
  text-align: center;
  margin-top: 27px;
  cursor: pointer;
`