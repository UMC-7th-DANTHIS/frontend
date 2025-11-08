import { useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

import SearchImage from '../../assets/Search/search.svg';
import { hashTagID } from '../../api/schema';
import { ModalOneBtn } from '../../components/modals';

type SearchBarProps = {
  handleSearchData: () => void;
  handleNowContent: (content: string) => void;
  handleClick: (tag: string) => void;
  temp: string | null;
  select: string | null;
  selectedFilter: string | null;
};

const SearchBar = ({
  handleSearchData,
  handleClick,
  handleNowContent,
  temp,
  select,
  selectedFilter
}: SearchBarProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const defaultQuery: 'dance-classes' | 'dancers' | 'posts' = pathname.includes('posts')
    ? 'posts'
    : pathname.includes('dancers')
      ? 'dancers'
      : 'dance-classes';

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
    handleSearchData();
    setSearchParams({ query: temp! });
    navigate(`/search/${category}?query=${temp}`);
  };

  return (
    <Container>
      <InputWrapper>
        <InputContainer>
          <Input value={temp!} onKeyDown={handleKeyDown} onChange={handleSearch} />

          <SearchIcon src={SearchImage} alt="search" onClick={handleSearchData} />
        </InputContainer>
      </InputWrapper>
      <HashTagContainer>
        {hashTagID.map((list) => (
          <HashTag onClick={() => handleClick(list.id)} active={selectedFilter === list.id} key={list.id}>
            # {list.hashTag}
          </HashTag>
        ))}
      </HashTagContainer>

      <SelectContainer>
        <SelectWrapper>
          <SelectText
            className={defaultQuery === 'dance-classes' ? 'active' : ''}
            onClick={() => handleReSearch('dance-classes')}
          >
            수업
          </SelectText>
          <SelectText className={defaultQuery === 'dancers' ? 'active' : ''} onClick={() => handleReSearch('dancers')}>
            댄서
          </SelectText>
          <SelectText className={defaultQuery === 'posts' ? 'active' : ''} onClick={() => handleReSearch('posts')}>
            커뮤니티
          </SelectText>
        </SelectWrapper>
      </SelectContainer>

      {showInvalidAlert && (
        <ModalOneBtn
          message={
            <AlertText>
              검색어는
              <ColoredText>최대 20자</ColoredText>
              까지 {'\n'} 입력 가능합니다.
            </AlertText>
          }
          onClose={() => setShowInvalidAlert(false)}
          showButtons={true}
        />
      )}
    </Container>
  );
};

const oneLineEllipsis = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Container = styled.div`
  width: 100%;
  background-color: #000;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: clamp(16px, 4vw, 40px) 0;
  row-gap: clamp(16px, 3vw, 28px);
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.media.tablet} {
    max-width: 660px;
  }

  width: 100%;
  height: 76px;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${({ theme }) => theme.media.tablet} {
    max-width: 660px;
  }

  width: 100%;
  height: 100%;

  padding-left: 3rem;
  padding-right: 2rem;

  border-radius: 90px;
  border: 4.19px solid #9819c3;
`;

const Input = styled.input`
  ${({ theme }) => theme.media.tablet} {
    font-size: 33.524px;
  }

  background-color: transparent;
  border: transparent;
  resize: none;
  outline: none;
  height: 40px;

  color: white;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const SearchIcon = styled.img`
  ${({ theme }) => theme.media.tablet} {
    width: 33px;
    height: 33px;
  }

  width: 20px;
  height: 20px;

  cursor: pointer;
`;

const SelectWrapper = styled.div`
  display: flex;
  width: 100%;
  height: max-content;

  gap: 48px;
  max-width: 1000px;

  justify-content: start;
  align-items: center;
`;

const SelectContainer = styled.div`
  display: flex;
  width: 100%;

  justify-content: center;
  align-items: center;

  margin: 0 auto;
  height: max-content;
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

const HashTagContainer = styled.div`
  width: 100%;
  max-width: 1100px;
  padding: 0 16px;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 50px;
  gap: 14px 20px;

  margin-top: clamp(12px, 2.5vw, 24px);
  margin-bottom: clamp(20px, 6vw, 48px);

  ${({ theme }) => theme.media.tablet} {
    grid-template-columns: repeat(6, 1fr);
    grid-auto-rows: 50px;
  }
`;

const HashTag = styled.div<{ active: boolean }>`
  ${oneLineEllipsis};

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 80px;
  border: 2px solid #bf00ff;

  font-weight: 500;
  font-size: clamp(12px, 2.8vw, 16px);

  background-color: ${({ active }) => (active ? '#BF00FF' : 'transparent')};
  color: ${({ active }) => (active ? '#fff' : '#B2B2B2')};

  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  width: 100%;
  height: 100%;
`;

const AlertText = styled.span`
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px;
  white-space: pre-line;

  ${({ theme }) => theme.media.tablet} {
    font-size: 16px;
  }
`;

const ColoredText = styled.span`
  color: #a60f62;
  font-weight: bold;
`;

export default SearchBar;
