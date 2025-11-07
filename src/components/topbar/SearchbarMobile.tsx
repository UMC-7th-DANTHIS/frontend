import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SearchIcon from '../../assets/searchicon.svg';

interface SearchbarMobileProps {
  onClose: () => void;
  setShowInvalidAlert: (value: boolean) => void;
}

export const SearchbarMobile = ({ onClose, setShowInvalidAlert }: SearchbarMobileProps) => {
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

  const handleSearch = (query: string) => {
    onClose();
    navigate(`/search/dance-classes?query=${query}`);
  };

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

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <>
      <Overlay onClick={handleClose} />
      <Search>
        <SearchInput
          id="main search"
          placeholder={searchPlaceholder}
          onFocus={(): void => setSearchPlaceholder('검색어를 입력하세요.')}
          onBlur={(): void => setSearchPlaceholder('검색어를 입력하세요.')}
          onKeyDown={handleKeyDown}
          onChange={(e): void => handleSearchInput(e)}
          value={search}
          maxLength={21}
        />

        <SearchButton onClick={handleSearchClick} disabled={search.trim() === ''}>
          <img src={SearchIcon} alt="search" />
        </SearchButton>
      </Search>
    </>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 998;
`;
const Search = styled.div`
  position: fixed;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  display: flex;
  align-items: center;
  width: 80%;
  min-width: 300px;
  max-width: 380px;
  height: 40px;
  border-radius: 22px;
  background: var(--main-gradation);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    margin: 2px;
    border-radius: 22px;
    background: var(--main-black);
  }
`;
const SearchInput = styled.input`
  z-index: 1;
  flex: 1;
  outline: none;
  padding: 0 22px;
  color: var(--main-white);
  font-size: 16px;
  background: none;
  border: none;

  &::placeholder {
    color: var(--sub-light-gray);
  }

  &:focus::placeholder {
    color: var(--text-gray);
  }
`;
const SearchButton = styled.button`
  display: flex;
  z-index: 1;
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 14px;

  &:disabled {
    cursor: not-allowed;

    ${({ theme }) => theme.media.tablet} {
      opacity: 0.5;
    }
  }

  img {
    width: 20px;
    height: 20px;

    ${({ theme }) => theme.media.tablet} {
      width: 16px;
      height: 16px;
    }
  }
`;
