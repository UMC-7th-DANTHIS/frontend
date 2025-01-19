import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import dummyCommunity from '../../store/search/dummyCommunity';
import Pagination from '../Pagination';

const SearchCommunity = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setData(dummyCommunity);
  });

  return (
    <Container>
      <CommunityLists>
        {data?.map((list) => (
          <CommunityList>
            <TextContainer>
              <Title>{list.Title}</Title>
              <Content>{list.Content.slice(0, 300)}</Content>
            </TextContainer>
          </CommunityList>
        ))}
      </CommunityLists>
      <PaginationContainer>
        <Pagination
          dataLength={120}
          perData={5}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </PaginationContainer>
    </Container>
  );
};

const Container = styled.div``;

const CommunityLists = styled.div`
  border-top: 2px solid #ddd;
  border-bottom: 2px solid #ddd;
`;

const CommunityList = styled.div`
  display: flex;
  padding-left: 114px;
  padding-right: 114px;
  padding-top: 41px;
  padding-bottom: 41px;

  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }
`;

const TextContainer = styled.div`
  flex-direction: column;
  border: 1px solid #dddddd;
  border-radius: 10px;

  padding-left: 50px;
  padding-right: 39px;
  padding-top: 29px;
  padding-bottom: 29px;

  color: white;
  font-style: normal;
  line-height: normal;
`;

const Title = styled.div`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 12px;
`;

const Content = styled.div`
  font-size: 18px;
  font-weight: 500;
`;

const PaginationContainer = styled.div`
  margin-left: 100px;
`;

export default SearchCommunity;
