import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { ReactComponent as FocusedCircle } from '../../assets/shape/focusedcircle.svg';
import Pagination from '../../common/Pagination';
import LoadingSpinner from '../../common/LoadingSpinner';

import { DanceGenre as genres } from '../../api/schema';
import { AllClassData } from '../../types/MainInterface';
import useFetchData from '../../hooks/useFetchData';

const ClassList = () => {
  const [selectedGenre, setSelectedGenre] = useState<string>(genres[0].id);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const perData: number = 9;
  const { data, isLoading, fetchData } = useFetchData<AllClassData>();

  useEffect(() => {
    const fetchClasses = async () => {
      await fetchData(
        `/dance-classes/all?genre=${selectedGenre}&page=${currentPage}`
      );
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    fetchClasses();
  }, [selectedGenre, currentPage, fetchData]);

  // 장르 선택 핸들러
  const handleGenreClick = (genre: string) => {
    setSelectedGenre(genre);
  };

  return (
    <Container>
      <Sidebar>
        {genres.map((genre) => (
          <GenreWrapper
            key={genre.id}
            onClick={() => handleGenreClick(genre.id)}
          >
            {selectedGenre === genre.id && <FocusedCircle />}
            <Genre $isActive={selectedGenre === genre.id}>{genre.Genre}</Genre>
          </GenreWrapper>
        ))}
      </Sidebar>
      <Line />
      {isLoading ? (
        <LoadingContainer>
          <LoadingSpinner isLoading={isLoading} />
        </LoadingContainer>
      ) : (
        <BoardContainer>
          <Classes>
            {data?.danceClasses?.map((cls) => (
              <Class to={`/classreservation/${cls.id}`} key={cls.id}>
                <Image
                  src={cls.thumbnailImage}
                  alt={`class #${cls.id} thumbnail`}
                />
                <Title>{cls.className}</Title>
                <Dancer>{cls.dancerName}</Dancer>
              </Class>
            ))}
          </Classes>
          {data && (
            <Pagination
              dataLength={data.totalElements}
              perData={perData}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </BoardContainer>
      )}
    </Container>
  );
};

export default ClassList;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  background-color: black;
  justify-content: center;
  width: 1440px;
`;
const LoadingContainer = styled.div`
  width: 880px;
  margin: 38px 0 160px 36px;
`;
const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  height: 900px;
  margin-top: 14px;
`;
const Line = styled.div`
  width: 0px;
  height: 770px;
  border: 2px solid var(--main_purple, #9819c3);
`;
const GenreWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 197px;
  margin-bottom: 50px;

  &:hover {
    cursor: pointer;
  }
`;
const Genre = styled.div<{ $isActive: boolean }>`
  color: var(--text_secondary-gray, #b2b2b2);
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -1.2px;
  transition: all 0.3s ease;

  ${({ $isActive }) =>
    $isActive &&
    `margin-left: 13px;
    color: var(--main_white, #fff);
    font-size: 30px;
    font-weight: 600;
    letter-spacing: -1.5px;`}
`;
const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 38px 0 160px 36px;
`;
const Classes = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(auto-fill, 333px);
  width: 880px;
`;
const Class = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration-line: none;
  margin-bottom: 54px;

  &:hover {
    cursor: pointer;
  }
`;
const Image = styled.img`
  width: 220px;
  height: 220px;
  border-radius: 10px;
  background: url(<path-to-image>) lightgray 50% / cover no-repeat;
  object-fit: cover;
`;
const Title = styled.div`
  margin-top: 9px;
  color: #fff;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -1.2px;
`;
const Dancer = styled.div`
  color: var(--text_secondary-gray, #b2b2b2);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.9px;
`;
