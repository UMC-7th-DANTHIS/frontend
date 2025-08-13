import { useState, useEffect } from 'react';
import axiosInstance from '../api/axios-instance';

import { AllClassData } from '@/types/MainInterface';

function useGetClass() {
  const [data, setData] = useState<AllClassData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchClass = async (): Promise<void> => {
      setIsLoading(true);
      setIsError(false);

      try {
        const response = await axiosInstance.get('/dance-classes/all');

        setData(response.data.data);
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

export default useGetClass;
