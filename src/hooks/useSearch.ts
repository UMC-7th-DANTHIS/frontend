import { useState, useEffect } from 'react';

import axiosInstance from '../api/axios-instance';

import { SearchClassResponse } from '@/types/SearchInterface';
import { SearchDancerResponse } from '@/types/SearchInterface';
import { SearchCommunityResponse } from '@/types/SearchInterface';

type ResponseMap = {
  'dance-classes': SearchClassResponse;
  'dancers': SearchDancerResponse;
  'posts': SearchCommunityResponse;
};

function useSearch<T extends keyof ResponseMap>(
  select: T,
  temp: string | null,
  currentPage: number
): { data: ResponseMap[T] | null; isLoading: boolean; isError: boolean } {
  const [data, setData] = useState<ResponseMap[T] | null>(() => null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    if (!select || !temp) return;

    const fetchData = async (): Promise<void> => {
      setIsLoading(true);
      setIsError(false);

      try {
        const response = await axiosInstance.get(
          `/search/${select}?query=${temp}&page=${currentPage}`
        );

        setData(response.data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [select, temp, currentPage]);

  return { data, isLoading, isError };
}

export default useSearch;
