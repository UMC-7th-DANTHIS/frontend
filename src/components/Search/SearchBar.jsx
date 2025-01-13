import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Searchicon from '../../assets/searchicon.svg';

const SearchBar = () => {
  const [select, setSelect] = useState('');

  const handleCategoryClick = (category) => setSelect(category);

  console.log(select);

  return (
    <Container>
      <InputContainer>
        <Input defaultValue="Tania" />
        <SearchButton>
          <SearchIcon src={Searchicon} alt="search" />
        </SearchButton>
      </InputContainer>
      <HashTagContainer>
        <UpperContainer>
          <UpperHash>#스근한</UpperHash>
          <UpperHash>#에너제틱</UpperHash>
          <UpperHash>#섹시</UpperHash>
          <UpperHash>#맨발</UpperHash>
          <UpperHash>#유산소</UpperHash>
        </UpperContainer>
        <DownContainer>
          <DownHash>#무거운</DownHash>
          <DownHash>#아프로</DownHash>
          <DownHash>#강렬한</DownHash>
          <DownHash>#재즈/컨템포러리</DownHash>
          <DownHash>#감성적인</DownHash>
        </DownContainer>
      </HashTagContainer>
      <SelectContainer>
        <SelectText
          className={select === 'class' ? 'active' : ''}
          onClick={() => handleCategoryClick('class')}
        >
          수업
        </SelectText>
        <SelectText
          className={select === 'dancer' ? 'active' : ''}
          onClick={() => handleCategoryClick('dancer')}
        >
          댄서
        </SelectText>
        <SelectText
          className={select === 'community' ? 'active' : ''}
          onClick={() => handleCategoryClick('community')}
        >
          커뮤니티
        </SelectText>
      </SelectContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 386px;
  background-color: black;
`;

const InputContainer = styled.div`
  display: flex;

  margin-left: 387px;
  margin-right: 351px;
  padding-left: 42px;
  padding-top: 19px;

  width: 640px;
  height: 57px;

  border-radius: 90px;
  border: 4.19px solid #9819c3;
`;

const Input = styled.input`
  background-color: transparent;
  border: transparent;
  resize: none;
  outline: none;

  height: 40px;
  width: 530px;

  color: white;
  font-size: 33.524px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  display: flex;

  margin-left: 30px;
`;

const SearchIcon = styled.img`
  width: 33px;
  height: 33px;
  flex-shrink: 0;
`;

const HashTagContainer = styled.div`
  margin-left: 303px;
  margin-right: 303px;
  margin-top: 35px;
  margin-bottom: 76px;

  width: 833px;
  height: 124px;
`;

const UpperContainer = styled.div`
  display: flex;
  gap: 46px;
`;

const UpperHash = styled.div`
  padding: 0px 34.5px;
  justify-content: center;
  align-items: center;

  border-radius: 80px;
  border: 2px solid #bf00ff;

  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 50px;
  letter-spacing: -1px;

  color: #b2b2b2;
`;

const DownContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 24px;
`;

const DownHash = styled.div`
  padding: 0px 36.7px;
  justify-content: center;
  align-items: center;

  border-radius: 80px;
  border: 2px solid #bf00ff;

  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 50px;
  letter-spacing: -1px;

  color: #b2b2b2;
`;

const SelectContainer = styled.div`
  display: flex;
  margin-left: 147px;
  margin-top: 75px;
  gap: 65px;
`;

const SelectText = styled.span`
  height: 26px;

  color: #4d4d4d;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  &:active {
    color: white;
  }
`;

export default SearchBar;
