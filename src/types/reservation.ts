import {
  DanceClassDetail,
  DanceClassRating,
  DanceClassReview,
  LikedClass,
  SimpleDanceClass,
  SingleReview
} from './class';
import { CommonPagination, CommonResponse, OffsetBasedResponse } from './common';

export const DATE_TYPE = {
  WEEKLY: 'WEEKLY',
  DATE: 'DATE'
} as const;

export type DateType = (typeof DATE_TYPE)[keyof typeof DATE_TYPE];

export const DAYS_OF_WEEK = [
  { key: 'MON', ko: '월' },
  { key: 'TUE', ko: '화' },
  { key: 'WED', ko: '수' },
  { key: 'THU', ko: '목' },
  { key: 'FRI', ko: '금' },
  { key: 'SAT', ko: '토' },
  { key: 'SUN', ko: '일' }
] as const;

export type Day = (typeof DAYS_OF_WEEK)[number]['key'];

export type ResponseClasses = OffsetBasedResponse<'danceClasses', SimpleDanceClass[]>;
export type ResponseClassDetail = CommonResponse<DanceClassDetail>;
export type ResponseClassRating = CommonResponse<DanceClassRating>;
export type ResponseClassReview = CommonResponse<DanceClassReview>;

export type ResponseChat = CommonResponse<{
  dancerId: number;
  dancerName: string;
  openChatUrl: string;
}>;

export type ResponseLiked = CommonResponse<null>;

export type ResponseMyLiked = OffsetBasedResponse<'danceClasses', LikedClass[]>;

// review
export type ResponseReview = CommonResponse<SingleReview>;
export type ResponseDeleteReview = CommonResponse<null>;

// 댄스 수업 목록 조회
export interface GetClassesAllDto extends CommonPagination {
  genre?: number;
  day?: string;
  date?: string;
}
