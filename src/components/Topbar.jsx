import React, { useState } from 'react';
import styled from 'styled-components';
import Logo from '../assets/logo.svg';
import Outline from '../assets/outline.svg';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Searchicon from '../assets/searchicon.svg';
import Mypageicon from '../assets/buttons/mypageButton.svg';
import SingleBtnAlert from './SingleBtnAlert';

const Topbar = ({ onSearch, token }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState('');
  const [searchPlaceholder, setSearchPlaceholder] =
    useState('검색어를 입력하세요');
  const [showInvalidAlert, setShowInvalidAlert] = useState(false);

  const menuItems = [
    { path: '/classreservation', label: '댄스 수업 예약' },
    { path: '/dancerprofile', label: '댄서 프로필' },
    { path: '/community', label: '커뮤니티' },
    { path: '/dancerregister', label: '댄서 등록' },
    { path: '/classregister', label: '댄스 수업 등록' }
  ];

  const handleClick = () => {
    navigate('/');
  };

  const handleNavigate = () => {
    navigate('/login');
  };

  const handleSearchInput = (e) => {
    const value = e.target.value;

    if (value.length > 20) {
      setShowInvalidAlert(true);
    } else {
      setSearch(value);
      setShowInvalidAlert(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && search.trim() !== '') {
      setTimeout(() => handleSearch(), 0);
    }
  };

  const handleSearch = () => {
    if (search.trim()) {
      onSearch(search.trim());
      setSearch('');
    }
  };

  return (
    <Container>
      <TopContainer>
        <LogoBtn onClick={handleClick}>
          <LogoImg src={Logo} alt="logo" />
        </LogoBtn>
        <LoginContainer>
          {!token ? (
            <Login onClick={handleNavigate}>LOGIN</Login>
          ) : (
            <MyPageContainer onClick={() => navigate('/mypage')}>
              <MyPageImg src={Mypageicon} alt={'안녕하세용'} />
              <MyPage>My Page</MyPage>
            </MyPageContainer>
          )}
          <Search>
            <SearchInput
              placeholder={searchPlaceholder}
              onFocus={() => setSearchPlaceholder('')}
              onBlur={() => setSearchPlaceholder('검색어를 입력하세요')}
              onKeyDown={handleKeyDown}
              onChange={(e) => handleSearchInput(e)}
              value={search}
              maxLength={21}
            />
            <SearchButton
              onClick={handleSearch}
              disabled={search.trim() === ''}
            >
              <SearchIcon src={Searchicon} alt="search" />
            </SearchButton>
          </Search>
        </LoginContainer>
      </TopContainer>
      <MenuContainer>
        {menuItems.map((item) => (
          <MenuItem
            key={item.path}
            to={item.path}
            className={location.pathname.startsWith(item.path) ? 'active' : ''}
          >
            {item.label}
          </MenuItem>
        ))}
      </MenuContainer>
      <OutlineContainer>
        <OutlineImg src={Outline} alt="outline" />
      </OutlineContainer>

      {showInvalidAlert && (
        <SingleBtnAlert
          message={
            <AlertText>
              검색어는
              <ColoredText>최대 20자</ColoredText>
              까지 {'\n'} 입력 가능합니다.
            </AlertText>
          }
          onClose={() => setShowInvalidAlert(false)}
          mariginsize="33px"
          showButtons={true}
        />
      )}
    </Container>
  );
};

export default Topbar;

const Container = styled.div`
  display: flex;
  background-color: black;
  width: 1440px;
  // height: 221px;
  flex-direction: column;
  /* position : relative; */
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  height: 104px;
  margin-left: 90px;
  margin-right: 90px;
  align-items: center;
`;

const LogoBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const LogoImg = styled.img`
  display: inline-block;
  width: 218px;
  height: 56px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

const LoginContainer = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
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

const MyPageContainer = styled.div`
  display: inline-flex;
  cursor: pointer;
  align-items: center;
`;

const MyPageImg = styled.img`
  width: 40px;
  height: 40px;
`;

const MyPage = styled.button`
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  background: none;
  color: white;
  border: none;
`;

const Search = styled.div`
  display: inline-flex;
  margin-left: 20px;
  width: 315px;
  height: 36px;
  flex-shrink: 0;
  border-radius: 43px;
  border: 2px solid var(--main-gradation, #b30505);
`;

const SearchInput = styled.input`
  background: none;
  color: white;
  border: none;
  width: 100%;

  outline: none;
  &:focus {
    border: none;
  }
  margin-left: 10px;
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  margin-right: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SearchIcon = styled.img`
  width: 16px;
  height: 16px;
  flex-shrink: 0;
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  color: white;
  height: 79px;
  justify-content: space-between;
  align-items: center;
  padding-left: 244px;
  padding-right: 243px;
  /* padding : 0; */
  //top : 104px;
  position: relative;
  //width : 1440px;
  z-index: 10;
`;

const MenuItem = styled(Link)`
  color: var(--text_secondary-gray, #b2b2b2);
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

const OutlineContainer = styled.div`
  /* width: 1440px;
height: 156.195px; */
  display: flex;
  width: 1440px;
  position: relative;
  margin-top: -79px;
  z-index: 5; /* MenuContainer보다 뒤로 */
  height: calc(100% - 30px); /* 사진 높이에서 30px만큼 줄임 */
  overflow: hidden;
`;

const OutlineImg = styled.img`
  width: 100%;
  height: auto;
  display: flex;
  position: relative; /* 부모 컨테이너 기준으로 정렬 */
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
