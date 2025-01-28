import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MyLikeClass from './components/MyLikeClass';
import MyLikeDancer from './components/MyLikeDancer';
import MyChatList from './components/MyChatList';
import MyRegisterClass from './components/MyRegisterClass';
import MyReview from './components/MyReview';
import MyComments from './components/MyComments';
import MyEditProfile from './components/MyEditProfile';
import MyInfo from './components/MyInfo';

const menuMapping = {
  'myclasses': <MyLikeClass />,
  'mydancers': <MyLikeDancer />,
  'chatlist': <MyChatList />,
  'registeredclasses': <MyRegisterClass />,
  'myreview': <MyReview />,
  'mycomments': <MyComments />,
  'editprofile': <MyEditProfile />,
  'myinfo': <MyInfo />,
};

const MypageLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedMenu = new URLSearchParams(location.search).get('menu') || 'myclasses';

  const renderContent = () => menuMapping[selectedMenu] || <MyLikeClass />;

  const handleMenuClick = (menuKey) => {
    navigate(`/mypage?menu=${menuKey}`);
  };

  return (
    <MainContainer>
      <SidebarContainer>
        <Sidebar />
        <SidebarMenu>
          <MenuItem
            onClick={() => handleMenuClick('myclasses')}
            isActive={selectedMenu === 'myclasses'}
          >
            내가 찜한 수업
          </MenuItem>
          <MenuItem
            onClick={() => handleMenuClick('mydancers')}
            isActive={selectedMenu === 'mydancers'}
          >
            내가 찜한 댄서
          </MenuItem>
          <MenuItem
            onClick={() => handleMenuClick('chatlist')}
            isActive={selectedMenu === 'chatlist'}
          >
            채팅한 유저 목록
          </MenuItem>
          <MenuItem
            onClick={() => handleMenuClick('registeredclasses')}
            isActive={selectedMenu === 'registeredclasses'}
          >
            내가 등록한 수업
          </MenuItem>
          <MenuItem
            onClick={() => handleMenuClick('myreview')}
            isActive={selectedMenu === 'myreview'}
          >
            수업 후기 작성하기
          </MenuItem>
          <MenuItem
            onClick={() => handleMenuClick('mycomments')}
            isActive={selectedMenu === 'mycomments'}
          >
            내가 쓴 게시글/댓글
          </MenuItem>
          <MenuItem
            onClick={() => handleMenuClick('editprofile')}
            isActive={selectedMenu === 'editprofile'}
          >
            프로필 수정
          </MenuItem>
          <MenuItem
            onClick={() => handleMenuClick('myinfo')}
            isActive={selectedMenu === 'myinfo'}
          >
            계정 및 정보
          </MenuItem>
        </SidebarMenu>
      </SidebarContainer>

      <ContentContainer>{renderContent()}</ContentContainer>
    </MainContainer>
  );
};

export default MypageLayout;

const MainContainer = styled.div`
  background-color: black;
  display: flex;
  min-height: 100vh;
`;

const SidebarContainer = styled.div`
  width: 210px;
  display: flex;
  flex-direction: row;
  margin-left: 98px;
  margin-top: 17px;
`;

const Sidebar = styled.div`
  width: 0px;
  height: 500px;
  flex-shrink: 0;
  border: 2px solid #9819C3;
`;

const SidebarMenu = styled.div`
  list-style: none;
  margin-left: 34px;
  margin-top: 24px;
`;

const MenuItem = styled.div`
  margin-bottom: 37px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  color: #b2b2b2;
  transition: all 0.3s ease;

  ${({ isActive }) =>
    isActive &&
    `
        color: #fff;
        font-size: 24px;
        font-style: normal;
        font-weight: 600;
        letter-spacing: -1.2px;
    `}
`;

const ContentContainer = styled.div`
  flex: 1;
  background-color: black;
`;

