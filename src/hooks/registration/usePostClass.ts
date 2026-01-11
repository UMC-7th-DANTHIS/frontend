import { postClass } from '../../api/registration';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function usePostClass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postClass,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] });
    },
    onError: (error) => {
      console.error('❌ 수업 등록 실패:', error);
    }
  });
}
