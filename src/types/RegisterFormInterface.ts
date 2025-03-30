// 댄서 등록 폼
export interface DancerFormProps {
  dancerName: string;
  instargramId: string;
  openChatUrl: string;
  bio: string;
  history: string;
  preferredGenres: string[];
  dancerImages: string[];
}

// 수업 등록 폼
export interface ClassFormProps {
  className: string;
  pricePerSession: string;
  difficulty: number;
  genre: number;
  description: string;
  targetAudience: string;
  hashtags: number[];
  images: string[];
  videoUrl: string;
}

// 폼 업데이트 핸들러
export type HandleFormChange<T> = <K extends keyof T>(
  key: K,
  value: T[K]
) => void;

// 댄서 장르 선택자
export interface DancerGenreSelectorProps {
  selectedGenres: string[];
  handleFormChange: HandleFormChange<DancerFormProps>;
}

// 수업 장르 선택자
export interface ClassGenreSelectorProps {
  selectedGenre: number;
  handleFormChange: HandleFormChange<ClassFormProps>;
}

// 해시태그 선택자
export interface TagSelectorProps {
  selectedTags: number[];
  handleFormChange: HandleFormChange<ClassFormProps>;
}

// 이미지 업로더
export interface ImagesUploaderProps<T> {
  isFor: 'dancer' | 'class';
  images: string[];
  handleFormChange: HandleFormChange<T>;
}

// 비디오 업로더
export interface VideoUplodaerProps {
  video: string;
  handleFormChange: HandleFormChange<ClassFormProps>;
}

// 별점 선택자
export interface StarRatingProps {
  value: number;
  handleFormChange: HandleFormChange<ClassFormProps>;
}
