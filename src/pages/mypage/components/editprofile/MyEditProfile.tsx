import { useState } from 'react';
import styled from 'styled-components';
import ProfileUser from './ProfileUser';
import ProfileDancer from './ProfileDancer';

interface TabProps {
  isActive: boolean;
}

const MyEditProfile = () => {
  const [activeTab, setActiveTab] = useState<'유저' | '댄서'>('유저');

  const renderContents = () => {
    if (activeTab === '유저') {
      return <ProfileUser />;
    }
    if (activeTab === '댄서') {
      return <ProfileDancer />;
    }
  };

  return (
    <AllContent>
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
    </AllContent>
  );
};

export default MyEditProfile;

const AllContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 600px) {
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    padding-left: 16px;
    padding-right: 16px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;

  @media (max-width: 600px) {
    width: 100%;
    align-items: flex-start;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 45px;
  align-items: baseline;
  width: 100%;

  @media (max-width: 600px) {
    gap: 32px;
    margin-top: 32px;
    justify-content: flex-start;
    width: 100%;
    align-items: baseline;
  }
`;

const Tab = styled.div<TabProps>`
  color: ${(props) => (props.isActive ? 'white' : '#4D4D4D')};
  font-size: ${(props) => (props.isActive ? '22px' : '18px')};
  font-weight: ${(props) => (props.isActive ? '600' : '500')};
  line-height: 1.2;
  cursor: pointer;

  @media (max-width: 600px) {
    font-size: ${(props) => (props.isActive ? '20px' : '16px')};
    line-height: 1.2;
  }
`;

const Divider = styled.div`
  width: 900px;
  flex-shrink: 0;
  border: 2px solid #ddd;
  background-color: #ddd;
  margin-top: 13px;
  margin-bottom: 39px;

  @media (max-width: 600px) {
    width: 100%;
    margin-top: 10px;
    margin-bottom: 28px;
    border-width: 1px;
  }
`;
