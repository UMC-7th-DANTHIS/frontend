import React, { useState } from 'react';
import styled from 'styled-components';

import dummyClass from '../../store/search/dummyClass';
import Pagination from '../Pagination';
import SearchNothing from './SearchNothing';

import { ReactComponent as StarFilled } from '../../assets/buttons/starlevel_filled.svg';
import { ReactComponent as StarNonfilled } from '../../assets/buttons/starlevel_nonfilled.svg';

const SearchClass = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const perData = 5;

  const filteredList = dummyClass.slice(
    perData * (currentPage - 1),
    perData * currentPage
  );

  return (
    <Container>
      {filteredList ? (
        <>
          <ClassLists>
            {filteredList?.map((list) => (
              <ClassList>
                <ImgContainer
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkpq_VnExTApuWh7iJNkdXdqeZciuAVoZF8A&s"
                  alt="프로필 이미지"
                />
                <TextContainer>
                  <TextContent>{list.Title}</TextContent>
                  <TextContent>수업 강사 : {list.Dancer}</TextContent>
                  <TextContent>장르 : {list.Genre}</TextContent>
                  <TextContent>가격 : {list.Price} / 회당</TextContent>
                  <StarsContainer>
                    <TextContent>난이도 : </TextContent>
                    {Array.from({ length: 5 }, (_, index) => {
                      const isFilled = index < list.Level;

                      return (
                        <StarBtn key={index}>
                          {isFilled ? <StarFilled /> : <StarNonfilled />}
                        </StarBtn>
                      );
                    })}
                  </StarsContainer>
                </TextContainer>
              </ClassList>
            ))}
          </ClassLists>
          <PaginationContainer>
            <Pagination
              dataLength={dummyClass.length}
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

const Container = styled.div`
  background-color: black;
`;

const ClassLists = styled.div`
  border-top: 2px solid #ddd;
  border-bottom: 2px solid #ddd;
`;

const ClassList = styled.div`
  display: flex;
  padding-top: 41px;
  padding-bottom: 41px;
  padding-left: 43px;

  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }
`;

const ImgContainer = styled.img`
  border-radius: 10px;
`;

const TextContainer = styled.div`
  flex-direction: column;
  margin-left: 38px;
  margin-top: 7px;
  margin-bottom: 12px;

  color: white;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 40px;
`;

const TextContent = styled.div`
  margin-right: 5px;
`;

const PaginationContainer = styled.div`
  margin-left: 100px;
`;

const StarsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 588px;
`;

const StarBtn = styled.div`
  margin-top: 3px;
`;

export default SearchClass;
