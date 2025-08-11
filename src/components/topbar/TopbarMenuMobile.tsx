import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MENU } from './Topbar';

interface TopbarMenuMobileProps {
  visible: boolean;
}

const TopbarMenuMobile = ({ visible }: TopbarMenuMobileProps) => {
  return (
    <MenuContainer className={visible ? 'visible' : ''}>
      {MENU.map((menu) => (
        <MenuLabel to={menu.path}>
          <span>{menu.label}</span>
        </MenuLabel>
      ))}
    </MenuContainer>
  );
};

export default TopbarMenuMobile;

const MenuContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: black;
  border-radius: 10px 0 0 0;

  opacity: 0;
  transform: translateY(-10px);
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
  pointer-events: none;

  &.visible {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }
`;

const MenuLabel = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 16px 37px;
  text-decoration-line: none;

  span {
    color: var(--main-white);
    text-align: center;
    font-size: 16px;
    font-weight: 600;
  }
`;
