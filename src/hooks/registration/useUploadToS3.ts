import { useState } from 'react';

const useUploadToS3 = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const uploadToS3 = async (presignedUrl: string, file: File) => {
    setIsLoading(true);
    try {
      await fetch(presignedUrl, { method: 'PUT', body: file });
      const uploadedImageUrl = presignedUrl.split('?')[0];

      return uploadedImageUrl;
    } catch (error: unknown) {
      console.error('❌ S3 업로드 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, uploadToS3 };
};

export default useUploadToS3;
