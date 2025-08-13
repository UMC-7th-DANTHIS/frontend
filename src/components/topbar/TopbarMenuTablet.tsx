import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { MENU, MenuItem } from './Topbar';
import Beta from '../../assets/beta.svg';

/**
 * TopbarMenuTablet 컴포넌트
 * - 현재 URL 경로를 기준으로 활성화된 메뉴에 스타일 적용
 * - 반응형으로 태블릿 이상에서만 메뉴 표시
 */
const TopbarMenuTablet = () => {
  const location = useLocation();

  return (
    <MenuContainer>
      {MENU.map((menu: MenuItem) => (
        <MenuWrapper key={menu.path}>
          <MenuLabel to={menu.path} className={location.pathname.startsWith(menu.path) ? 'active' : ''}>
            {menu.label}
          </MenuLabel>
          {menu.isBeta && <BetaLabel src={Beta} alt="BETA 라벨" />}
        </MenuWrapper>
      ))}
    </MenuContainer>
  );
};

export default TopbarMenuTablet;

const MenuContainer = styled.div`
  display: none;

  ${({ theme }) => theme.media.tablet} {
    display: flex;
    flex-direction: row;
    color: white;
    height: 79px;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 10;

    padding: 0 clamp(40px, calc(30.35vw - 193px), 244px);
  }
`;
const MenuWrapper = styled.div`
  position: relative;
`;
const MenuLabel = styled(Link)`
  color: var(--text-secondary-gray);
  text-align: center;
  font-size: 24px;
  font-weight: 500;
  letter-spacing: -1.2px;
  text-decoration: none;
  position: relative;
  padding-bottom: 5px;

  &.active {
    color: white;
    font-weight: bold;
    font-size: 30px;
  }
`;
const BetaLabel = styled.img`
  position: absolute;
  top: -25px;
  right: -20px;
`;
