import React from 'react';
import styled from 'styled-components';

const MypageSidebar = ({ selectedMenu, onMenuClick }) => {
  return (
    <SidebarContainer>
      <Sidebar />
      <SidebarMenu>
        <MenuItem
          onClick={() => onMenuClick('myclasses')}
          isActive={selectedMenu === 'myclasses'}
        >
          내가 찜한 수업
        </MenuItem>
        <MenuItem
          onClick={() => onMenuClick('mydancers')}
          isActive={selectedMenu === 'mydancers'}
        >
          내가 찜한 댄서
        </MenuItem>
        <MenuItem
          onClick={() => onMenuClick('chatlist')}
          isActive={selectedMenu === 'chatlist'}
        >
          채팅한 유저 목록
        </MenuItem>
        <MenuItem
          onClick={() => onMenuClick('registeredclasses')}
          isActive={selectedMenu === 'registeredclasses'}
        >
          내가 등록한 수업
        </MenuItem>
        <MenuItem
          onClick={() => onMenuClick('myreview')}
          isActive={selectedMenu === 'myreview'}
        >
          수업 후기 작성하기
        </MenuItem>
        <MenuItem
          onClick={() => onMenuClick('mycomments')}
          isActive={selectedMenu === 'mycomments'}
        >
          내가 쓴 게시글/댓글
        </MenuItem>
        <MenuItem
          onClick={() => onMenuClick('editprofile')}
          isActive={selectedMenu === 'editprofile'}
        >
          프로필 수정
        </MenuItem>
        <MenuItem
          onClick={() => onMenuClick('myinfo')}
          isActive={selectedMenu === 'myinfo'}
        >
          계정 및 정보
        </MenuItem>
      </SidebarMenu>
    </SidebarContainer>
  );
};

export default MypageSidebar;

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
  border: 2px solid #9819c3;
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
        font-weight: 600;
        letter-spacing: -1.2px;
    `}
`;
