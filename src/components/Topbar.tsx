import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import Logo from '../assets/logo.svg';
import SingleBtnAlert from './SingleBtnAlert';
import TopbarActions from './TopbarActions';

type TopbarProps = {
  token: string;
};

type menuItemsType = {
  path: string;
  label: string;
};

const Topbar = ({ token }: TopbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showInvalidAlert, setShowInvalidAlert] = useState<boolean>(false);

  const menuItems: menuItemsType[] = [
    { path: '/classreservation', label: '댄스 수업 예약' },
    { path: '/dancerprofile', label: '댄서 프로필' },
    { path: '/community', label: '커뮤니티' },
    { path: '/dancerregister', label: '댄서 등록' },
    { path: '/classregister', label: '댄스 수업 등록' }
  ];

  const handleClick = () => navigate('/');

  return (
    <Container>
      <TopContainer>
        <LogoBtn onClick={handleClick}>
          <img src={Logo} alt="logo" />
        </LogoBtn>
        <TopbarActions token={token} setShowInvalidAlert={setShowInvalidAlert} />
      </TopContainer>

      <MenuContainer>
        {menuItems.map((item: menuItemsType) => (
          <MenuItem key={item.path} to={item.path} className={location.pathname.startsWith(item.path) ? 'active' : ''}>
            {item.label}
          </MenuItem>
        ))}
      </MenuContainer>

      <Outline />

      {showInvalidAlert && (
        <SingleBtnAlert
          message={
            <AlertText>
              검색어는
              <ColoredText>최대 20자</ColoredText>
              까지 {'\n'} 입력 가능합니다.
            </AlertText>
          }
          onClose={(): void => setShowInvalidAlert(false)}
          mariginsize="33px"
          showButtons={true}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  background-color: black;
  width: 100%;
  flex-direction: column;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 68px 27px 15px 27px;

  ${({ theme }) => theme.media.desktop} {
    padding: 0 90px;
    padding-top: 24px;
  }
`;

const LogoBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  img {
    display: inline-block;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    width: 120px;
    height: 30px;

    ${({ theme }) => theme.media.tablet} {
      width: 218px;
      height: 56px;
    }
  }
`;

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

  // ${({ theme }) => theme.media.desktop} {
  //   padding: 0 244px;
  // }
`;

const MenuItem = styled(Link)`
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

const Outline = styled.div`
  height: 40px;
  border-top: 1px solid var(--main-purple);
  border-radius: 24px 24px 0 0;
  box-shadow: inset 0px 7px 7px var(--main-purple50);

  ${({ theme }) => theme.media.tablet} {
    border-radius: 36px 36px 0 0;
    box-shadow: inset 0px 15px 20px var(--main-purple50);
  }
`;

const AlertText = styled.span`
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px;
  white-space: pre-line;
`;

const ColoredText = styled.span`
  color: #a60f62;
  font-weight: bold;
`;

export default Topbar;
