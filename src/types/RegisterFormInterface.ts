// 댄서 등록 폼
export interface DancerFormState {
  dancerName: string;
  instargramId: string;
  openChatUrl: string;
  bio: string;
  history: string;
  preferredGenres: string[];
  dancerImages: string[];
}

export interface ResponseDancerForm extends Response {
  data: number;
}

// 수업 등록 폼
export interface ClassFormState {
  className: string;
  pricePerSession: string | number;
  difficulty: number;
  genre: number;
  description: string;
  targetAudience: string;
  hashtags: number[];
  images: string[];
  videoUrl: string;
}

export interface ResponseClassForm extends Response {
  data: number | null;
}

// 폼 업데이트 핸들러
export type HandleFormChange<T> = <K extends keyof T>(key: K, value: T[K]) => void;

// 해시태그 선택자
export interface TagSelectorProps {
  selectedTags: number[];
  handleFormChange: HandleFormChange<ClassFormState>;
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
  handleFormChange: HandleFormChange<ClassFormState>;
}

// 별점 선택자
export interface StarRatingProps {
  value: number;
  handleFormChange: HandleFormChange<ClassFormState>;
}
