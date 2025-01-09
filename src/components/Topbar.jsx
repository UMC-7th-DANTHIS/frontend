import React from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import Outline from "../assets/outline.svg";
import { Link } from "react-router-dom";
import Searchicon from "../assets/searchicon.svg";

const Topbar = () => {
  return (
    <Container>
      <TopContainer>
        <LogoImg src={Logo} alt="logo" />
        <LoginContainer>
          <Login>LOGIN</Login>
          <Search>
            <SearchInput placeholder="검색어를 입력하세요" />
            <SearchButton>
              <SearchIcon src={Searchicon} alt="search" />
            </SearchButton>
          </Search>
        </LoginContainer>
      </TopContainer>
      <MenuContainer>
        <MenuItem to="/classreservation">댄스 수업 예약</MenuItem>
        <MenuItem to="/dancerprofile">댄서 프로필</MenuItem>
        <MenuItem to="/community">커뮤니티</MenuItem>
        <MenuItem to="/dancerregister">댄서 등록</MenuItem>
        <MenuItem to="/classregister">댄스 수업 등록</MenuItem>
      </MenuContainer>
      <OutlineContainer>
        <OutlineImg src={Outline} alt="outline" />
      </OutlineContainer>
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
  flex-direction: row;
  height: 104px;
  justify-content: center;
  align-items: center;
`;

const LogoImg = styled.img`
  display: flex;
  width: 218px;
  height: 56px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  //margin-top : 24px;
  //margin-left : 98px;
`;
const LoginContainer = styled.div`
  display: flex;
  flex-direction: row;
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
  margin-left: 627px;
  margin-top: 8px;
`;
const Search = styled.div`
  display: flex;
  margin-left: 20px;
  width: 315px;
  height: 36px;
  flex-shrink: 0;
  border-radius: 43px;
  border: 2px solid var(--main-gradation, #b30505);
  /* margin-top : 10px; */
`;

const SearchInput = styled.input`
  background: none;
  color: white;
  border: none;
  width: 100%;
  //text-align : center;
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
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -1.2px;
  text-decoration: none; /* 기본 밑줄 제거 */
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
