import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SearchIcon from '../../assets/searchicon.svg';

interface TopbarSearchProps {
  setShowInvalidAlert: (value: boolean) => void;
}

/**
 * 상단바 검색창 컴포넌트
 * - 검색어 입력과 유효성 검사
 * - 검색 버튼 클릭 혹은 Enter 입력 시 검색어로 검색 페이지 이동
 *
 * @param setShowInvalidAlert 검색어 길이 초과 알림 표시를 제어하는 함수
 */
const TopbarSearch = ({ setShowInvalidAlert }: TopbarSearchProps) => {
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [searchPlaceholder, setSearchPlaceholder] = useState('검색어를 입력하세요');

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;

    if (value.length > 20) {
      setShowInvalidAlert(true);
    } else {
      setSearch(value);
      setShowInvalidAlert(false);
    }
  };

  const handleSearch = (query: string) => navigate(`/search/dance-classes?query=${query}`);

  const handleSearchClick = () => {
    if (search.trim()) {
      handleSearch(search.trim());
      setSearch('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && search.trim() !== '') {
      setTimeout(() => handleSearchClick(), 0);
    }
  };

  return (
    <Search>
      <SearchInput
        id="main search"
        placeholder={searchPlaceholder}
        onFocus={(): void => setSearchPlaceholder('')}
        onBlur={(): void => setSearchPlaceholder('검색어를 입력하세요')}
        onKeyDown={handleKeyDown}
        onChange={(e): void => handleSearchInput(e)}
        value={search}
        maxLength={21}
      />
      <SearchButton onClick={handleSearchClick} disabled={search.trim() === ''}>
        <img src={SearchIcon} alt="search" />
      </SearchButton>
    </Search>
  );
};

export default TopbarSearch;

const Search = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 50px;
  height: 27px;
  border-radius: 43px;
  background: var(--main-gradation);
  padding-right: 2px;

  order: 1;
  ${({ theme }) => theme.media.tablet} {
    width: 210px;
    height: 36px;
    padding: 9px 14px 9px 20px;
    order: 2;
  }
  ${({ theme }) => theme.media.desktop} {
    width: 315px;
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 43px;
    background: black;
    margin: 2px;
  }
`;
const SearchInput = styled.input`
  display: none;

  ${({ theme }) => theme.media.tablet} {
    display: block;
    flex-grow: 1;
    background: none;
    color: white;
    border: none;
    width: 100%;
    outline: none;
    z-index: 1;

    &:focus {
      border: none;
    }

    &::placeholder {
      color: var(--sub-light-gray);
    }
  }
`;
const SearchButton = styled.button`
  display: flex;
  align-items: center;
  z-index: 1;
  background: none;
  border: none;
  margin-left: auto;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;

    ${({ theme }) => theme.media.tablet} {
      opacity: 0.5;
    }
  }

  img {
    width: 12px;
    height: 12px;

    ${({ theme }) => theme.media.tablet} {
      width: 16px;
      height: 16px;
    }
  }
`;
