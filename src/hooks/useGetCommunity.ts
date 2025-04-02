import { useState, useEffect } from 'react';

import axiosInstance from '../api/axios-instance';
import { SinglePostResponse } from '@/types/CommunityInterface';

function useGetCommunity<T>(postId: number) {
  const [data, setData] = useState<SinglePostResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setIsLoading(true);
      setIsError(false);

      try {
        const response: SinglePostResponse = await axiosInstance.get(
          `/community/posts/${postId}`
        );
        setData(response);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [postId]);

  return { data, isLoading, isError };
}

export default useGetCommunity;
