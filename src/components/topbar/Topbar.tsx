import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Logo from '../../assets/logo.svg';
import SingleBtnAlert from '../SingleBtnAlert';
import TopbarActions from './TopbarActions';
import TopbarMenuTablet from './TopbarMenuTablet';
import TopbarMenuMobile from './TopbarMenuMobile';

export const MENU = [
  { path: '/classreservation', label: '댄스 수업 예약' },
  { path: '/dancerprofile', label: '댄서 프로필' },
  { path: '/community', label: '커뮤니티' },
  { path: '/dancerregister', label: '댄서 등록' },
  { path: '/classregister', label: '댄스 수업 등록' }
] as const;

export type MenuItem = (typeof MENU)[number];

type TopbarProps = {
  token: string;
};

const Topbar = ({ token }: TopbarProps) => {
  const navigate = useNavigate();

  const [showInvalidAlert, setShowInvalidAlert] = useState(false);
  const [showMenuMobile, setShowMenuMobile] = useState(false);

  const handleLogoClick = () => navigate('/');
  const handleHamburgerClick = () => setShowMenuMobile(!showMenuMobile);

  return (
    <Container>
      <TopContainer>
        <LogoBtn onClick={handleLogoClick}>
          <img src={Logo} alt="logo" />
        </LogoBtn>
        <TopbarActions
          token={token}
          setShowInvalidAlert={setShowInvalidAlert}
          handleHamburgerClick={handleHamburgerClick}
        />
      </TopContainer>

      <TopbarMenuTablet />
      <TopbarMenuMobile visible={showMenuMobile} />

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
