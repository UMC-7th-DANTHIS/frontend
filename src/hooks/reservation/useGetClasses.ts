import { GetClassesAllDto } from '../../types/reservation';
import { fetchClasses } from '../../api/reservation';
import { useQuery } from '@tanstack/react-query';

export default function useGetClasses({ genre, page, size, day }: GetClassesAllDto) {
  return useQuery({
    queryKey: ['classes', genre, page, size, day],
    queryFn: () => fetchClasses({ genre, page, size, day }),
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
    select: (data) => data.data
  });
}
