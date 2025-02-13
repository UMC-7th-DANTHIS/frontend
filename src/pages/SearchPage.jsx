import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import useSearch from '../hooks/useSearch';

import SearchBar from '../components/Search/SearchBar';
import SearchClass from '../components/Search/SearchClass';
import SearchDancer from '../components/Search/SearchDancer';
import SearchCommunity from '../components/Search/SearchCommunity';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');

  const [select, setSelect] = useState('dance-classes');
  const [temp, setTemp] = useState(query || '');
  const [searchQuery, setSearchQuery] = useState(null);

  const { data, isLoading, isError } = useSearch(
    searchQuery?.select,
    searchQuery?.temp
  );

  console.log('검색 데이터:', data);

  useEffect(() => {
    if (query) {
      setTemp(query);
    }
    setSearchQuery({ select: 'dance-classes', temp: query || '' });
  }, [query]);

  const handleCategoryClick = (category) => setSelect(category);
  const handleNowContent = (content) => setTemp(content);

  const handleSearchData = () => {
    if (select && temp) {
      setSearchQuery({ select, temp });
    }
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
        {isLoading && <p>검색 중...</p>}
        {isError && <p>오류 발생</p>}
        {!isLoading && !isError && data && (
          <>
            {select === 'dance-classes' && (
              <SearchClass data={data} isLoading={isLoading} />
            )}
            {select === 'dancers' && (
              <SearchDancer data={data} isLoading={isLoading} />
            )}
            {select === 'posts' && (
              <SearchCommunity data={data} isLoading={isLoading} />
            )}
          </>
        )}
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

export default SearchPage;
