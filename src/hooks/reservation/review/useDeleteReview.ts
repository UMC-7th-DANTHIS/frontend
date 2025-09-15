import { useNavigate } from 'react-router-dom';
import { deleteReview } from '../../../api/reservation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface DeleteReviewArgs {
  classId: string;
  reviewId: string;
  page: number;
}

export default function useDeleteReview() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ classId, reviewId }: DeleteReviewArgs) => deleteReview(classId, reviewId),
    onSuccess: (_data, variables) => {
      const { classId, reviewId, page } = variables;

      queryClient.invalidateQueries({ queryKey: ['review', reviewId] });

      navigate(`/classes/${classId}?tab=reviews`, {
        state: { fromReviewDetail: true, page } // 페이지네이션 정보 재전달
      });
    },
    onError: (error) => {
      console.error('❌ 리뷰를 삭제하는 중 오류 발생:', error);
    }
  });
}
