import { DanceClass, LikedClass, SimpleDanceClass } from './class';
import { CommonResponse, OffsetBasedResponse } from './common';

export type ClassesResponse = OffsetBasedResponse<
  'danceClasses',
  SimpleDanceClass[]
>;

export type ClassDetailResponse = CommonResponse<
  DanceClass & {
    classReviews: null;
    pagination: null;
    averageRating: null;
    totalReviews: null;
  }
>;

export type ChatResponse = CommonResponse<{
  dancerId: number;
  dancerName: string;
  openChatUrl: string;
}>;

export type LikedResponse = CommonResponse<null>;

export type MyLikedResponse = OffsetBasedResponse<'danceClasses', LikedClass[]>;
