import { PaginationParams } from '@/types/common';
import { ResponseClasses } from '@/types/reservation';
import axiosInstance from './axios-instance';

export const fetchClasses = async (paginationParams: PaginationParams): Promise<ResponseClasses> => {
  const { data } = await axiosInstance.get(`/dance-classes/all`, {
    params: paginationParams
  });
  return data;
};
