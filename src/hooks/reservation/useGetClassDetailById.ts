import { fetchClassDetailById } from '../../api/reservation';
import { useQuery } from '@tanstack/react-query';

export default function useGetClassDetailById(classId: string) {
  return useQuery({
    queryKey: ['class', classId],
    queryFn: () => fetchClassDetailById(classId),
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
    select: (data) => data.data,
    enabled: !!classId,
  });
}
