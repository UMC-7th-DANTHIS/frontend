import { postImagePresignedUrl } from '../../api/registration';
import { useMutation } from '@tanstack/react-query';

interface PostImagePresignedArgs {
  urlParam: string;
  file: File;
}

export default function usePostImagePresigned() {
  return useMutation({
    mutationFn: ({ urlParam, file }: PostImagePresignedArgs) => postImagePresignedUrl(urlParam, file),
    onError: (error) => {
      console.error('❌ 이미지 Presigned URL 발급 실패:', error);
    }
  });
}
