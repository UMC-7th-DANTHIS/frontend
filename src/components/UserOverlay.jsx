import React from 'react';
import styled from 'styled-components';
import SampleImage from '../assets/image.png';
import { ReactComponent as PlusButton } from "../assets/buttons/plus-button.svg"

const UserOverlay = ({ onclose }) => {
  const users = ["써니", "타니아", "뉴비", "애니", "누누"];
  const limitedUsers = users.slice(0, 5);

  return (
    <Container>
      <AllContainer onClick={onclose}>
        <ImageContainer>
          {limitedUsers.map((user, index) => (
            <ImageList key={index}>
              <ListImage src={SampleImage} alt={`User ${user}`} />
              <UserName isLast={index === limitedUsers.length - 1}>{user}</UserName>
              <Icon isLast={index === limitedUsers.length - 1} >
                <PlusButton width={40} height={40} />
              </Icon>
            </ImageList>
          ))}
        </ImageContainer>
      </AllContainer>
    </Container>
  );
};

export default UserOverlay;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const AllContainer = styled.div`
  width: 528px;
  height: 494px;
  border-radius: 15px;
  border: 1px solid #a60f62;
  background: #000;
  display: flex;
  flex-direction: column;
  padding: 36px 56px 0 56px ;
`;

const ImageList = styled.div`
  display: flex;
  align-items: center;
`;

const ListImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 6px;
  object-fit: cover;
`;

const UserName = styled.div`
  font-size: 20px;
  color: ${({ isLast }) => (isLast ? '#4D4D4D' : '#fff')}; 
  margin-left: 22px;
  font-weight: 600;
  line-height: 1.5;
`;

const Icon = styled.div`
  margin-left: auto; 
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  svg rect {
    stroke: ${({ isLast }) => (isLast ? '#4D4D4D' : '#9819C3')}; 
  }

  svg path {
    fill: ${({ isLast }) => (isLast ? '#4D4D4D' : '#9819C3')}; 
  }
`;
