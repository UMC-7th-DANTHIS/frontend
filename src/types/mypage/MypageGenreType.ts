export interface MypageGenreProps {
  genreSelect: number;
  selectedGenres: number[];
  onGenreChange: (selectedGenres: number[]) => void;
}
