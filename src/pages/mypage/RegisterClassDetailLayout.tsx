import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MypageSidebar from './MypageSidebar';

const RegisterClassDetailLayout = () => {
  const navigate = useNavigate();
  const selectedMenu = 'myregisteredclasses';

  const handleMenuClick = (menuKey: string) => {
    navigate(`/mypage?menu=${menuKey}`);
  };

  return (
    <MainContainer>
      <MypageSidebar
        selectedMenu={selectedMenu}
        onMenuClick={handleMenuClick}
      />
      <ContentContainer>
        <Outlet />
      </ContentContainer>
    </MainContainer>
  );
};

export default RegisterClassDetailLayout;

const MainContainer = styled.div`
  background-color: black;
  display: flex;
  min-height: 100vh;
  width: 100%;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

const ContentContainer = styled.div`
  width: 880px;
  background-color: black;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
