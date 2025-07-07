type DancerType={
  id: number;
  dancerName: string;
  dancerImages: string[];
  isFavorite: boolean;
  instargramId: string;
  preferredGenres: number[];
  bio: string;
  classes?: DanceClassType[];
  history: string;
}

type DanceClassType={
  id: number;
  className: string;
  thumbnailImage: string;
}