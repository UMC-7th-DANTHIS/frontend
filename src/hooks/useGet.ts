import { useState, useEffect } from 'react';

import axiosInstance from '../api/axios-instance';

import { UserResponse, UserData } from '../types/UserInterface';

function useGet() {
  const [data, setData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setIsLoading(true);
      setIsError(false);

      try {
        const response: UserResponse = await axiosInstance.get(`/users/me`);
        setData(response.data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, isError };
}

export default useGet;
