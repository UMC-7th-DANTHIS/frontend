import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Pagination from '../../../../components/Pagination';
import { ReactComponent as ExistPhoto } from '../../../../assets/photo.svg';
import { useQuery } from '@tanstack/react-query';
import api from '../../../../api/api';
import LoadingSpinner from '../../../../components/LoadingSpinner';

const fetchUserPosts = async (currentPage, perData) => {
  const token = localStorage.getItem('token');
  const response = await api.get('/users/posts', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page: currentPage,
      size: perData
    }
  });
  console.log(response.data.data.posts);
  return {
    posts: response.data.data.posts || [],
    totalElements: response.data.data.totalElements || 0,
  };
};

const CommentPost = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const perData = 5;
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['userposts', currentPage, perData],
    queryFn: () => fetchUserPosts(currentPage, perData),
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

  const formatDate = (dateString) => {
    return dateString.split('T')[0].replace(/-/g, '.');
  };

  const handleClick = (postId) => {
    navigate(`/community/${postId}`)
  }



  return (
    <AllContainer>
      {data.posts.map((post) => (
        <CommentContainer key={post.postId} onClick={() => handleClick(post.postId)}>
          <ContentsContainer>
            <PhotoandTitle>
              <CommentTitle>{post.title}</CommentTitle>
              <IconContainer>
                {post.images && post.images.filter((img) => img !== null).length > 0 && (
                  <ExistPhoto width={20} height={20} />
                )}
              </IconContainer>
            </PhotoandTitle>

            <CommentData>
              {formatDate(post.createdAt)}
            </CommentData>

            <CommentContents>
              {post.content.length > 210 ? post.content.slice(0, 209) + '...' : post.content}
            </CommentContents>
          </ContentsContainer>
        </CommentContainer>
      ))}

      <Pagination
        dataLength={data.totalElements}
        perData={perData}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
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
`;

const CommentContainer = styled.div`
  width: 971px;
  height: 160px;
  flex-shrink: 0;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0px 0px 5px #9819c3;
  margin-bottom: 20px;
  margin-left: 29px;
  cursor: pointer;
`;

const ContentsContainer = styled.div`
  padding: 0 39px 0 50px;
`;

const CommentTitle = styled.div`
  color: white;
  font-size: 22px;
  font-weight: 600;
  line-height: normal;
  margin-top: 29px;
`;

const PhotoandTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

const CommentData = styled.div`
  color: #B2B2B2;
  margin-top: 8px;
  margin-bottom: 13px;
`

const CommentContents = styled.div`
  color: white;
  font-size: 18px;
  font-weight: 500;
  line-height: normal;
`;

const IconContainer = styled.div`
  margin-top: 20px;
`;

const LoadingContainer = styled.div`
margin-left: 450px;
`



