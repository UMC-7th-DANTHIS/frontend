import React, { useState } from 'react';
import styled from 'styled-components';
import dummyClass from '../../store/reservation/dummyClass';
import { ReactComponent as Line } from '../../assets/shape/line.svg';
import { ReactComponent as FocusedCircle } from '../../assets/shape/focusedcircle.svg';

const Reservation = () => {
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
  const filteredClasses = dummyClass.filter(
    (cls) => cls.genre === selectedGenre
  );

  // 장르 선택 핸들러
  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
  };

  return (
    <Container>
      <Sidebar>
        {genres.map((genre) => (
          <GenreWrapper key={genre} onClick={() => handleGenreClick(genre)}>
            {selectedGenre === genre ? (
              <>
                <FocusedCircle />
                <FocusedGenre>{genre}</FocusedGenre>
              </>
            ) : (
              <Genre>{genre}</Genre>
            )}
          </GenreWrapper>
        ))}
      </Sidebar>
      <Line />
      <Classes>
        {filteredClasses.map((cls) => (
          <Class key={cls.id}>
            <p>{cls.name}</p>
          </Class>
        ))}
      </Classes>
    </Container>
  );
};

export default Reservation;

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
`;
const Genre = styled.div`
  color: var(--text_secondary-gray, #b2b2b2);
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -1.2px;
`;
const FocusedGenre = styled.div`
  margin-left: 13px;
  color: var(--main_white, #fff);
  font-family: Pretendard;
  font-size: 30px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -1.5px;
`;
const Classes = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 50px 40px;
  width: 880px;
  height: 430px;
  margin-top: 14px;
  margin-left: 80px;
`;
const Class = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 190px;
  height: 190px;
  flex-shrink: 0;
  border-radius: 3px;
  background: url(<path-to-image>) lightgray -103.255px -0.232px / 184.09%
    100.815% no-repeat;
`;
