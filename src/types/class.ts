import { Weekday } from './registration';

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

export type CommonDanceClass = {
  id: number;
  className: string;
  dancer: Dancer;
  genre: number;
  days: Weekday[];
  dates: string[];
  pricePerSession: number;
  difficulty: number;
};

export type DanceClassDetail = CommonDanceClass & {
  details: ClassDetails;
  classReviews: null;
  pagination: null;
  averageRating: null;
  totalReviews: null;
};

export type DanceClassRating = CommonDanceClass & {
  details: null;
  classReviews: null;
  pagination: null;
  averageRating: number;
  totalReviews: number;
};

export type DanceClassReview = CommonDanceClass & {
  details: null;
  classReviews: ClassReview[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalReviews: number;
  };
  averageRating: null;
  totalReviews: null;
};

export type SimpleDanceClass = {
  id: number;
  className: string;
  dancerName: string;
  thumbnailImage: string;
};

export type LikedClass = SimpleDanceClass & {
  genre: string;
  hashtagIds: number[];
};

// review

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
