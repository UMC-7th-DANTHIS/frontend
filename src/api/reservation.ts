import api from './api';
import { PaginationParams } from '../types/common';
import {
  ChatResponse,
  ClassDetailResponse,
  ClassesResponse,
  LikedResponse,
  MyLikedResponse
} from '../types/reservation';
import { ReviewDeleteResponse, ReviewResponse } from '../types/review';

export const fetchClasses = async (paginationParams: PaginationParams): Promise<ClassesResponse> => {
  const { data } = await api.get(`/dance-classes/all`, {
    params: paginationParams
  });
  return data;
};

export const fetchClassDetailById = async (classId: string): Promise<ClassDetailResponse> => {
  const { data } = await api.get(`/dance-classes/${classId}`);
  return data;
};

export const postChat = async (dancerId: number): Promise<ChatResponse> => {
  const { data } = await api.post(`/chats/${dancerId}/start`);
  return data;
};

export const fetchMyLiked = async (): Promise<MyLikedResponse> => {
  const { data } = await api.get(`/users/wishlists`);
  return data;
};

export const postLiked = async (classId: string): Promise<LikedResponse> => {
  const { data } = await api.post(`/dance-classes/${classId}/favorite`);
  return data;
};

export const deleteLiked = async (classId: string): Promise<LikedResponse> => {
  const { data } = await api.delete(`/dance-classes/${classId}/favorite`);
  return data;
};

export const fetchReview = async (classId: string, reviewId: string): Promise<ReviewResponse> => {
  const { data } = await api.get(`/dance-classes/${classId}/reviews/${reviewId}`);
  return data;
};

export const deleteReview = async (classId: string, reviewId: string): Promise<ReviewDeleteResponse> => {
  const { data } = await api.delete(`/dance-classes/${classId}/reviews/${reviewId}`);
  return data;
};
