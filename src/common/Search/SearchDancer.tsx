import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styled, { css } from 'styled-components';

import Pagination from '../../components/Pagination';
import SearchNothing from './SearchNothing';
import useSearch from '../../hooks/useSearch';

import { DanceGenre } from '../../api/schema';

type SearchDancerParams = {
  query: string | null;
  select: 'dancers';
};

const SearchDancer = ({ query, select }: SearchDancerParams) => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const perData: number = 5;

  const { data } = useSearch<'dancers'>(select, query, currentPage);

  return (
    <Container>
      {data?.data.results && data?.data.results.length > 0 ? (
        <>
          <ClassLists>
            {data?.data.results.map((list) => (
              <ClassWrapper>
                <ClassList
                  onClick={() => navigate(`/dancerprofile/${list.id}`)}
                >
                  <ImgContainer
                    src={list.profileImage?.[0]}
                    alt="프로필 이미지"
                  />
                  <TextContainer>
                    <TextHeader>{list.name}</TextHeader>
                    <TextContent>Instagram : {list.instagramId}</TextContent>
                    <TextContent>
                      주 장르 :{' '}
                      {list.mainGenres
                        .map(
                          (genreId) =>
                            DanceGenre.find(
                              (dance) => dance.id === String(genreId)
                            )?.Genre
                        )
                        .filter(Boolean)
                        .join(', ')}
                    </TextContent>
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
  cursor: pointer;
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
  color: #bf00ff;
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

export default SearchDancer;
