import api from './api';
import { ClassFormSubmitState, DancerFormState, ResponsePostClass, ResponsePostDancer } from '../types/registration';

export const postDancer = async (body: DancerFormState): Promise<ResponsePostDancer> => {
  const { data } = await api.post(`/dancers`, body);
  return data;
};

export const postClass = async (body: ClassFormSubmitState): Promise<ResponsePostClass> => {
  const { data } = await api.post(`/dance-classes`, body);
  return data;
};

export const editClass = async (classId: string, body: ClassFormSubmitState): Promise<ResponsePostClass> => {
  const { data } = await api.put(`/dance-classes/${classId}`, body);
  return data;
};

export const postImagePresignedUrl = async (urlParam: string, file: File): Promise<string> => {
  const fileExtension = file.name.split('.').pop() || '';
  const { data } = await api.post(`/images/${urlParam}?fileExtensions=${fileExtension}`);

  const presignedUrl = data[0]?.presignedUrl;
  return presignedUrl;
};

export const postVideoPresignedUrl = async (file: File): Promise<string | null> => {
  const fileExtension = file.name.split('.').pop() || '';
  const { data } = await api.post(`/video/dance-class?fileExtensions=${fileExtension}`);

  const presignedUrl = data[0]?.presignedUrl;
  return presignedUrl;
};
