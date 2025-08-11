import { useState } from 'react';
import styled from 'styled-components';
import { ClassesGrid, SelectionPanel } from '../../common/reservation';
import { ReactComponent as FocusedCircle } from '../../assets/shape/focusedcircle.svg';
import { DanceGenre as genres } from '../../api/schema';

export default function ClassesPage() {
  const [selectedGenre, setSelectedGenre] = useState(genres[0].id);

  const handleGenreClick = (genre: string) => setSelectedGenre(genre);

  return (
    <Container>
      <Sidebar>
        {genres.map((genre) => (
          <GenreWrapper key={genre.id} onClick={() => handleGenreClick(genre.id)}>
            {selectedGenre === genre.id && <FocusedCircle />}
            <Genre $isActive={selectedGenre === genre.id}>{genre.Genre}</Genre>
          </GenreWrapper>
        ))}
      </Sidebar>
      <ClassesContainer>
        <SelectionPanel />
        <ClassesGrid selectedGenre={selectedGenre} />
      </ClassesContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 30px;
  padding-bottom: 100px;
  gap: 40px;
`;
const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 150px;
  padding: 20px 0;
  gap: 40px;
  border-right: 2px solid var(--main-purple);
`;
const GenreWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;
const Genre = styled.div<{ $isActive: boolean }>`
  color: var(--text-secondary-gray);
  font-size: 18px;
  font-weight: 500;
  letter-spacing: -0.9px;
  transition: all 0.3s ease;

  ${({ $isActive }) =>
    $isActive &&
    `margin-left: 15px;
    color: var(--main-white);
    font-size: 24px;
    font-weight: 600;
    letter-spacing: -1.2px;`}
`;
const ClassesContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direaction: row;
  align-items: center;
  justify-content: space-between;
  gap: 80px;
`;
