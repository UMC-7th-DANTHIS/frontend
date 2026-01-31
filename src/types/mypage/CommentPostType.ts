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

export interface Comment {
  reviewId: number;
  title: string;
  perPage: number;
}


export interface CommentsReviewProps {
  review: Review;
}

export interface CommentsProps {
  comment: Comment;
}


export interface FetchReviewsResponse {
  reviews: Review[];
  totalElements: number;
}

export interface FetchCommentsResponse {
  comments: Comment[];
  totalElements: number;
}