export interface Post {
  postId: number;
  title: string;
  content: string;
  createdAt: string;
  images?: string[];
}

export interface FetchUserPostsResponse {
  posts: Post[];
  totalElements: number;
}

export interface Review {
  reviewId: number;
  title: string;
  images?: string[];
  rating: number;
  createdAt: string;
  content: string;
}

export interface CommentsReviewProps {
  review: Review;
}

export interface FetchReviewsResponse {
  reviews: Review[];
  totalElements: number;
}
