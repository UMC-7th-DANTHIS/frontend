import { postVideoPresignedUrl } from '../../api/registration';
import { useMutation } from '@tanstack/react-query';

interface PostVideoPresignedArgs {
  file: File;
}

export default function usePostVideoPresigned() {
  return useMutation({
    mutationFn: ({ file }: PostVideoPresignedArgs) => postVideoPresignedUrl(file),
    onError: (error) => {
      console.error('❌ 영상 Presigned URL 발급 실패:', error);
    }
  });
}
