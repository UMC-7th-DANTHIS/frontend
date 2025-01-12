import React, { useState } from 'react';
import styled from 'styled-components';
import MyLikeClass from './components/MyLikeClass';
import MyLikeDancer from './components/MyLikeDancer';
import MyChatList from './components/MyChatList';
import MyRegisterClass from './components/MyRegisterClass';
import MyReview from './components/MyReview';
import MyComments from './components/MyComments';
import MyEditProfile from './components/MyEditProfile';
import MyInfo from './components/MyInfo';

const MypageLayout = () => {
  const [selectedMenu, setSelectedMenu] = useState('내가 찜한 수업');

  const renderContent = () => {
    switch (selectedMenu) {
      case '내가 찜한 수업':
        return <MyLikeClass />;
      case '내가 찜한 댄서':
        return <MyLikeDancer />;
      case '채팅한 유저 목록':
        return <MyChatList />;
      case '내가 등록한 수업':
        return <MyRegisterClass />;
      case '수업 후기 작성하기':
        return <MyReview />;
      case '내가 쓴 게시글 / 댓글':
        return <MyComments />;
      case '프로필 수정':
        return <MyEditProfile />;
      case '계정 및 정보':
        return <MyInfo />;
      default:
        return <MyLikeClass />
    }
  };

  return (
    <MainContainer>
      <SidebarContainer>
        <Sidebar />
        <SidebarMenu>
          <MenuItem
            onClick={() => setSelectedMenu('내가 찜한 수업')}
            isActive={selectedMenu === '내가 찜한 수업'}
          >
            내가 찜한 수업
          </MenuItem>
          <MenuItem
            onClick={() => setSelectedMenu('내가 찜한 댄서')}
            isActive={selectedMenu === '내가 찜한 댄서'}
          >
            내가 찜한 댄서
          </MenuItem>
          <MenuItem
            onClick={() => setSelectedMenu('채팅한 유저 목록')}
            isActive={selectedMenu === '채팅한 유저 목록'}
          >
            채팅한 유저 목록
          </MenuItem>

          <MenuItem
            onClick={() => setSelectedMenu('내가 등록한 수업')}
            isActive={selectedMenu === '내가 등록한 수업'}
          >
            내가 등록한 수업
          </MenuItem>

          <MenuItem
            onClick={() => setSelectedMenu('수업 후기 작성하기')}
            isActive={selectedMenu === '수업 후기 작성하기'}
          >
            수업 후기 작성하기
          </MenuItem>

          <MenuItem
            onClick={() => setSelectedMenu('내가 쓴 게시글/댓글')}
            isActive={selectedMenu === '내가 쓴 게시글/댓글'}
          >
            내가 쓴 게시글/댓글
          </MenuItem>

          <MenuItem
            onClick={() => setSelectedMenu('프로필 수정')}
            isActive={selectedMenu === '프로필 수정'}
          >
            프로필 수정
          </MenuItem>

          <MenuItem
            onClick={() => setSelectedMenu('계정 및 정보')}
            isActive={selectedMenu === '계정 및 정보'}
          >
            계정 및 정보
          </MenuItem>
        </SidebarMenu>
      </SidebarContainer>

      <ContentContainer>
        {renderContent()}
      </ContentContainer>
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
    margin-top: 47px;

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
    color: #B2B2B2;
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
