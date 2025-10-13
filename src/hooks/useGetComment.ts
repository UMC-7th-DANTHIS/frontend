import { useState, useEffect } from 'react';

import axiosInstance from '../api/axios-instance';
import { CommentResponse } from '@/types/CommunityInterface';

function useGetComment(
  postId: number,
  comment: number,
  currentPage: number,
  forceReload: boolean
) {
  const [data, setData] = useState<CommentResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setIsLoading(true);
      setIsError(false);

      try {
        let url: string = '';

        if (!currentPage) currentPage = 1;
        url = `/community/info/posts/${postId}/comments?page=${currentPage}`;
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
}

export default useGetComment;
