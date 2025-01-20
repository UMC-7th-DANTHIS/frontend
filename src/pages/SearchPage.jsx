import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import SearchBar from '../components/Search/SearchBar';
import SearchClass from '../components/Search/SearchClass';
import SearchDancer from '../components/Search/SearchDancer';
import SearchCommunity from '../components/Search/SearchCommunity';

const SearchPage = () => {
  const [select, setSelect] = useState('class');

  const handleCategoryClick = (category) => setSelect(category);

  return (
    <Container>
      <SearchBar select={select} handleCategoryClick={handleCategoryClick} />
      <ContentContainer>
        {select === 'class' && <SearchClass />}
        {select === 'dancer' && <SearchDancer />}
        {select === 'community' && <SearchCommunity />}
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
