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
  width: 90%;
  min-width: 345px;
  padding-top: 30px;
  padding-bottom: 100px;
  gap: 20px;

  ${({ theme }) => theme.media.desktop} {
    flex-direction: row;
    gap: 40px;
  }
`;
const ClassesContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 60px;

  ${({ theme }) => theme.media.desktop} {
    flex-direction: row;
    gap: 80px;
  }
`;
