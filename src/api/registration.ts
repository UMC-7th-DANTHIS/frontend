import { ClassFormState, DancerFormState, ResponseClassForm, ResponseDancerForm } from '@/types/RegisterFormInterface';
import axiosInstance from './axios-instance';

export const postDancer = async (body: DancerFormState): Promise<ResponseDancerForm> => {
  const { data } = await axiosInstance.post(`dancers`, body);
  return data;
};

export const postClass = async (body: ClassFormState): Promise<ResponseClassForm> => {
  const { data } = await axiosInstance.post(`/dance-classes`, body);
  return data;
};
