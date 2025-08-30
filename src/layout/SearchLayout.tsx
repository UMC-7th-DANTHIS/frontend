import { useState, useEffect } from 'react';
import {
  useSearchParams,
  Outlet,
  useNavigate,
  useLocation
} from 'react-router-dom';
import styled from 'styled-components';

import SearchBar from '../common/Search/SearchBar';

const SearchLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const query: string | null = searchParams.get('query');

  const defaultQuery: 'dance-classes' | 'dancers' | 'posts' = pathname.includes(
    'posts'
  )
    ? 'posts'
    : pathname.includes('dancers')
      ? 'dancers'
      : 'dance-classes';

  const [temp, setTemp] = useState<string | null>(query || '');

  const [selectedFilter, setSelectedFilter] = useState<string | null>('');

  useEffect(() => {
    if (query) {
      setTemp(query);
    }
  }, [query]);

  const handleSearchData = (): void => {
    if (defaultQuery && temp) {
      setSearchParams({ query: temp });
      navigate(`/search/${defaultQuery}?query=${temp}`);
    }
  };

  const handleNowContent = (content: string): void => {
    setTemp(content);
  };

  const handleClick = (tag: string): void => {
    setSelectedFilter((prev) => (prev === tag ? '' : tag));
  };

  return (
    <Container>
      <SearchBar
        select={defaultQuery}
        selectedFilter={selectedFilter}
        handleClick={handleClick}
        temp={temp}
        handleNowContent={handleNowContent}
        handleSearchData={handleSearchData}
      />
      <Outlet context={{ selectedFilter }} />
    </Container>
  );
};

const Container = styled.div`
  background-color: black;
  padding-bottom: 150px;

  padding: 0 2rem;
  width: 100dvw;
  max-width: 1200px;
`;

export default SearchLayout;
