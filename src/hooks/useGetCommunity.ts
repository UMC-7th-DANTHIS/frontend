import { useState, useEffect } from 'react';

import axiosInstance from '../api/axios-instance';

const useGetCommunity = (postId) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const response = await axiosInstance.get(`/community/posts/${postId}`);
        setData(response.data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [postId]);

  return { data, isLoading, isError };
};

export default useGetCommunity;
