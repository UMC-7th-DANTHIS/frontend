import { useState, useEffect } from 'react';
import axiosInstance from '../api/axios-instance';

const useFetchList = (postId, comment, currentPage, forceReload) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (comment === 1 && !postId) return;

    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        let url = '';

        // post 댓글 조회
        if (comment === 1 && postId) {
          if (!currentPage) currentPage = 1;
          url = `/community/posts/${postId}/comments?page=${currentPage}`;
        }

        // 단일 post 조회
        else if (postId) {
          url = `/community/posts/${postId}`;
        }

        // post 목록 조회
        else {
          if (!currentPage) currentPage = 1;
          url = `/community/posts?page=${currentPage}`;
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
  }, [postId, comment, currentPage, forceReload]);

  return { data, isLoading, isError };
};

export default useFetchList;
