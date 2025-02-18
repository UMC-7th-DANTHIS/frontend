import React, { useState, useEffect } from "react";
import styled from "styled-components";

const MypageGenre = ({ genreSelect, selectedGenres: initialGenres, onGenreChange }) => {
  const genres = [
    "힙합",
    "걸스힙합",
    "팝핑",
    "락킹",
    "왁킹",
    "걸리시/힐",
    "크럼프",
    "텃팅",
    "코레오",
    "K-pop",
    "없음"
  ];

  const [selectedGenres, setSelectedGenres] = useState(initialGenres || []);

  useEffect(() => {
    setSelectedGenres(initialGenres || []);
  }, [initialGenres]);

  const handleGenreClick = (genre) => {
    const genreIndex = genres.indexOf(genre) + 1;

    setSelectedGenres((prevSelectedGenres) => {
      if (prevSelectedGenres.includes(genreIndex)) {
        const newGenres = prevSelectedGenres.filter((selected) => selected !== genreIndex);
        onGenreChange(newGenres);
        return newGenres;
      } else if (prevSelectedGenres.length < genreSelect) {
        const newGenres = [...prevSelectedGenres, genreIndex];
        onGenreChange(newGenres);
        return newGenres;
      }
      return prevSelectedGenres;
    });
  };

  return (
    <div>
      <GenreWrapper>
        {genres.map((genre, index) => (
          <GenreBtn
            key={genre}
            type="button"
            selected={selectedGenres.includes(index + 1)}
            onClick={() => handleGenreClick(genre)}
          >
            #{genre}
          </GenreBtn>
        ))}
      </GenreWrapper>
    </div>
  );
};

export default MypageGenre;

const GenreWrapper = styled.div`
  width: 514px;
  padding: 36px 36px 0 37px;
  display: flex;
  flex-wrap: wrap;
  gap: 17px;
  row-gap: 33px;
  justify-content: center;
  align-items: center;
`;

const GenreBtn = styled.button`
  display: flex;
  width: 160px;
  max-width: 160px;
  padding: 8px 10px;
  gap: 8px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 1px solid ${(props) => (props.selected ? "#9819C3" : "#ddd")};
  background-color: ${(props) => (props.selected ? "#9819C3" : "transparent")};
  color: ${(props) => (props.selected ? "#fff" : "#ddd")}; 

  text-align: center;
  font-size: 15px;
  font-weight: 500;
  line-height: normal;

  &:hover {
    cursor: pointer;
    border: 1px solid #9819c3;
  }
`;