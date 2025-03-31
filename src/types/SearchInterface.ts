import { Response } from '../types/index';

export interface SearchClassResponse extends Response {
  data: SearchClassData;
}

export interface SearchDancerResponse extends Response {
  data: SearchDancerData;
}

export interface SearchCommunityResponse extends Response {
  data: SearchCommunityData;
}

export interface SearchPagination {
  currentPage: number;
  totalPages: number;
  totalResults: number;
}

// 수업 검색 Interface
export interface SearchClassData {
  searchType: string;
  results: SearchClassList;
}

export interface SearchClassList {
  classId: number;
  className: string;
  dancer: string;
  genre: number;
  pricePerSession: number;
  difficulty: number;
  classImage: string[];
}

// 댄서 검색 Interface
export interface SearchDancerData {
  query: string;
  results: SearchDataList;
  pagination: SearchPagination;
}

export interface SearchDataList {
  id: number;
  name: string;
  profileImage: string[];
  instagramId: string;
  mainGenres: number[];
}

// 커뮤니티 검색 Interface
export interface SearchCommunityData {
  query: string;
  results: SearchCommunityList;
}

export interface SearchCommunityList {
  id: number;
  title: string;
  content: string;
  postImages: string[];
}
