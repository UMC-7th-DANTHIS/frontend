import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as InfoArrow } from '../../../../assets/infoarrow.svg';
import Alert from '../../../../components/Alert';
import AgreeAlert from '../../../../components/AgreeAlert';
import Quit from '../Quit';
import api from '../../../../api/api'
import { useNavigate } from "react-router-dom";

const MyInfo = () => {
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [showAgreeAlert, setShowAgreeAlert] = useState(false);
  const [currentComponent, setCurrentComponent] = useState('info');
  const [showPersonalAlert, setShowPersonalAlert] = useState(false);

  const navigate = useNavigate();

  const handleLogoutAlert = () => {
    setShowLogoutAlert(true);
  };

  const handleLogout = async () => {
    try {
      const response = await api.post("/auth/logout"); // 로그아웃 API 호출
      console.log("로그아웃 성공:", response.data);
  
      //토큰 삭제
      localStorage.removeItem("token");
  
      // 홈페이지로 이동
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("로그아웃 실패:", error.response?.data || error);
      alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
    }
  };
  
  // "예" 버튼을 누르면 `handleLogout` 실행 후 Alert 닫기
  const handleLogoutConfirm = () => {
    handleLogout(); // 로그아웃 실행
    hideLogoutAlert(); // Alert 닫기
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

  const handlePersonalAlert = () => {
    setShowPersonalAlert(true);
  }

  const hidePersonalAlert = () => {
    setShowPersonalAlert(false);
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
              onClose={handleLogoutConfirm}
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
              onClose={hideAgreeAlert}
              title='서비스 이용약관'
              message='서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구' />
          )}
        </MenuItem>
        <MenuItem>
          <MenuText>개인정보 처리방침</MenuText>
          <InfoArrow onClick={handlePersonalAlert} />
          {showPersonalAlert && (
            <AgreeAlert
              onClose={hidePersonalAlert}
              title='개인정보 처리방침'
              message='개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침' />
          )}
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
