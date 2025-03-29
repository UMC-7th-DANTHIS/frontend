import { useState, useEffect } from 'react';

import axiosInstance from '../api/axios-instance';

import { PostListResponse, PostListData } from '@/types/CommunityInterface';

// 호출시마다 반환하는 json이 다르므로 제네릭 타입을 사용
export function useFetchList<T>(currentPage: number, forceReload: boolean) {
  const [data, setData] = useState<PostListData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        let url: string = '';

        if (!currentPage) currentPage = 1;
        url = `/community/posts?page=${currentPage}`;

        const response: PostListResponse = await axiosInstance.get(url);
        setData(response.data);
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
