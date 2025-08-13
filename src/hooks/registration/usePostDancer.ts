import { postDancer } from '../../api/registration';
import { useMutation } from '@tanstack/react-query';

export default function usePostDancer() {
  return useMutation({
    mutationFn: postDancer,
    onError: (error) => {
      console.error('❌ 댄서 등록 실패:', error);
    }
  });
}
