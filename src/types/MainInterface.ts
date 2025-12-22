import { Response } from './index';

export interface AllDancerResponse extends Response {
  data: AllDancerData;
}

export interface AllClassResponse extends Response {
  data: AllClassData;
}

// 모든 댄서 조회
export interface AllDancerData {
  dancers: AllDancerList[];
}

export interface AllDancerList {
  id: number;
  dancerName: string;
  genres: string[];
  images: string[];
}

// 모든 수업 조회
export interface AllClassData {
  page: number;
  totalPages: number;
  totalElements: number;
  danceClasses: AllClassList[];
}

export interface AllClassList {
  id: number;
  className: string;
  dancerName: string;
  dates: string[];
  days: string[];
  thumbnailImage: string;
  genre: string;
  hashtagIds: number[];
}
