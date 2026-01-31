import { useState } from 'react';
import styled from 'styled-components';
import Pagination from '../../../../components/Pagination';
import { useQuery } from '@tanstack/react-query';
import api from '../../../../api/api';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import { FetchCommentsResponse } from '@/types/mypage/CommentPostType';

interface CommentProps {
  perPage: number;
}

const fetchUserComments = async (
  currentPage: number,
  perData: number
): Promise<FetchCommentsResponse> => {
  const token = localStorage.getItem('token');
  const response = await api.get('/users/reviews', {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {
      page: currentPage,
      size: perData
    }
  });
  return {
    comments: response.data.data.comment || [],
    totalElements: response.data.data.totalElements || 0
  };
};

const Comments = ({ perPage }: CommentProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, isLoading, isError, error } = useQuery<
  FetchCommentsResponse,
    Error
  >({
    queryKey: ['userposts', currentPage, perPage],
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



  return (
    <AllContainer>
      {data?.comments?.length ? (
        data.comments.map((comment) => (
          <CommentContainer key={comment.reviewId}>
            <ContentsContainer>
              <PhotoandTitle>
                <CommentTitle>{comment.title}</CommentTitle>
              </PhotoandTitle>

      
        
            </ContentsContainer>
          </CommentContainer>
        ))
      ) : (
        <EmptyText>댓글이 없습니다.</EmptyText>
      )}

      {data?.totalElements ? (
        <Pagination
          dataLength={data.totalElements}
          perData={perPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      ) : null}
    </AllContainer>
  );
};

export default Comments;

const AllContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 154px;

  @media (max-width: 600px) {
    margin-bottom: 100px;
    width: 100%;
  }
`;

const CommentContainer = styled.div`
  width: 971px;
  height: 160px;
  flex-shrink: 0;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin-bottom: 20px;
  margin-left: 29px;
  cursor: pointer;

  @media (max-width: 600px) {
    width: 100%;
    height: auto;
    margin-left: 0;
    margin-bottom: 16px;
    padding: 12px;
  }
`;

const ContentsContainer = styled.div`
  padding: 0 39px 0 50px;

  @media (max-width: 600px) {
    padding: 0;
  }
`;

const CommentTitle = styled.div`
  color: white;
  font-size: 22px;
  font-weight: 600;
  line-height: normal;
  margin-top: 29px;

  @media (max-width: 600px) {
    font-size: 16px;
    margin-top: 4px;
  }
`;

const PhotoandTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
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

const LoadingContainer = styled.div`
  margin-left: 450px;

  @media (max-width: 600px) {
    margin: 0 auto;
  }
`;

