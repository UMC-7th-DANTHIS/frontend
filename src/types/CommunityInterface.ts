import { Response } from '../types/index';

export interface PostListResponse extends Response {
  data: PostListData;
}

export interface SinglePostResponse extends Response {
  data: SinglePostData;
}

export interface CommentResponse extends Response {
  data: CommentData;
}

// 게시물 전체 조회
export interface PostPreview {
  postId: number;
  title: string;
  createdAt: string;
  commentCount: number;
}

export interface PostListData {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  posts: PostPreview[];
}

// 게시물 단일 조회
export interface SinglePostData {
  postId: number;
  title: string;
  author: string;
  createdAt: string;
  content: string;
  commentCount: number;
  images: string[];
}

// 게시물 댓글 조회
export interface CommentData {
  postId: number;
  currentPage: number;
  totalPages: number;
  totalComments: number;
  comments: Comment[];
}

export interface Comment {
  commentId: number;
  userProfileImage: string;
  createdAt: string;
  content: string;
}
