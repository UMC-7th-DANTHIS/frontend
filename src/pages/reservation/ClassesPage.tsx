import { useState } from 'react';
import styled from 'styled-components';
import { ClassesGrid, GenreSelectionBar, SelectionPanel } from '../../common/reservation';
import { DanceGenre as genres } from '../../api/schema';

export default function ClassesPage() {
  const [selectedGenre, setSelectedGenre] = useState(genres[0].id);

  const handleGenreClick = (genre: string) => setSelectedGenre(genre);

  return (
    <Container>
      <GenreSelectionBar genres={genres} onGenreClick={handleGenreClick} selectedGenre={selectedGenre} />
      <ClassesContainer>
        <SelectionPanel />
        <ClassesGrid selectedGenre={selectedGenre} />
      </ClassesContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px 32px 100px 32px;
  gap: 20px;

  ${({ theme }) => theme.media.tablet} {
    padding: 30px 64px 100px 64px;
    gap: 36px;
  }

  ${({ theme }) => theme.media.max} {
    flex-direction: row;
    gap: 40px;
  }
`;
const ClassesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  width: 100%;
  gap: 60px;

  ${({ theme }) => theme.media.desktop} {
    flex-direction: row;
    gap: 80px;
  }
`;
