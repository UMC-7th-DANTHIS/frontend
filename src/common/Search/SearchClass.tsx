import { useState } from 'react';
import styled from 'styled-components';

import { ReactComponent as StarFilled } from '../../assets/buttons/starlevel_filled.svg';
import { ReactComponent as StarNonfilled } from '../../assets/buttons/starlevel_nonfilled.svg';

import Pagination from '../../components/Pagination';
import SearchNothing from './SearchNothing';

import useSearch from '../../hooks/useSearch';
import { DanceGenre } from '../../api/schema';

type SearchClassParams = {
  query: string | null;
  select: 'dance-classes';
};

const SearchClass = ({ query, select }: SearchClassParams) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const perData: number = 5;

  const { data } = useSearch<'dance-classes'>(select, query, currentPage);

  return (
    <Container>
      {data?.data.results && data!.data.results.length > 0 ? (
        <>
          <ClassLists>
            {data?.data.results.map((list) => (
              <ClassList>
                <ImgContainer src={list.classImage[0]} alt="프로필 이미지" />
                <TextContainer>
                  <TextHeader>{list.className}</TextHeader>
                  <TextContent>수업 강사 : {list.dancer}</TextContent>
                  <TextContent>
                    장르 :{' '}
                    {
                      DanceGenre.find(
                        (dance) => dance.id === String(list.genre)
                      )?.Genre
                    }
                  </TextContent>
                  <TextContent>
                    가격 : {list.pricePerSession} / 회당
                  </TextContent>
                  <StarsContainer>
                    <TextContent>난이도 : </TextContent>
                    {Array.from({ length: 5 }, (_, index) => {
                      const isFilled: boolean = index < list.difficulty;

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
              dataLength={data?.data.pagination.totalResults!}
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
  padding-left: 85px;

  min-height: 200px;
  max-height: 250px;
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }
`;

const ImgContainer = styled.img`
  border-radius: 10px;

  width: 160px;
  height: 160px;
`;

const TextContainer = styled.div`
  flex-direction: column;
  line-height: 30px;
  margin-left: 38px;

  font-style: normal;
  font-weight: 600;
`;

const TextHeader = styled.div`
  font-size: 22px;
  margin-right: 5px;
  color: white;
`;

const TextContent = styled.div`
  font-size: 18px;
  margin-right: 5px;
  color: #b2b2b2;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 91px;
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
