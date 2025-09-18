import styled from 'styled-components';
import { GenreSelectionBarProps } from './GenreSelectionBar';
import circle from '../../../assets/shape/focusedcircle.svg';

export const GenreSelectionDesktop = ({ genres, onGenreClick, selectedGenre }: GenreSelectionBarProps) => {
  return (
    <Sidebar>
      {genres.map((genre) => (
        <GenreWrapper key={genre.id} onClick={() => onGenreClick(genre.id)}>
          {selectedGenre === genre.id && <img src={circle} alt={`선택된 장르 강조: ${selectedGenre}`} />}
          <Genre $isActive={selectedGenre === genre.id}>{genre.Genre}</Genre>
        </GenreWrapper>
      ))}
    </Sidebar>
  );
};

const Sidebar = styled.div`
  display: none;

  ${({ theme }) => theme.media.max} {
    display: flex;
    flex-direction: column;
    min-width: 150px;
    padding: 20px 0;
    gap: 40px;
    border-right: 2px solid var(--main-purple);
  }
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
