import React, { useState, useEffect } from 'react';
import { useSearchParams, Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useSearch from '../hooks/useSearch';
import SearchBar from '../components/Search/SearchBar';

const SearchLayout = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');
  const navigate = useNavigate();

  const [select, setSelect] = useState('dance-classes');
  const [temp, setTemp] = useState(query || '');

  useEffect(() => {
    if (query) {
      setTemp(query);
    }
  }, [query]);

  const handleSearchData = () => {
    if (select && temp) {
      setSearchParams({ query: temp });
      navigate(`/search/${select}?query=${temp}`);
    }
  };

  const handleCategoryClick = (category) => {
    setSelect(category);
  };

  const handleNowContent = (content) => {
    setTemp(content);
  };

  return (
    <Container>
      <SearchBar
        select={select}
        handleCategoryClick={handleCategoryClick}
        temp={temp}
        handleNowContent={handleNowContent}
        handleSearchData={handleSearchData}
      />
      <ContentContainer>
        <Outlet />
      </ContentContainer>
    </Container>
  );
};

export default SearchLayout;

const Container = styled.div`
  background-color: black;
  padding-bottom: 150px;
  width: 1440px;
`;

const ContentContainer = styled.div`
  margin-left: 120px;
  margin-right: 120px;
`;
