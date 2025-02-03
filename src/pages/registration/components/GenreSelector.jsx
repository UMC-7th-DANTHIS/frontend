import React from 'react';
import styled from 'styled-components';

const GenreSelector = ({ selectedGenres, handleFormChange }) => {
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
  const maxGenresLength = 2;

  // 장르 선택 핸들러
  const handleSelect = (genreId) => {
    let updatedGenres;

    if (selectedGenres.includes(genreId)) {
      updatedGenres = selectedGenres.filter((id) => id !== genreId);
    } else if (selectedGenres.length < maxGenresLength) {
      updatedGenres = [...selectedGenres, genreId];
    } else {
      return;
    }

    handleFormChange('preferredGenres', updatedGenres);
  };

  return (
    <GenreWrapper>
      {genres.map((genre) => (
        <GenreBtn
          key={genre.id}
          type="button"
          selected={selectedGenres.includes(genre.id)}
          onClick={() => handleSelect(genre.id)}
        >
          #{genre.name}
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
