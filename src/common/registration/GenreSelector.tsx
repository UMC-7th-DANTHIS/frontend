import styled from 'styled-components';
import { DanceGenre as genres } from '../../api/schema';
import { ClassFormState, DancerFormState, HandleFormChange } from '../../types/registration';

interface DancerGenreSelectorProps {
  selectedGenres: string[];
  handleFormChange: HandleFormChange<DancerFormState>;
}

export const GenreSelectorDancer = ({ selectedGenres, handleFormChange }: DancerGenreSelectorProps) => {
  const maxGenresLength = 2;

  // 장르 선택 핸들러
  const handleSelect = (genreId: string) => {
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
          #{genre.Genre}
        </GenreBtn>
      ))}
    </GenreWrapper>
  );
};

interface ClassGenreSelectorProps {
  selectedGenre: number;
  handleFormChange: HandleFormChange<ClassFormState>;
}

export const GenreSelectorClass = ({ selectedGenre, handleFormChange }: ClassGenreSelectorProps) => {
  // 단일 선택
  // 장르 선택 핸들러
  const handleSelect = (genreId: number) => {
    const updatedGenre = genreId;
    handleFormChange('genre', updatedGenre);
  };

  return (
    <GenreWrapper>
      {genres.map((genre) => (
        <GenreBtn
          key={genre.id}
          type="button"
          selected={selectedGenre === Number(genre.id)}
          onClick={() => handleSelect(Number(genre.id))}
        >
          #{genre.Genre}
        </GenreBtn>
      ))}
    </GenreWrapper>
  );
};

const GenreWrapper = styled.div`
  width: 514px;
  padding: 18px 37px 69px 37px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 33px;
  column-gap: 17px;
`;
const GenreBtn = styled.button<{ selected: boolean }>`
  display: flex;
  width: 160px;
  max-width: 160px;
  padding: 8px 10px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  border: 1px solid ${({ selected }) => (selected ? 'var(--main_purple, #9819C3)' : 'var(--sub_light-gray, #ddd)')};
  background-color: ${({ selected }) => (selected ? 'var(--main_purple, #9819C3)' : 'transparent')};
  transition: all 0.3s ease-in-out;

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
