import { deleteLiked } from '../../api/reservation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useDeleteLiked() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLiked,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my', 'like'] });
    },
    onError: (error) => {
      console.error('❌ 수업 찜 해제 중 오류 발생:', error);
    }
  });
}
