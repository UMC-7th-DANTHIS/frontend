import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import SingleBtnAlert from '../../components/SingleBtnAlert';

import SearchImage from '../../assets/Search/search.svg';
import { hashTagID } from '../../api/schema';

type SearchBarProps = {
  handleSearchData: () => void;
  handleCategoryClick: (category: string) => void;
  handleNowContent: (content: string) => void;
  handleClick: (tag: string) => void;
  temp: string | null;
  select: string | null;
  selectedFilter: string | null;
};

const SearchBar = ({
  handleSearchData,
  handleCategoryClick,
  handleClick,
  handleNowContent,
  temp,
  select,
  selectedFilter
}: SearchBarProps) => {
  const navigate = useNavigate();

  const [showInvalidAlert, setShowInvalidAlert] = useState<boolean>(false);
  const [, setSearchParams] = useSearchParams();

  const handleSearch = (e: any): void => {
    const value: string = e.target.value;

    if (value.length > 20) {
      setShowInvalidAlert(true);
    } else {
      handleNowContent(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && temp!.trim() !== '') {
      e.preventDefault();
      handleSearchData();
    }
  };

  const handleReSearch = (category: string): void => {
    handleCategoryClick(category);
    handleSearchData();
    setSearchParams({ query: temp! });
    navigate(`/search/${category}?query=${temp}`);
  };

  return (
    <Container>
      <InputContainer>
        <Input
          value={temp!}
          onKeyDown={handleKeyDown}
          onChange={handleSearch}
        />
        <SearchButton onClick={handleSearchData}>
          <SearchIcon src={SearchImage} alt="search" />
        </SearchButton>
      </InputContainer>
      <HashTagContainer>
        {hashTagID.map((list) => (
          <HashTag
            onClick={() => handleClick(list.id)}
            active={selectedFilter === list.id}
            key={list.id}
          >
            # {list.hashTag}
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
  justify-content: center;
  align-items: center;

  margin-left: 387px;
  margin-right: 351px;
  padding-left: 42px;
  width: 660px;
  height: 76px;

  border-radius: 90px;
  border: 4.19px solid #9819c3;
`;

const Input = styled.input`
  background-color: transparent;
  border: transparent;
  resize: none;
  outline: none;
  height: 40px;
  width: 660px;
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
  margin-right: 30px;
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
  height: max-content;
  align-items: center;
  margin-left: 205px;
  gap: 48px;
`;

const SelectText = styled.span`
  cursor: pointer;
  color: #4d4d4d;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  &.active {
    color: white;
    font-size: 22px;
  }
`;

const HashTag = styled.div<{ active: boolean }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  width: 154px;
  height: 50px;
  margin-right: 20px;
  margin-bottom: 14px;
  border-radius: 80px;
  border: 2px solid #bf00ff;
  text-align: center;
  font-size: 16px;
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
