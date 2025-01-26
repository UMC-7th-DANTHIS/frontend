import React, { useState } from 'react';
import styled from 'styled-components';

import imgDesc from '../../assets/Search/imageDescript.svg';

import dummyCommunity from '../../store/search/dummyCommunity';
import Pagination from '../Pagination';
import SearchNothing from './SearchNothing';

const SearchCommunity = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const perData = 5;

  const filteredList = dummyCommunity.slice(
    perData * (currentPage - 1),
    perData * currentPage
  );

  return (
    <Container>
      {filteredList ? (
        <>
          <CommunityLists>
            {filteredList?.map((list) => (
              <CommunityList>
                <TextContainer>
                  <Title>{list.Title}</Title>
                  {list.Image && (
                    <ImgDescriptContainer>
                      <ImgDescript src={imgDesc} alt={'사진 있어요'} />
                    </ImgDescriptContainer>
                  )}
                  <Content>{list.Content.slice(0, 300)}</Content>
                </TextContainer>
              </CommunityList>
            ))}
          </CommunityLists>
          <PaginationContainer>
            <Pagination
              dataLength={dummyCommunity.length}
              perData={perData}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </PaginationContainer>
        </>
      ) : (
        <SearchNothing />
      )}
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
  display: inline-block;
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 12px;
`;

const ImgDescriptContainer = styled.div`
  display: inline-flex;
  width: 20px;
  height: 20px;
  padding-left: 10px;
`;

const ImgDescript = styled.img`
  margin-top: 3px;
`;

const Content = styled.div`
  font-size: 18px;
  font-weight: 500;
`;

const PaginationContainer = styled.div`
  margin-left: 100px;
`;

export default SearchCommunity;
