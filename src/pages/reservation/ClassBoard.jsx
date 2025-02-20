import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as FocusedCircle } from '../../assets/shape/focusedcircle.svg';
import Pagination from '../../components/Pagination';
import api from '../../api/api';

const ClassBoard = () => {
  const genres = [
    { id: 1, name: '힙합' },
    { id: 2, name: '걸스힙합' },
    { id: 3, name: '팝핑' },
    { id: 4, name: '락킹' },
    { id: 5, name: '왁킹' },
    { id: 6, name: '걸리시/힐' },
    { id: 7, name: '크럼프' },
    { id: 8, name: '텃팅' },
    { id: 9, name: '코레오' },
    { id: 10, name: 'K-pop' }
  ];
  const [selectedGenre, setSelectedGenre] = useState(genres[0].id);
  const [classes, setClasses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const perData = 9;

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const genreId = selectedGenre;
        const response = await api.get(
          `/dance-classes/all?genre=${genreId}&page=${currentPage}`
        );

        setClasses(response.data?.data);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      } catch (error) {
        console.error('❌ 장르별 수업 정보를 불러오는 중 오류 발생:', error);
      }
    };

    fetchClasses();
  }, [selectedGenre, currentPage]);

  // 장르 선택 핸들러
  const handleGenreClick = (genre) => {
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
            <Genre $isActive={selectedGenre === genre.id}>{genre.name}</Genre>
          </GenreWrapper>
        ))}
      </Sidebar>
      <Line />
      <BoardContainer>
        <Classes>
          {classes.danceClasses?.map((cls) => (
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
        <Pagination
          dataLength={classes.totalElements}
          perData={perData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </BoardContainer>
    </Container>
  );
};

export default ClassBoard;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  background-color: black;
  justify-content: center;
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
const Genre = styled.div`
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
