import { useState } from 'react';

const useUploadToS3 = () => {
  const [isS3Loading, setIsS3Loading] = useState<boolean>(false);

  const uploadToS3 = async (presignedUrl: string, file: File) => {
    setIsS3Loading(true);

    try {
      const uploadResponse = await fetch(presignedUrl, {
        method: 'PUT',
        body: file
      });

      if (!uploadResponse.ok) {
        throw new Error(`❌ 업로드 실패: ${uploadResponse.status}`);
      }

      const uploadedImageUrl = presignedUrl.split('?')[0];
      return uploadedImageUrl;
    } catch (error: unknown) {
      console.error('❌ 업로드 실패:', error);
      return null;
    } finally {
      setIsS3Loading(false);
    }
  };

  return { isS3Loading, uploadToS3 };
};

export default useUploadToS3;
