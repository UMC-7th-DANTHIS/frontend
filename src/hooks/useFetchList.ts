import { useState, useEffect } from 'react';

import axiosInstance from '../api/axios-instance';

import { PostListResponse } from '@/types/CommunityInterface';
import { SinglePostResponse } from '@/types/Community/PostInterface';
import { CommentResponse } from '@/types/Community/CommentInterface';

// 호출시마다 반환하는 json이 다르므로 제네릭 타입을 사용
export function useFetchList<T>(
  postId: string | null,
  comment: number | null,
  currentPage: number,
  forceReload: boolean
) {
  const [data, setData] = useState<
    PostListResponse | SinglePostResponse | CommentResponse | null
  >(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    if (comment === 1 && !postId) return;

    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        let url: string = '';

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
}
