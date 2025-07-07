import { postLiked } from '../../api/reservation';
import { queryClient } from '../../App';
import { useMutation } from '@tanstack/react-query';

export default function usePostLiked() {
  return useMutation({
    mutationFn: postLiked,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['my', 'like']
      });
    },
    onError: (error) => {
      console.error('❌ 수업 찜 등록 중 오류 발생:', error);
    }
  });
}
