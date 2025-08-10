import { PaginationParams } from '../../../types/common';
import { fetchReviews } from '../../../api/reservation';
import { useQuery } from '@tanstack/react-query';

export default function useGetReviews(classId: string, { page, size }: PaginationParams) {
  return useQuery({
    queryKey: ['reviews', page, size],
    queryFn: () => fetchReviews(classId, { page, size }),
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
    select: (data) => data.data,
    enabled: !!classId
  });
}
