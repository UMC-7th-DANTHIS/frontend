import { useQuery } from '@tanstack/react-query';
import { fetchClasses } from '../../api/reservation';
import { PaginationParams } from '@/types/common';

export default function useGetClassList({ genre, page, size }: PaginationParams) {
  return useQuery({
    queryKey: ['classes', genre, page, size],
    queryFn: () => fetchClasses({ genre, page }),
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
    select: (data) => data.data
  });
}
