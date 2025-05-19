import { OffsetBasedResponse } from './common';

export type SimpleDanceClass = {
  id: number;
  className: string;
  dancerName: string;
  thumbnailImage: string;
};

export type ResponseClasses = OffsetBasedResponse<SimpleDanceClass[], 'danceClasses'>;

export type Dancer = {
  name: string;
  profileImage: string;
  openChatUrl: string;
};

export type ClassDetails = {
  videoUrl: string;
  description: string;
  targetAudience: string;
  hashtags: number[];
  danceClassImages: string[];
  dancerId: number;
};

export type DanceClass = {
  id: number;
  className: string;
  dancer: Dancer;
  genre: number;
  pricePerSession: number;
  difficulty: number;
  details: ClassDetails;
};

export type LikedDanceClass = {
  id: number;
  className: string;
  dancerName: string;
  thumbnailImage: string;
  genre: string;
  hashtagIds: number[];
};

export type ClassReview = {
  id: number;
  author: string;
  authorProfileImage: string;
  title: string;
  content: string;
  rating: number;
  createdAt: string;
  reviewImages: string[];
};

export type ClassReviewList = {
  id: number;
  className: string;
  dancer: Dancer;
  genre: number;
  pricePerSession: number;
  difficulty: number;
  classReviews: ClassReview[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalReviews: number;
  };
};

export type SingleReview = {
  reviewId: number;
  classId: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  reviewImages: string[];
};

export type User = {
  nickname: string;
  gender?: string;
  email: string;
  phoneNumber?: string;
  profileImage: string;
  preferredGenres: number[];
  preferredDancers: number[];
};
