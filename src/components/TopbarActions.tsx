import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MypageIcon from '../assets/buttons/my.svg';
import HamburgerIcon from '../assets/buttons/hamburger.svg';
import TopbarSearch from './TopbarSearch';

interface TopbarActionsProps {
  token: string;
  setShowInvalidAlert: (value: boolean) => void;
}

const TopbarActions = ({ token, setShowInvalidAlert }: TopbarActionsProps) => {
  const navigate = useNavigate();

  const handleNavigate = () => navigate('/login');

  return (
    <LoginContainer>
      {!token ? (
        <Login onClick={handleNavigate}>LOGIN</Login>
      ) : (
        <MyPageButton onClick={() => navigate('/mypage')}>
          <img src={MypageIcon} alt={'MyPage'} />
          <span>MY PAGE</span>
        </MyPageButton>
      )}
      <TopbarSearch setShowInvalidAlert={setShowInvalidAlert} />
      <HamburgerButton>
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
