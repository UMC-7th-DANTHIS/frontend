import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import dummyClasses from '../../store/reservation/dummyClasses';
import { ReactComponent as Line } from '../../assets/shape/line.svg';
import { ReactComponent as FocusedCircle } from '../../assets/shape/focusedcircle.svg';
import Pagination from '../../components/Pagination';
import dancerImg from '../../assets/dummyphoto/dancer.svg';

const ClassBoard = () => {
  const genres = [
    '힙합',
    '걸스힙합',
    '팝핑',
    '락킹',
    '왁킹',
    '걸리시/힐',
    '크럼프',
    '텃팅',
    '코레오',
    'K-pop'
  ];
  const [selectedGenre, setSelectedGenre] = useState(genres[0]);
  const [classes, setClasses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const perData = 9;

  useEffect(() => {
    setClasses(dummyClasses.filter((cls) => cls.genre === selectedGenre));
  }, [selectedGenre]);

  // 장르 선택 핸들러
  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
  };

  // 현재 페이지에 보여질 요소 계산
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * perData;
    const endIndex = startIndex + perData;

    return classes.slice(startIndex, endIndex);
  };

  return (
    <Container>
      <Sidebar>
        {genres.map((genre) => (
          <GenreWrapper key={genre} onClick={() => handleGenreClick(genre)}>
            {selectedGenre === genre && <FocusedCircle />}
            <Genre $isActive={selectedGenre === genre}>{genre}</Genre>
          </GenreWrapper>
        ))}
      </Sidebar>
      <Line />
      <BoardContainer>
        <Classes>
          {getCurrentPageData().map((cls) => (
            <Class to={`/classreservation/${cls.id}`} key={cls.id}>
              <Image>
                <img
                  src={cls.thumbnail ? cls.thumbnail : dancerImg}
                  alt={`class #${cls.id} thumbnail`}
                />
              </Image>
              <Title>{cls.title}</Title>
              <Dancer>{cls.dancer}</Dancer>
            </Class>
          ))}
        </Classes>
        <Pagination
          dataLength={classes.length}
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
  margin: 38px 36px;
`;
const Classes = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(auto-fill, 333px);
  width: 880px;
  height: 999px;
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
const Image = styled.div`
  width: 220px;
  height: 220px;
  border-radius: 10px;
  background: url(<path-to-image>) lightgray 50% / cover no-repeat;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover; // 비율 유지
  }
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
