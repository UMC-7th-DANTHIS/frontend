import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Pagination from '../../../../components/Pagination';
import { ReactComponent as ExistPhoto } from '../../../../assets/photo.svg';
import { useQuery } from '@tanstack/react-query';
import api from '../../../../api/api';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import { FetchUserPostsResponse, Post } from '@/types/mypage/CommentPostType';

interface CommentPostProps {
  perPage: number;
}

const fetchUserPosts = async (
  currentPage: number,
  perData: number
): Promise<FetchUserPostsResponse> => {
  const token = localStorage.getItem('token');
  const response = await api.get('/users/posts', {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {
      page: currentPage,
      size: perData
    }
  });
  return {
    posts: response.data.data.posts || [],
    totalElements: response.data.data.totalElements || 0
  };
};

const CommentPost = ({ perPage }: CommentPostProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery<
    FetchUserPostsResponse,
    Error
  >({
    queryKey: ['userposts', currentPage, perPage],
    queryFn: () => fetchUserPosts(currentPage, perPage)
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

  const formatDate = (dateString: string): string => {
    return dateString.split('T')[0].replace(/-/g, '.');
  };

  const handleClick = (post: Post) => {
    navigate(`/community/${post.postId}`, { state: { selectedPost: post } });
  };

  return (
    <AllContainer>
      {data?.posts.length ? (
        data.posts.map((post) => (
          <CommentContainer key={post.postId} onClick={() => handleClick(post)}>
            <ContentsContainer>
              <PhotoandTitle>
                <CommentTitle>{post.title}</CommentTitle>
                <IconContainer>
                  {(post.images?.filter((img) => img !== null) || []).length >
                    0 && <ExistPhoto width={20} height={20} />}
                </IconContainer>
              </PhotoandTitle>

              <CommentData>{formatDate(post.createdAt)}</CommentData>

              <CommentContents>
                {post.content.length > 210
                  ? post.content.slice(0, 209) + '...'
                  : post.content}
              </CommentContents>
            </ContentsContainer>
          </CommentContainer>
        ))
      ) : (
        <Text>게시글이 없습니다.</Text>
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

export default CommentPost;

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

const CommentData = styled.div`
  color: #b2b2b2;
  margin-top: 8px;
  margin-bottom: 13px;

  @media (max-width: 600px) {
    font-size: 12px;
    margin-top: 4px;
    margin-bottom: 8px;
  }
`;

const CommentContents = styled.div`
  color: white;
  font-size: 18px;
  font-weight: 500;
  line-height: normal;

  @media (max-width: 600px) {
    font-size: 14px;
    line-height: 1.4;
  }
`;

const IconContainer = styled.div`
  margin-top: 20px;

  @media (max-width: 600px) {
    margin-top: 0;
    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

const LoadingContainer = styled.div`
  margin-left: 450px;

  @media (max-width: 600px) {
    margin: 0 auto;
  }
`;

const Text = styled.div`
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  align-items: center;

  @media (max-width: 600px) {
    font-size: 15px;
    text-align: center;
    width: 100%;
  }
`;
