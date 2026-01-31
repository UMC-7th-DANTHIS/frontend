import { useState } from 'react';
import styled from 'styled-components';
import Pagination from '../../../../components/Pagination';
import { useQuery } from '@tanstack/react-query';
import api from '../../../../api/api';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import { FetchCommentsResponse } from '@/types/mypage/CommentPostType';
import CommentsPage from './CommentsPage';

interface CommentsPageProps {
  perPage: number;
}
const fetchUserComments = async (
  currentPage: number,
  perData: number
): Promise<FetchCommentsResponse> => {
  const token = localStorage.getItem('token');
  const response = await api.get('/users/comments', {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {
      page: currentPage,
      size: perData
    }
  });
  return {
    comments: response.data.data.comments || [],
    totalElements: response.data.data.totalElements || 0
  };
};

const Comments = ({ perPage }: CommentsPageProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, isLoading, isError, error } = useQuery<
  FetchCommentsResponse,
    Error
  >({
    queryKey: ['usercomments', currentPage, perPage],
    queryFn: () => fetchUserComments(currentPage, perPage)
  });

  if (isLoading) {
    return (
      <LoadingContainer>
        <LoadingSpinner isLoading={isLoading} />
      </LoadingContainer>
    );
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  const hasNoData = !data || data.comments.length === 0;

  return (
    <Container>
      {hasNoData ? (
        <EmptyText>댓글이 없습니다.</EmptyText>
      ) : (
        <>
          {data.comments.map((comment) => (
            <CommentsPage key={comment.commentId} comment={comment} />
          ))}
          <Pagination
            dataLength={data.totalElements || 0}
            perData={perPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </Container>
  );
};

export default Comments;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 182px;
  margin-right: 20px;

  @media (max-width: 600px) {
    justify-content: center;
    margin-bottom: 120px;
    margin-right: 0;
    width: 100%;
  }
`;

const LoadingContainer = styled.div`
  margin-left: 450px;

  @media (max-width: 600px) {
    margin: 0 auto;
  }
`;

const EmptyText = styled.div`
  color: #b2b2b2;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  margin-top: 60px;
  margin-bottom: 100px;

  @media (max-width: 600px) {
    font-size: 15px;
    margin-top: 60px;
  }
`;
