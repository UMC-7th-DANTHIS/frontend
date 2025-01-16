import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import dummyClasses from '../../store/reservation/dummyClasses';
import { ReactComponent as Line } from '../../assets/shape/line.svg';
import { ReactComponent as FocusedCircle } from '../../assets/shape/focusedcircle.svg';

const ClassBoard = () => {
  const genres = [
    '힙합',
    '걸스힙합',
    '팝핑',
    '락킹',
    '걸리시/힐',
    '크럼프',
    '텃팅',
    '코레오',
    'K-pop'
  ];
  const [selectedGenre, setSelectedGenre] = useState(genres[0]);
  const filteredClasses = dummyClasses.filter(
    (cls) => cls.genre === selectedGenre
  );
  const navigate = useNavigate();

  // 장르 선택 핸들러
  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
  };

  // 수업 선택 핸들러
  const handleClassClick = (classId) => {
    navigate(`/classreservation/${classId}`);
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
      <Classes>
        {filteredClasses.map((cls) => (
          <Class key={cls.id} onClick={() => handleClassClick(cls.id)}>
            <Image></Image>
            <Title>{cls.title}</Title>
            <Dancer>{cls.dancer}</Dancer>
          </Class>
        ))}
      </Classes>
    </Container>
  );
};

export default ClassBoard;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  background-color: black;
  justify-content: center;
  padding-bottom: 50px; // 임시
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
const Classes = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(auto-fill, 333px);
  width: 880px;
  height: 800px; // 임시 712px
  margin-top: 38px;
  margin-left: 36px;

  overflow-y: auto;
  -ms-overflow-style: none; /* 1. Internet Explorer에서 스크롤바 숨기기 */
  scrollbar-width: none; /* 2. Firefox에서 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none; /* 3. Chrome, Safari에서 스크롤바 숨기기 */
  }
`;
const Class = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
