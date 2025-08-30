import { useState } from 'react';
import styled, { css } from 'styled-components';

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
              <ClassWrapper>
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
              </ClassWrapper>
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

const oneLineEllipsis = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Container = styled.div`
  padding-bottom: 120px;
`;

const ClassLists = styled.div`
  width: 100%;
  padding: 0 auto;

  border-top: 2px solid #ddd;
`;

const ClassWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  border-bottom: 2px solid #ddd;
`;

const ClassList = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  max-width: 970px;
  padding: 41px 0;

  min-height: 200px;
  max-height: 250px;

  gap: 24px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 30px;

  flex: 1 1 auto;
  min-width: 0;

  font-style: normal;
  font-weight: 600;
`;

const ImgContainer = styled.img`
  border-radius: 10px;
  width: 120px;
  height: 120px;

  ${({ theme }) => theme.media.tablet} {
    width: 160px;
    height: 160px;
  }
`;

const TextHeader = styled.div`
  ${oneLineEllipsis};
  font-size: 20px;
  ${({ theme }) => theme.media.tablet} {
    font-size: 22px;
  }
  color: white;
`;

const TextContent = styled.div`
  ${oneLineEllipsis};
  font-size: 16px;
  ${({ theme }) => theme.media.tablet} {
    font-size: 18px;
  }
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
  flex-wrap: nowrap;
`;

const StarBtn = styled.div`
  margin-top: 3px;
`;

export default SearchClass;
