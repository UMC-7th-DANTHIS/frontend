import { fetchMyInfo } from '../../api/user';
import { useQuery } from '@tanstack/react-query';

interface UseGetMyInfoProps {
  enabled?: boolean;
}

export default function useGetMyInfo({ enabled = true }: UseGetMyInfoProps = {}) {
  return useQuery({
    queryKey: ['me'],
    queryFn: fetchMyInfo,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    select: (data) => data.data,
    enabled
  });
}
