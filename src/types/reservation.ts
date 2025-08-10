import {
  DanceClassDetail,
  DanceClassRating,
  DanceClassReview,
  LikedClass,
  SimpleDanceClass,
  SingleReview
} from './class';
import { CommonResponse, OffsetBasedResponse } from './common';

export type ResponseClasses = OffsetBasedResponse<
  'danceClasses',
  SimpleDanceClass[]
>;

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
