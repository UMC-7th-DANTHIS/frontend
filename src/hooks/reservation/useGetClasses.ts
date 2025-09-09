import { fetchClasses } from '../../api/reservation';
import { PaginationParams } from '../../types/common';
import { useQuery } from '@tanstack/react-query';

export default function useGetClasses({ genre, page, size }: PaginationParams) {
  return useQuery({
    queryKey: ['classes', genre, page, size],
    queryFn: () => fetchClasses({ genre, page, size }),
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
    select: (data) => data.data
  });
}
