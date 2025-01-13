import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as InfoArrow } from "../../../assets/infoarrow.svg";
import Alert from '../../../components/Alert';

const MyInfo = () => {
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [showAgreeAlert, setShowAgreeAlert] = useState(false);

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
          <InfoArrow />
        </MenuItem>

      </LeftSection>

      <Divider />

      <RightSection>
        <MenuItem>
          <MenuText>서비스 이용약관</MenuText>
          <InfoArrow onClick={handleAgreeAlert} />
          {showAgreeAlert && (
            <Alert
              title="서비스 이용약관"
              messagesize="10px"
              message="서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약"
              onClose={hideAgreeAlert}
              ContainerWidth="460px"
              ContainerHeight="400px"
              AlertWidth="595px"
              AlertHeight="529px"
              showButtons={false}
            />
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
    margin-left: 150px;
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
    background-color: #4D4D4D;
    margin-top: 111px;
`;

const ColoredText = styled.span`
    color: #A60F62;
    font-weight: bold; 
`;
