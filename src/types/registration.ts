import { CommonResponse } from './common';

// 댄서 등록 폼
export type DancerFormState = {
  dancerName: string;
  instargramId: string;
  openChatUrl: string;
  bio: string;
  history: string;
  preferredGenres: string[];
  dancerImages: string[];
};

export type ResponseDancerForm = CommonResponse<number>;

// 수업 등록 폼
export type ClassFormState = {
  className: string;
  pricePerSession: string | number;
  difficulty: number;
  genre: number;
  description: string;
  targetAudience: string;
  hashtags: number[];
  images: string[];
  videoUrl: string;
};

export type ResponseClassForm = CommonResponse<number | null>;

// 폼 업데이트 핸들러
export type HandleFormChange<T> = <K extends keyof T>(key: K, value: T[K]) => void;
