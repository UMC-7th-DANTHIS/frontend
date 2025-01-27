import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import SearchBar from '../components/Search/SearchBar';
import SearchClass from '../components/Search/SearchClass';
import SearchDancer from '../components/Search/SearchDancer';
import SearchCommunity from '../components/Search/SearchCommunity';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');

  const [select, setSelect] = useState('class');
  const [temp, setTemp] = useState(query);

  useEffect(() => {
    if (query) {
      setTemp(query);
    }
  }, [query]);

  const handleCategoryClick = (category) => setSelect(category);
  const handleNowContent = (content) => setTemp(content);

  return (
    <Container>
      <SearchBar
        select={select}
        handleCategoryClick={handleCategoryClick}
        temp={temp}
        handleNowContent={handleNowContent}
      />
      <ContentContainer>
        {select === 'class' && <SearchClass temp={temp} />}
        {select === 'dancer' && <SearchDancer temp={temp} />}
        {select === 'community' && <SearchCommunity temp={temp} />}
      </ContentContainer>
    </Container>
  );
};

const Container = styled.div`
  background-color: black;
  padding-bottom: 150px;
`;

const ContentContainer = styled.div`
  margin-left: 120px;
  margin-right: 120px;
`;

export default SearchPage;
