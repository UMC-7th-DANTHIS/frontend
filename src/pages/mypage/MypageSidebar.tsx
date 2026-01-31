import { useState, useRef, useEffect } from 'react';
import { MenuItemProps, MypageSidebarProps } from '@/types/mypage/MypageSideBarType';
import styled from 'styled-components';
import useIsMobile from '../../hooks/useIsMobile';
import { ReactComponent as Dropdown } from '../../assets/dropdown.svg';
import { ReactComponent as WhiteDropdown } from '../../assets/white_dropdown.svg';

const MypageSidebar = ({ selectedMenu, onMenuClick }: MypageSidebarProps) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuHeight, setMenuHeight] = useState(0);

  useEffect(() => {
    if (isOpen && menuRef.current) {
      setMenuHeight(menuRef.current.offsetHeight);
    } else {
      setMenuHeight(0);
    }
  }, [isOpen, selectedMenu]);

  if (isMobile) {
    return (
      // 모바일
      <MobileContainer>
        <MobileContentWrapper $isOpen={isOpen}>
          <PurpleBar $isOpen={isOpen} $menuHeight={menuHeight} />
          <MobileContent>
            <MobileHeader onClick={() => setIsOpen(!isOpen)} $isOpen={isOpen}>
              {getMenuLabel(selectedMenu)} {isOpen ? <WhiteDropdown /> : <Dropdown />}
            </MobileHeader>
            {isOpen && (
              <>
                <BlurOverlay $height={menuHeight} />
                <MobileMenu ref={menuRef}>
                  {menuList
                    .filter(({ key }) => key !== selectedMenu)
                    .map(({ key, label, divider }) =>
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
                          isMobile={isMobile}
                        >
                          {label}
                        </MenuItem>
                      )
                    )}
                </MobileMenu>
              </>
            )}
          </MobileContent>
        </MobileContentWrapper>
      </MobileContainer>
    );
  }

  // PC 사이드바
  return (
    <SidebarContainer>
      <Sidebar />
      <SidebarMenu>
        {menuList.map(({ key, label, divider }) =>
          divider ? (
            <Divider key={key} />
          ) : (
            <MenuItem key={key} onClick={() => onMenuClick(key)} isActive={selectedMenu === key} isMobile={isMobile}>
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
  { key: 'mycomments', label: '내가 쓴 콘텐츠' },
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
  margin-top: 14px;
  margin-left: 32px;

  ${({ theme }) => theme.media.desktop} {
    margin-top: 17px;
    margin-left: 96px;
  }
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

const MenuItem = styled.div<MenuItemProps & { isMobile?: boolean }>`
  margin-bottom: ${({ isMobile }) => (isMobile ? '12px' : '20px')};
  white-space: nowrap;
  font-size: ${({ isMobile }) => (isMobile ? '16px' : '18px')};
  font-weight: 500;
  cursor: pointer;
  color: #b2b2b2;
  transition: all 0.3s ease;

  ${({ isActive, isMobile }) =>
    isActive &&
    `
      color: #fff;
      font-size: ${isMobile ? '20px' : '24px'};
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
  z-index: 1000;
`;

const MobileContentWrapper = styled.div<{ $isOpen: boolean }>`
  position: relative;
  padding-left: 16px;
`;

const PurpleBar = styled.div<{ $isOpen: boolean; $menuHeight: number }>`
  width: 2px;
  background-color: #9819c3;
  position: absolute;
  left: 16px;
  top: 0;
  height: ${({ $isOpen, $menuHeight }) => ($isOpen ? `calc(24px + 10px + ${$menuHeight}px)` : '24px')};
  z-index: 1002;
`;

const MobileContent = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  position: relative;
`;

const MobileHeader = styled.div<{ $isOpen: boolean }>`
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const BlurOverlay = styled.div<{ $height: number }>`
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  width: 50%;
  min-width: 200px;
  height: ${({ $height }) => ($height > 0 ? `${$height}px` : 'auto')};
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 998;
  pointer-events: none;
`;

const MobileMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  width: 50%;
  min-width: 200px;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  flex-direction: column;
  z-index: 1000;
`;
