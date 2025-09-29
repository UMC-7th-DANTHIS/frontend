import { useState } from 'react';
import {
  MenuItemProps,
  MypageSidebarProps
} from '@/types/mypage/MypageSideBarType';
import styled from 'styled-components';
import useIsMobile from '../../hooks/useIsMobile';
import { ReactComponent as Dropdown } from '../../assets/dropdown.svg';

const MypageSidebar = ({ selectedMenu, onMenuClick }: MypageSidebarProps) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  if (isMobile) {
    return (
      //모바일 사이드바
      <MobileContainer>
        <MobileHeader onClick={() => setIsOpen(!isOpen)}>
          {getMenuLabel(selectedMenu)} <Dropdown />
        </MobileHeader>
        {isOpen && (
          <MobileMenu>
            {menuList.map(({ key, label, divider }) =>
              divider ? (
                <Divider key={key} />
              ) : (
                <MenuItem
                  key={key}
                  onClick={() => {
                    onMenuClick(key);
                    setIsOpen(false);
                  }}
                  isActive={selectedMenu === key}
                >
                  {label}
                </MenuItem>
              )
            )}
          </MobileMenu>
        )}
      </MobileContainer>
    );
  }

  //pc 사이드바
  return (
    <SidebarContainer>
      <Sidebar />
      <SidebarMenu>
        {menuList.map(({ key, label, divider }) =>
          divider ? (
            <Divider key={key} />
          ) : (
            <MenuItem
              key={key}
              onClick={() => onMenuClick(key)}
              isActive={selectedMenu === key}
            >
              {label}
            </MenuItem>
          )
        )}
      </SidebarMenu>
    </SidebarContainer>
  );
};

export default MypageSidebar;

const menuList = [
  { key: 'myclasses', label: '내가 찜한 수업' },
  { key: 'mydancers', label: '내가 찜한 댄서' },
  { key: 'chatlist', label: '채팅한 유저 목록' },
  { key: 'myreview', label: '수업 후기 작성하기' },
  { key: 'mycomments', label: '내가 쓴 게시글/리뷰' },
  { key: 'divider1', divider: true },
  { key: 'registerdancer', label: '댄서 등록하기' },
  { key: 'registerclass', label: '수업 등록하기' },
  { key: 'myregisteredclasses', label: '내가 등록한 수업' },
  { key: 'divider2', divider: true },
  { key: 'editprofile', label: '프로필 수정' },
  { key: 'myinfo', label: '계정 및 정보' }
];

const getMenuLabel = (key: string) => {
  const found = menuList.find((m) => m.key === key && !m.divider);
  return found ? found.label : '내가 찜한 수업';
};

// PC 사이드바
const SidebarContainer = styled.div`
  width: 350px;
  display: flex;
  flex-direction: row;
  margin-top: 17px;
  margin-left: 96px;
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

const MenuItem = styled.div<MenuItemProps>`
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  color: #b2b2b2;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding-left: 16px;
  }

  ${({ isActive }) =>
    isActive &&
    `
      color: #fff;
      font-size: 24px;
      font-weight: 600;
    `}
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #4d4d4d;
  margin: 12px 0 20px;
`;

// 모바일
const MobileContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 12px;
  position: relative;
`;

const MobileHeader = styled.div`
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 14px;
  padding-left: 16px;
`;

const MobileMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  margin-left: 16px;
  margin-top: 10px;
  padding-top: 10px;
  z-index: 1000;
  width: 50%;
  background: rgba(0, 0, 0, 0.85);
  border-left: 2px solid #9819c3;
  display: flex;
  flex-direction: column;
`;
