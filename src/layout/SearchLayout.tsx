import { useState, useEffect } from 'react';
import { useSearchParams, Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import SearchBar from '../components/Search/SearchBar';

const SearchLayout = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const query: string | null = searchParams.get('query');

  const [select, setSelect] = useState<string>('dance-classes');
  const [temp, setTemp] = useState<string | null>(query || '');

  const [selectedFilter, setSelectedFilter] = useState<string | null>('');

  useEffect(() => {
    if (query) {
      setTemp(query);
    }
  }, [query]);

  const handleSearchData = (): void => {
    if (select && temp) {
      setSearchParams({ query: temp });
      navigate(`/search/${select}?query=${temp}`);
    }
  };

  const handleCategoryClick = (category: string): void => {
    setSelect(category);
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
        select={select}
        handleCategoryClick={handleCategoryClick}
        selectedFilter={selectedFilter}
        handleClick={handleClick}
        temp={temp}
        handleNowContent={handleNowContent}
        handleSearchData={handleSearchData}
      />
      <ContentContainer>
        <Outlet context={{ selectedFilter }} />
      </ContentContainer>
    </Container>
  );
};

const Container = styled.div`
  background-color: black;
  padding-bottom: 150px;
  width: 1440px;
`;

const ContentContainer = styled.div`
  margin-left: 120px;
  margin-right: 120px;
`;

export default SearchLayout;
