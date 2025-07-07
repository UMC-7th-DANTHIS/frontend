import { deleteLiked } from '../../api/reservation';
import { queryClient } from '../../App';
import { useMutation } from '@tanstack/react-query';

export default function useDeleteLiked() {
  return useMutation({
    mutationFn: deleteLiked,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['my', 'like']
      });
    },
    onError: (error) => {
      console.error('❌ 수업 찜 해제 중 오류 발생:', error);
    }
  });
}
