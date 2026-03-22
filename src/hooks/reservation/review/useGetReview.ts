import { fetchReview } from '../../../api/reservation';
import { useQuery } from '@tanstack/react-query';

export default function useGetReview(
  classId: string | undefined,
  reviewId: string | undefined
) {
  return useQuery({
    queryKey: ['review', classId, reviewId],
    queryFn: () => fetchReview(classId!, reviewId!),
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
    select: (data) => data.data,
    enabled: Boolean(classId && reviewId)
  });
}
