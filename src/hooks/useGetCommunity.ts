import { useState, useEffect } from 'react';

import axiosInstance from '../api/axios-instance';
import { SinglePostData } from '@/types/CommunityInterface';

function useGetCommunity(postId: number) {
  const [data, setData] = useState<SinglePostData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setIsLoading(true);
      setIsError(false);

      try {
        const response = await axiosInstance.get(`/community/posts/${postId}`);
        setData(response.data.data);
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
