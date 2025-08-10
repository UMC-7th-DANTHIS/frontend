import { fetchMyInfo } from '../../api/user';
import { useQuery } from '@tanstack/react-query';

export default function useGetMyInfo() {
  return useQuery({
    queryKey: ['me'],
    queryFn: fetchMyInfo,
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
    select: (data) => data.data
  });
}
