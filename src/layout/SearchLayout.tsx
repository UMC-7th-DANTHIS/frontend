import React, { useState, useEffect } from 'react';
import { useSearchParams, Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import SearchBar from '../components/Search/SearchBar';
import { hashTagID } from '../api/schema';

const SearchLayout = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');

  const [select, setSelect] = useState('dance-classes');
  const [temp, setTemp] = useState(query || '');

  const [selectedFilter, setSelectedFilter] = useState('');

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

  const handleClick = (tag) => {
    setSelectedFilter((prev) => (prev === tag ? '' : tag));
  };

  return (
    <Container>
      <SearchBar
        hashTagID={hashTagID}
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
