import { MypageGenreProps } from '@/types/mypage/MypageGenreType';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

const MypageGenre = ({
  genreSelect,
  selectedGenres: initialGenres,
  onGenreChange
}: MypageGenreProps) => {
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
    'K-pop',
    '없음'
  ];

  const [selectedGenres, setSelectedGenres] = useState<number[]>(
    initialGenres || []
  );

  useEffect(() => {
    setSelectedGenres(initialGenres || []);
  }, [initialGenres]);

  const handleGenreClick = (genre: string) => {
    const genreIndex = genres.indexOf(genre) + 1;

    setSelectedGenres((prevSelectedGenres) => {
      if (prevSelectedGenres.includes(genreIndex)) {
        const newGenres = prevSelectedGenres.filter(
          (selected) => selected !== genreIndex
        );
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
  box-sizing: border-box;

  @media (max-width: 1024px) {
    width: 90%;
    gap: 14px;
    row-gap: 28px;
  }

  @media (max-width: 768px) {
    width: 95%;
    padding: 24px 16px 0 16px;
    gap: 12px;
    row-gap: 24px;
  }

  @media (max-width: 600px) {
    width: 100%;
    padding: 20px 10px 0 10px;
    gap: 10px;
    row-gap: 20px;
  }
`;

const GenreBtn = styled.button<{ selected: boolean }>`
  flex: 1 1 calc(33.333% - 12px);
  max-width: 160px;
  min-width: 100px;
  padding: 8px 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 4px;
  border: 1px solid ${(props) => (props.selected ? '#9819C3' : '#ddd')};
  background-color: ${(props) => (props.selected ? '#9819C3' : 'transparent')};
  color: ${(props) => (props.selected ? '#fff' : '#ddd')};

  text-align: center;
  font-size: 15px;
  font-weight: 500;
  line-height: normal;
  box-sizing: border-box;

  &:hover {
    cursor: pointer;
    border: 1px solid #9819c3;
  }

  @media (max-width: 768px) {
    flex: 1 1 calc(45% - 10px);
    font-size: 14px;
  }

  @media (max-width: 480px) {
    flex: 1 1 calc(48% - 8px);
    font-size: 13px;
    padding: 6px 8px;
  }
`;
