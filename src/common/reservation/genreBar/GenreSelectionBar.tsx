import { DancerGenreInterface } from '../../../api/schema';
import { GenreSelectionDesktop } from './GenreSelectionBarDesktop';
import { GenreSelectionMobile } from './GenreSelectionBarMobile';

export interface GenreSelectionBarProps {
  genres: DancerGenreInterface[];
  onGenreClick: (genre: string) => void;
  selectedGenre: string;
}

export const GenreSelectionBar = (props: GenreSelectionBarProps) => {
  return (
    <>
      <GenreSelectionDesktop {...props} />
      <GenreSelectionMobile {...props} />
    </>
  );
};
