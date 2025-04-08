import { useState } from 'react';
import axiosInstance from '../../api/axios-instance';

const usePut = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const put = async <U>(url: string, data: U) => {
    setIsLoading(true);

    try {
      const response = await axiosInstance.put(url, data);
      setData(response.data);
    } catch (error: unknown) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, put };
};

export default usePut;
