import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import axiosInstance from '../api/axios-instance';

import SearchBar from '../components/Search/SearchBar';
import SearchClass from '../components/Search/SearchClass';
import SearchDancer from '../components/Search/SearchDancer';
import SearchCommunity from '../components/Search/SearchCommunity';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');

  const [select, setSelect] = useState('classes');
  const [temp, setTemp] = useState(query);

  useEffect(() => {
    if (query) {
      setTemp(query);
    }
  }, [query]);

  const handleSearchData = async () => {
    try {
      const response = await axiosInstance.get(
        `/search/${select}?query=${temp}`
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryClick = (category) => setSelect(category);
  const handleNowContent = (content) => setTemp(content);

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
        {select === 'classes' && <SearchClass temp={temp} />}
        {select === 'dancers' && <SearchDancer temp={temp} />}
        {select === 'posts' && <SearchCommunity temp={temp} />}
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
