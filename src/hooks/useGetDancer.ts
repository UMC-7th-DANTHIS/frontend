import { useState, useEffect } from 'react';
import axiosInstance from '../api/axios-instance';

import { AllDancerResponse } from '@/types/MainInterface';

function useGetDancer<T>() {
  const [data, setData] = useState<AllDancerResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchClass = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const response: AllDancerResponse =
          await axiosInstance.get('/dancers/all');

        setData(response);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClass();
  }, []);

  return { data, isLoading, isError };
}

export default useGetDancer;
