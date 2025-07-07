export type DancerFormState = {
  dancerName: string;
  instargramId: string;
  openChatUrl: string;
  bio: string;
  history: string;
  preferredGenres: string[];
  dancerImages: string[];
};

export type ClassFormState = {
  className: string;
  pricePerSession: string;
  difficulty: number;
  genre: number;
  description: string;
  targetAudience: string;
  hashtags: number[];
  images: string[];
  videoUrl: string;
};

// 폼 업데이트 핸들러
export type HandleFormChange<T> = <K extends keyof T>(key: K, value: T[K]) => void;
