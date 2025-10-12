import { fetchMyLiked } from '../../api/reservation';
import { useQuery } from '@tanstack/react-query';

interface UseGetMyLikedProps {
  enabled: boolean;
}

export default function useGetMyLiked({ enabled }: UseGetMyLikedProps) {
  return useQuery({
    queryKey: ['my', 'like'],
    queryFn: fetchMyLiked,
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
    select: (data) => data.data,
    enabled: !!enabled
  });
}
