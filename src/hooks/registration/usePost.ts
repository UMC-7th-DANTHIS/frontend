import { useState } from 'react';
import axiosInstance from '../../api/axios-instance';

const usePost = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const post = async <U>(url: string, data: U) => {
    setIsLoading(true);

    try {
      const response = await axiosInstance.post(url, data);
      setData(response.data);
    } catch (error: unknown) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, post };
};

export default usePost;
