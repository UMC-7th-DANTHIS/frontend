import styled from 'styled-components';
import { GenreSelectionBarProps } from './GenreSelectionBar';
import { ReactComponent as FocusedCircle } from '../../../assets/shape/focusedcircle.svg';

export const GenreSelectionMobile = ({ genres, onGenreClick, selectedGenre }: GenreSelectionBarProps) => {
  return (
    <Topbar>
      {genres.map((genre) => (
        <GenreWrapper key={genre.id} onClick={() => onGenreClick(genre.id)}>
          {selectedGenre === genre.id && <FocusedCircle />}
          <Genre $isActive={selectedGenre === genre.id}>{genre.Genre}</Genre>
        </GenreWrapper>
      ))}
    </Topbar>
  );
};

const Topbar = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-content: space-between;
  justify-items: center;
  width: 100%;
  padding-bottom: 22px;
  gap: 18px;
  border-bottom: 2px solid var(--main-purple);

  ${({ theme }) => theme.media.tablet} {
    display: flex;
    flex-direction: row;
  }

  ${({ theme }) => theme.media.max} {
    display: none;
  }
`;
const GenreWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: 100px;
  cursor: pointer;
  white-space: nowrap;
`;
const Genre = styled.div<{ $isActive: boolean }>`
  color: var(--text-secondary-gray);
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.9px;
  transition: all 0.3s ease;

  ${({ theme }) => theme.media.tablet} {
    font-size: 18px;
  }

  ${({ $isActive }) =>
    $isActive &&
    `margin-left: 7px;
    color: var(--main-white);
    font-weight: 600;`}
`;
