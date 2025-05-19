import { ClassFormState, DancerFormState, ResponseClassForm, ResponseDancerForm } from '@/types/registration';
import axiosInstance from './axios-instance';

export const postDancer = async (body: DancerFormState): Promise<ResponseDancerForm> => {
  const { data } = await axiosInstance.post(`dancers`, body);
  return data;
};

export const postClass = async (body: ClassFormState): Promise<ResponseClassForm> => {
  const { data } = await axiosInstance.post(`/dance-classes`, body);
  return data;
};

export const getImagePresignedUrl = async (urlParam: string, file: File): Promise<string | null> => {
  try {
    const fileExtension = file.name.split('.').pop() || '';
    const { data } = await axiosInstance.post(`/images/${urlParam}?fileExtensions=${fileExtension}`);
    return data[0]?.presignedUrl;
  } catch (error) {
    console.error('❌ Presigned URL 발급 실패:', error);
    return null;
  }
};

export const getVideoPresignedUrl = async (urlParam: string, file: File): Promise<string | null> => {
  try {
    const fileExtension = file.name.split('.').pop() || '';
    const { data } = await axiosInstance.post(`/video/${urlParam}?fileExtensions=${fileExtension}`);
    return data[0]?.presignedUrl;
  } catch (error) {
    console.error('❌ Presigned URL 발급 실패:', error);
    return null;
  }
};

export const uploadToS3 = async (presignedUrl: string, file: File) => {
  try {
    const uploadResponse = await fetch(presignedUrl, {
      method: 'PUT',
      body: file
    });
    if (!uploadResponse.ok) throw new Error(`❌ 업로드 실패: ${uploadResponse.status}`);

    const uploadedImageUrl = presignedUrl.split('?')[0];
    return uploadedImageUrl;
  } catch (error) {
    console.error('❌ S3 업로드 실패:', error);
    return null;
  }
};

export const updateClass = async (classId: string, body: ClassFormState): Promise<ResponseClassForm> => {
  const { data } = await axiosInstance.put(`/dance-classes/${classId}`, body);
  return data;
};
