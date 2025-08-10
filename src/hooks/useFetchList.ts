import { useState, useEffect } from 'react';

import axiosInstance from '../api/axios-instance';

import { PostListData } from '@/types/CommunityInterface';

export function useFetchList<T>(currentPage: number, forceReload: boolean) {
  const [data, setData] = useState<PostListData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setIsLoading(true);
      setIsError(false);

      try {
        let url: string = '';

        if (!currentPage) currentPage = 1;
        url = `/community/posts?page=${currentPage}`;

        const response = await axiosInstance.get(url);
        setData(response.data.data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage, forceReload]);

  return { data, isLoading, isError };
}
