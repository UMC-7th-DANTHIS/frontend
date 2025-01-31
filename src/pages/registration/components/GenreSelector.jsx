import React from 'react';
import styled from 'styled-components';

const GenreSelector = ({ selectedGenres, handleFormChange }) => {
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
  const maxGenresLength = 2;

  // 장르 선택 핸들러
  const handleSelect = (genre) => {
    let updatedGenres;

    if (selectedGenres.includes(genre)) {
      updatedGenres = selectedGenres.filter((g) => g !== genre);
    } else if (selectedGenres.length < maxGenresLength) {
      updatedGenres = [...selectedGenres, genre];
    } else {
      return;
    }

    handleFormChange('genres', updatedGenres);
  };

  return (
    <GenreWrapper>
      {genres.map((genre) => (
        <GenreBtn
          key={genre}
          type="button"
          selected={selectedGenres.includes(genre)}
          onClick={() => handleSelect(genre)}
        >
          #{genre}
        </GenreBtn>
      ))}
    </GenreWrapper>
  );
};

export default GenreSelector;

const GenreWrapper = styled.div`
  width: 514px;
  padding: 18px 37px 69px 37px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 33px;
  column-gap: 17px;
`;
const GenreBtn = styled.button`
  display: flex;
  width: 160px;
  max-width: 160px;
  padding: 8px 10px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  border: 1px solid
    ${(props) =>
      props.selected
        ? 'var(--main_purple, #9819C3)'
        : 'var(--sub_light-gray, #ddd)'};
  background-color: ${(props) =>
    props.selected ? 'var(--main_purple, #9819C3)' : 'transparent'};

  color: var(--sub_light-gray, #ddd);
  text-align: center;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  &:hover {
    cursor: pointer;
    border: 1px solid var(--main_purple, #9819c3);
  }

  &:nth-last-child(1) {
    grid-column: 2;
  }
`;
