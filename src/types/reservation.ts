import {
  DanceClassDetail,
  DanceClassRating,
  DanceClassReview,
  LikedClass,
  SimpleDanceClass,
  SingleReview
} from './class';
import { CommonResponse, OffsetBasedResponse } from './common';

export type ClassesResponse = OffsetBasedResponse<'danceClasses', SimpleDanceClass[]>;

export type ClassDetailResponse = CommonResponse<DanceClassDetail>;
export type ClassRatingResposne = CommonResponse<DanceClassRating>;
export type ClassReviewResposne = CommonResponse<DanceClassReview>;

export type ChatResponse = CommonResponse<{
  dancerId: number;
  dancerName: string;
  openChatUrl: string;
}>;

export type LikedResponse = CommonResponse<null>;

export type MyLikedResponse = OffsetBasedResponse<'danceClasses', LikedClass[]>;

// review
export type ReviewResponse = CommonResponse<SingleReview>;
export type ReviewDeleteResponse = CommonResponse<null>;
