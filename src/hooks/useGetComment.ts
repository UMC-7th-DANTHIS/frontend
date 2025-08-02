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
        const page = currentPage || 1;
        const url = `/community/posts/${postId}/comments?page=${page}`;

        const response: CommentResponse = await axiosInstance.get(url);
        setData(response);
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
