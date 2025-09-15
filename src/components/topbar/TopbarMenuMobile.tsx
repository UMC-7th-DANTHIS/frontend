import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MENU } from './Topbar';
import Beta from '../../assets/beta.svg';

interface TopbarMenuMobileProps {
  visible: boolean;
  onClose: () => void;
}

const TopbarMenuMobile = ({ visible, onClose }: TopbarMenuMobileProps) => {
  return (
    <>
      {visible && <Overlay onClick={onClose} />}
      <MenuContainer className={visible ? 'visible' : ''}>
        {MENU.map((menu) => (
          <MenuWrapper key={menu.path}>
            <MenuLabel to={menu.path} onClick={onClose}>
              <span>{menu.label}</span>
            </MenuLabel>
            {menu.isBeta && <BetaLabel src={Beta} alt="BETA 라벨" />}
          </MenuWrapper>
        ))}
      </MenuContainer>
    </>
  );
};

export default TopbarMenuMobile;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 998;
`;
const MenuContainer = styled.div`
  position: absolute;
  top: 120px;
  right: 0;
  display: flex;
  z-index: 999;
  padding: 10px 0;
  flex-direction: column;
  background-color: black;
  border-radius: 10px 0 0 10px;
  box-shadow: 0px 0px 10px var(--main-purple);

  opacity: 0;
  transform: translateX(100%);
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
  pointer-events: none;

  &.visible {
    opacity: 1;
    transform: translateX(0);
    pointer-events: auto;
  }
`;
const MenuWrapper = styled.div`
  display: flex;
  padding: 16px;
`;
const MenuLabel = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration-line: none;
  white-space: preserve nowrap;

  span {
    color: var(--main-white);
    text-align: center;
    font-size: 16px;
    font-weight: 600;
  }
`;
const BetaLabel = styled.img`
  margin-left: 6px;
`;
