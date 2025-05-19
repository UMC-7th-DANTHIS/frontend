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
