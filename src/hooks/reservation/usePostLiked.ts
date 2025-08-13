import { postLiked } from '../../api/reservation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function usePostLiked() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postLiked,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my', 'like'] });
    },
    onError: (error) => {
      console.error('❌ 수업 찜 등록 중 오류 발생:', error);
    }
  });
}
