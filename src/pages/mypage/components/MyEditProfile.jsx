import React, { useState } from 'react'
import styled from 'styled-components';
import ProfileUser from './ProfileUser';
import ProfileDancer from './ProfileDancer';

const MyEditProfile = () => {
  const [activeTab, setActiveTab] = useState('유저');

  const renderContents = () => {
    if (activeTab === '유저') {
      return (
        <ProfileUser />
      )
    }
    if (activeTab === '댄서') {
      return (
        <ProfileDancer />
      )
    }
  };

  return (
    <Container>
      <TextContainer>
        <Tab
          isActive={activeTab === '유저'}
          onClick={() => setActiveTab('유저')}
        >
          유저
        </Tab>
        <Tab
          isActive={activeTab === '댄서'}
          onClick={() => setActiveTab('댄서')}
        >
          댄서
        </Tab>
      </TextContainer>

      <Divider />
      {renderContents()}
    </Container>
  );
};

export default MyEditProfile;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 25px;

`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 45px;
  margin-left: 130px;

`;

const Tab = styled.div`
  color: ${(props) => (props.isActive ? 'white' : '#4D4D4D')};
  font-size: ${(props) => (props.isActive ? '22px' : '18px')};
  font-weight: ${(props) => (props.isActive ? '600' : '500')};
  line-height: normal;
  cursor: pointer;
`;

const Divider = styled.div`
  width: 900px;
  flex-shrink: 0;
  border: 2px solid #ddd;
  background-color: #ddd;
  margin-top: 13px;
  margin-left: 101px;
  margin-bottom: 39px;
`;

