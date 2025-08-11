import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MypageIcon from '../../assets/buttons/my.svg';
import HamburgerIcon from '../../assets/buttons/hamburger.svg';
import TopbarSearch from './TopbarSearch';

interface TopbarActionsProps {
  token: string;
  setShowInvalidAlert: (value: boolean) => void;
  handleHamburgerClick: () => void;
}

/**
 * 상단바 우측 액션 영역 컴포넌트
 * - 로그인 여부에 따라 LOGIN 버튼 또는 MY PAGE 버튼을 보여줌
 * - 검색창과 햄버거 메뉴(모바일 전용) 포함
 *
 * @param token 로그인 여부를 나타내는 토큰
 * @param setShowInvalidAlert 검색어 길이 초과 알림 표시를 제어하는 함수
 * @param handleHamburgerClick 모바일에서 메뉴창 표시를 제어하는 함수
 */
const TopbarActions = ({ token, setShowInvalidAlert, handleHamburgerClick }: TopbarActionsProps) => {
  const navigate = useNavigate();

  const handleNavigateLogin = () => navigate('/login');

  return (
    <LoginContainer>
      {!token ? (
        <Login onClick={handleNavigateLogin}>LOGIN</Login>
      ) : (
        <MyPageButton onClick={() => navigate('/mypage')}>
          <img src={MypageIcon} alt={'MyPage'} />
          <span>MY PAGE</span>
        </MyPageButton>
      )}
      <TopbarSearch setShowInvalidAlert={setShowInvalidAlert} />
      <HamburgerButton onClick={handleHamburgerClick}>
        <img src={HamburgerIcon} alt="hamburger menu icon" />
      </HamburgerButton>
    </LoginContainer>
  );
};

export default TopbarActions;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 15px;

  ${({ theme }) => theme.media.tablet} {
    gap: 20px;
  }
`;
const Login = styled.button`
  background: none;
  color: white;
  border: none;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  width: 64px;
  height: 20px;
  cursor: pointer;
`;
const MyPageButton = styled.button`
  background: none;
  border: none;
  display: inline-flex;
  cursor: pointer;
  align-items: center;
  padding: 0;
  gap: 5px;

  order: 2;
  ${({ theme }) => theme.media.tablet} {
    order: 1;
  }

  img {
    width: 28px;
    height: 28px;

    ${({ theme }) => theme.media.tablet} {
      width: 24px;
      height: 24px;
    }
  }

  span {
    display: none;

    ${({ theme }) => theme.media.tablet} {
      display: flex;
      font-size: 20px;
      font-weight: 400;
      color: var(--main-white);
      cursor: pointer;
      white-space: preserve nowrap;
    }
  }
`;
const HamburgerButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--main-white);
  padding: 0;
  order: 3;

  ${({ theme }) => theme.media.tablet} {
    display: none;
  }
`;
