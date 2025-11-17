import styled from 'styled-components';
import { DanceGenre as genres } from '../../../../api/schema';
import { ClassFormState, DancerFormState, HandleFormChange } from '@/types/registration';

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
        <GenreButton
          key={genre.id}
          type="button"
          selected={selectedGenres.includes(genre.id)}
          onClick={() => handleSelect(genre.id)}
        >
          #{genre.Genre}
        </GenreButton>
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
        <GenreButton
          key={genre.id}
          type="button"
          selected={selectedGenre === Number(genre.id)}
          onClick={() => handleSelect(Number(genre.id))}
        >
          <span>#{genre.Genre}</span>
        </GenreButton>
      ))}
    </GenreWrapper>
  );
};

const GenreWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  justify-items: center;
  width: 100%;
  row-gap: 14px;
  column-gap: 12px;

  ${({ theme }) => theme.media.tablet} {
    padding: 18px 37px 69px 37px;
    row-gap: 33px;
    column-gap: 17px;
  }
`;
const GenreButton = styled.button<{ selected: boolean }>`
  display: flex;
  max-width: 160px;
  padding: 8px 10px;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 8px;
  border-radius: 4px;
  border: 1px solid ${({ selected }) => (selected ? 'var(--main-purple)' : 'var(--sub-light-gray)')};
  background-color: ${({ selected }) => (selected ? 'var(--main-purple)' : 'transparent')};
  transition: all 0.2s ease-in-out;

  &:hover {
    cursor: pointer;
    border: 1px solid var(--main-purple);
  }

  &:nth-last-child(1) {
    grid-column: 2;
  }

  span {
    color: var(--sub-light-gray);
    text-align: center;
    font-family: Pretendard;
    font-size: 12px;
    font-weight: 500;

    ${({ theme }) => theme.media.tablet} {
      font-size: 15px;
    }
  }
`;
