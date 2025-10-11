import api from './api';
import { PaginationParams } from '../types/common';
import {
  GetClassesAllDto,
  ResponseChat,
  ResponseClassDetail,
  ResponseClasses,
  ResponseClassRating,
  ResponseClassReview,
  ResponseDeleteReview,
  ResponseLiked,
  ResponseMyLiked,
  ResponseReview
} from '../types/reservation';

export const fetchClasses = async (params: GetClassesAllDto): Promise<ResponseClasses> => {
  const { data } = await api.get(`/dance-classes/all`, {
    params
  });
  return data;
};

export const fetchClassDetailById = async (classId: string): Promise<ResponseClassDetail> => {
  const { data } = await api.get(`/dance-classes/${classId}`);
  return data;
};

export const fetchRating = async (classId: string): Promise<ResponseClassRating> => {
  const { data } = await api.get(`/dance-classes/${classId}/rating`);
  return data;
};

export const fetchReviews = async (
  classId: string,
  paginationParams: PaginationParams
): Promise<ResponseClassReview> => {
  const { data } = await api.get(`/dance-classes/${classId}/reviews`, {
    params: paginationParams
  });
  return data;
};

export const postChat = async (dancerId: number): Promise<ResponseChat> => {
  const { data } = await api.post(`/chats/${dancerId}/start`);
  return data;
};

export const fetchMyLiked = async (): Promise<ResponseMyLiked> => {
  const { data } = await api.get(`/users/wishlists`);
  return data;
};

export const postLiked = async (classId: string): Promise<ResponseLiked> => {
  const { data } = await api.post(`/dance-classes/${classId}/favorite`);
  return data;
};

export const deleteLiked = async (classId: string): Promise<ResponseLiked> => {
  const { data } = await api.delete(`/dance-classes/${classId}/favorite`);
  return data;
};

export const fetchReview = async (classId: string, reviewId: string): Promise<ResponseReview> => {
  const { data } = await api.get(`/dance-classes/${classId}/reviews/${reviewId}`);
  return data;
};

export const deleteReview = async (classId: string, reviewId: string): Promise<ResponseDeleteReview> => {
  const { data } = await api.delete(`/dance-classes/${classId}/reviews/${reviewId}`);
  return data;
};
