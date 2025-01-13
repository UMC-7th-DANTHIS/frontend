import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import dummyCommunity from '../../store/dummyCommunity';

const SearchCommunity = () => {
  const [data, setData] = useState([]);

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
  padding-top: 41px;
  padding-bottom: 41px;
  padding-left: 43px;

  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }
`;

const TextContainer = styled.div`
  flex-direction: column;
  margin-left: 38px;
  margin-bottom: 12px;

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

export default SearchCommunity;
