export interface Dancer {
  name: string;
  profileImage: string;
  openChatUrl: string;
}

export interface ClassDetails {
  videoUrl: string;
  description: string;
  targetAudience: string;
  hashtags: number[];
  danceClassImages: string[];
  dancerId: number;
}

export interface DanceClass {
  id: number;
  className: string;
  dancer: Dancer;
  genre: number;
  pricePerSession: number;
  difficulty: number;
  details: ClassDetails;
}

export interface LikedDanceClass {
  id: number;
  className: string;
  dancerName: string;
  thumbnailImage: string;
  genre: string;
  hashtagIds: number[];
}

export interface ClassReview {
  id: number;
  author: string;
  authorProfileImage: string;
  title: string;
  content: string;
  rating: number;
  createdAt: string;
  reviewImages: string[];
}

export interface ClassReviewList {
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
}

export interface SingleReview {
  reviewId: number;
  classId: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  reviewImages: string[];
}

export interface User {
  nickname: string;
  gender?: string;
  email: string;
  phoneNumber?: string;
  profileImage: string;
  preferredGenres: number[];
  preferredDancers: number[];
}
