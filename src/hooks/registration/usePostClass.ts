import { postClass } from '../../api/registration';
import { useMutation } from '@tanstack/react-query';

export default function usePostClass() {
  return useMutation({
    mutationFn: postClass,
    onError: (error) => {
      console.error('❌ 수업 등록 실패:', error);
    }
  });
}
