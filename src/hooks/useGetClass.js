import { useState, useEffect } from 'react';
import axiosInstance from '../api/axios-instance';

const useGetClass = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchClass = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const response = await axiosInstance.get('/dance-classes');

        setData(response.data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClass();
  }, []);

  return { data, isLoading, isError };
};

export default useGetClass;
