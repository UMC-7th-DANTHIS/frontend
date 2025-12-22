import { CommonResponse } from './common';

export type Weekday = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';

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
  days: Weekday[];
  dates: string[];
  description: string;
  targetAudience: string;
  hashtags: number[];
  images: string[];
  videoUrl: string;
};

export type ClassFormSubmitState = Omit<ClassFormState, 'pricePerSession'> & {
  pricePerSession: number;
};

// 폼 업데이트 핸들러
export type HandleFormChange<T> = <K extends keyof T>(key: K, value: T[K]) => void;

export type ResponsePostDancer = CommonResponse<number>;
export type ResponsePostClass = CommonResponse<null>;
