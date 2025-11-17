import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MyLikeClass from './components/myclass/MyLikeClass';
import MyLikeDancer from './components/mydancer/MyLikeDancer';
import MyChatList from './components/chatlist/MyChatList';
import MyRegisterClass from './components/registerclass/MyRegisterClass';
import MyReview from './components/review/MyReview';
import MyComments from './components/comment/MyComments';
import MyEditProfile from './components/editprofile/MyEditProfile';
import MyInfo from './components/info/MyInfo';
import MypageSidebar from './MypageSidebar';
import { MyNewClass } from './components/newclass/MyNewClass';

const menuMapping: Record<string, React.ReactNode> = {
  'myclasses': <MyLikeClass />,
  'mydancers': <MyLikeDancer />,
  'chatlist': <MyChatList />,
  'registeredclasses': <MyRegisterClass />,
  'registerdancer': <div></div>,
  'registerclass': <MyNewClass />,
  'myreview': <MyReview />,
  'mycomments': <MyComments />,
  'editprofile': <MyEditProfile />,
  'myinfo': <MyInfo />
};

const MypageLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedMenu = new URLSearchParams(location.search).get('menu') || 'myclasses';

  const renderContent = () => menuMapping[selectedMenu] || <MyLikeClass />;

  const handleMenuClick = (menuKey: string) => {
    navigate(`/mypage?menu=${menuKey}`);
  };

  return (
    <MainContainer>
      <MypageSidebar selectedMenu={selectedMenu} onMenuClick={handleMenuClick} />
      <ContentContainer>{renderContent()}</ContentContainer>
    </MainContainer>
  );
};

export default MypageLayout;

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
