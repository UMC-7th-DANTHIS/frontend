import { Dancer } from './class';
import { CommonResponse } from './common';

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

export type ReviewResponse = CommonResponse<SingleReview>;
export type ReviewDeleteResponse = CommonResponse<null>;
