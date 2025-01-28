import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as InfoArrow } from '../../../../assets/infoarrow.svg';
import Alert from '../../../../components/Alert';
import AgreeAlert from '../../../../components/AgreeAlert';
import Quit from '../Quit';

const MyInfo = () => {
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [showAgreeAlert, setShowAgreeAlert] = useState(false);
  const [currentComponent, setCurrentComponent] = useState('info');

  const handleLogoutAlert = () => {
    setShowLogoutAlert(true);
  };

  const hideLogoutAlert = () => {
    setShowLogoutAlert(false);
  };

  const handleAgreeAlert = () => {
    setShowAgreeAlert(true);
  };

  const hideAgreeAlert = () => {
    setShowAgreeAlert(false);
  };

  const gotoQuit = () => {
    setCurrentComponent('quit');
  };

  if (currentComponent === 'quit') {
    return <Quit />;
  }

  return (
    <InfoContainer>
      <LeftSection>
        <MenuItem>
          <MenuText>로그아웃</MenuText>
          <InfoArrow onClick={handleLogoutAlert} />
          {showLogoutAlert && (
            <Alert
              message={
                <span>
                  <ColoredText>로그아웃</ColoredText> 하시겠습니까?
                </span>
              }
              onClose={hideLogoutAlert}
              mariginsize="45px"
              ContainerWidth="280px"
              ContainerHeight="108px"
              AlertWidth="392px"
              AlertHeight="260px"
              showButtons={true}
            />
          )}
        </MenuItem>
        <MenuItem>
          <MenuText>회원탈퇴</MenuText>
          <InfoArrow onClick={gotoQuit} />
        </MenuItem>
      </LeftSection>

      <Divider />

      <RightSection>
        <MenuItem>
          <MenuText>서비스 이용약관</MenuText>
          <InfoArrow onClick={handleAgreeAlert} />
          {showAgreeAlert && (
            <AgreeAlert
              onClose={hideAgreeAlert} />
          )}
        </MenuItem>
        <MenuItem>
          <MenuText>개인정보 처리방침</MenuText>
          <InfoArrow />
        </MenuItem>
      </RightSection>
    </InfoContainer>
  );
};

export default MyInfo;

const InfoContainer = styled.div`
  display: flex;
  background-color: black;
  align-items: center;
  justify-content: center;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 150px;
  margin-top: 127px;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 150px;
  margin-top: 127px;
`;

const MenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 275px;
  margin-bottom: 96px;
  cursor: pointer;
`;

const MenuText = styled.span`
  color: white;
  font-size: 22px;
  font-weight: 600;
`;

const Divider = styled.div`
  width: 1px;
  height: 220px;
  background-color: #4d4d4d;
  margin-top: 111px;
`;

const ColoredText = styled.span`
  color: #a60f62;
  font-weight: bold;
`;
