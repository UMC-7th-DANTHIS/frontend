import { useState } from 'react';
import axiosInstance from '../../api/axios-instance';

export interface PresignedUrlResponse {
  presignedUrl: string;
  fileUrl: string;
}

const useVideoPresignedUrl = (urlParam: string) => {
  const [isPresignedLoading, setIsPresignedLoading] = useState<boolean>(false);

  const getPresignedUrl = async (file: File) => {
    setIsPresignedLoading(true);

    try {
      const fileExtension = file.name.split('.').pop() || '';
      const response = await axiosInstance.post<PresignedUrlResponse[]>(
        `/video/${urlParam}?fileExtensions=${fileExtension}`
      );

      return response.data[0]?.presignedUrl || null;
    } catch (error: unknown) {
      console.error('❌ Presigned URL 발급 실패:', error);
      return null;
    } finally {
      setIsPresignedLoading(false);
    }
  };

  return { isPresignedLoading, getPresignedUrl };
};

export default useVideoPresignedUrl;
