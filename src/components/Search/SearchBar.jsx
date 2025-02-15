import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import Searchicon from '../../assets/searchicon.svg';
import SingleBtnAlert from '../SingleBtnAlert';

const SearchBar = ({
  select,
  handleCategoryClick,
  temp,
  handleNowContent,
  handleSearchData
}) => {
  const navigate = useNavigate();

  const [selectedFilter, setSelectedFilter] = useState('');
  const [showInvalidAlert, setShowInvalidAlert] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const category = [
    '강렬한',
    '나른한',
    '에너제틱',
    '유산소',
    '빡센',
    '감성적인',
    '기본기',
    '통통튀는',
    '무거운',
    '아프로',
    '뚝딱이',
    '취미'
  ];

  const handleClick = (tag) => {
    setSelectedFilter((prev) => (prev === tag ? '' : tag));
  };

  const handleSearch = (e) => {
    const value = e.target.value;

    if (value.length > 20) {
      setShowInvalidAlert(true);
    } else {
      handleNowContent(value);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && temp.trim() !== '') {
      e.preventDefault();
      handleSearchData();
    }
  };

  const handleReSearch = (category) => {
    handleCategoryClick(category);
    handleSearchData();
    setSearchParams({ query: temp });
    navigate(`/search/${category}?query=${temp}`);
  };

  return (
    <Container>
      <InputContainer>
        <Input value={temp} onKeyDown={handleKeyDown} onChange={handleSearch} />
        <SearchButton onClick={handleSearchData}>
          <SearchIcon src={Searchicon} alt="search" />
        </SearchButton>
      </InputContainer>
      <HashTagContainer>
        {category.map((tag, index) => (
          <HashTag
            onClick={() => handleClick(tag)}
            active={selectedFilter.includes(tag)}
            key={index}
          >
            # {tag}
          </HashTag>
        ))}
      </HashTagContainer>
      <SelectContainer>
        <SelectText
          className={select === 'dance-classes' ? 'active' : ''}
          onClick={() => handleReSearch('dance-classes')}
        >
          수업
        </SelectText>
        <SelectText
          className={select === 'dancers' ? 'active' : ''}
          onClick={() => handleReSearch('dancers')}
        >
          댄서
        </SelectText>
        <SelectText
          className={select === 'posts' ? 'active' : ''}
          onClick={() => handleReSearch('posts')}
        >
          커뮤니티
        </SelectText>
      </SelectContainer>

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

const Container = styled.div`
  width: 100%;
  height: 376px;
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
  cursor: pointer;
`;

const SearchIcon = styled.img`
  width: 33px;
  height: 33px;
  flex-shrink: 0;
`;

const HashTagContainer = styled.div`
  margin-left: 205px;
  margin-right: 85px;
  margin-top: 30px;
  margin-bottom: 92px;
  display: inline-block;
  flex-direction: row;
  width: 1100px;
  height: 124px;
`;

const SelectContainer = styled.div`
  display: flex;
  margin-left: 147px;
  gap: 65px;
`;

const SelectText = styled.span`
  height: 26px;
  cursor: pointer;
  color: #4d4d4d;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  &.active {
    color: white;
  }
`;

const HashTag = styled.div`
  display: inline-block;
  width: 154px;
  height: 50px;
  margin-right: 20px;
  margin-bottom: 14px;
  border-radius: 80px;
  border: 2px solid #bf00ff;
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 50px;
  background-color: ${({ active }) => (active ? '#BF00FF' : 'transparent')};
  color: ${({ active }) => (active ? '#fff' : '#B2B2B2')};
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

export default SearchBar;
