import { useState, useCallback } from 'react';
import axiosInstance from '../api/axios-instance';

const useFetchData = <T>() => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown | null>(null);

  const fetchData = useCallback(async (url: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(url);
      setData(response.data?.data || null);
      return response;
    } catch (error) {
      console.error('❌ 데이터 불러오는 중 오류 발생:', error);
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);
  return { data, isLoading, error, fetchData };
};

export default useFetchData;
