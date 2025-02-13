import { useState, useEffect } from 'react';
import axiosInstance from '../api/axios-instance';

const useFetchList = (postId) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        let url = '';

        if (postId) {
          url = `/community/posts/${postId}`;
        } else {
          url = '/community/posts';
        }

        const response = await axiosInstance.get(url);
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

export default useFetchList;
