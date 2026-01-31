import React, { useState } from 'react';
import styled from 'styled-components';
import sampleImage from '../../../../assets/errorImage.svg';
import Pagination from '../../../../components/Pagination';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';
import api from '../../../../api/api';
import { useNavigate } from 'react-router-dom';
import { DanceClassProps } from '@/types/mypage/LikeClassType';
import useIsMobile from '../../../../hooks/useIsMobile';

interface ImageProps {
  isMobile: boolean;
}

const MyLikeClass = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const perData = 9;
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const { data, isLoading, isError, error } = useQuery<DanceClassProps[]>({
    queryKey: ['userclass'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      const response = await api.get('/users/wishlists', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data.data.danceClasses || [];
    }
  });

  const filteredList = data
    ? data.slice(perData * (currentPage - 1), perData * currentPage)
    : [];

  if (isLoading) {
    return <LoadingSpinner isLoading={isLoading} />;
  }

  if (isError) {
    return <div>Error: {(error as Error)?.message}</div>;
  }

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = sampleImage;
  };

  const handleClick = (classId: number) => {
    navigate(`/classes/${classId}?tab=detail`);
  };

  return (
    <>
      {data?.length ? (
        <>
          <ClassContainer>
            {filteredList.map((danceClass) => (
              <ClassList key={danceClass.id}>
                <Image
                  src={danceClass.thumbnailImage}
                  alt={String(danceClass.id)}
                  isMobile={isMobile}
                  onError={handleImageError}
                  onClick={() => handleClick(danceClass.id)}
                />
                <Title>{danceClass.className}</Title>
                <Singer>{danceClass.dancerName}</Singer>
              </ClassList>
            ))}
          </ClassContainer>
          <PaginationContainer>
            <Pagination
              dataLength={data.length}
              perData={perData}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </PaginationContainer>
        </>
      ) : (
        <Text>내가 찜한 수업이 없습니다.</Text>
      )}
    </>
  );
};

export default MyLikeClass;

const ClassContainer = styled.div`
  display: grid;
  margin-top: 40px;
  justify-content: center;
  align-items: center;
  justify-items: center;
  grid-template-columns: repeat(3, 220px);
  column-gap: 103px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 200px);
    column-gap: 40px;
    row-gap: 40px;
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 140px);
    column-gap: 28px;
    row-gap: 28px;
    margin-top: 40px;
    margin-left: 0;
    margin-right: 0;
    justify-content: center;
    justify-items: center;
  }
`;

const Image = styled.img<ImageProps>`
  object-fit: cover;
  border-radius: 10px;
  cursor: pointer;

  ${({ isMobile }) =>
    isMobile
      ? `
        width: 140px;
        height: 140px;
      `
      : `
        width: 180px;
        height: 180px;
      `}
`;

const ClassList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;

  @media (max-width: 600px) {
    gap: 3px;
  }
`;

const Title = styled.div`
  color: #fff;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -1.2px;
  margin-top: 10px;
  text-align: center;
  width: 100%;
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 600px) {
    font-size: 18px;
    max-width: 140px;
    margin-top: 10px;
  }
`;

const Singer = styled.div`
  color: #b2b2b2;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.9px;
  margin-bottom: 53px;

  @media (max-width: 600px) {
    font-size: 14px;
    margin-bottom: 20px;
  }
`;

const PaginationContainer = styled.div`
  margin-bottom: 205px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const Text = styled.div`
  color: #fff;
  text-align: center;
  font-size: 32px;
  font-weight: 500;
  margin-top: 219px;
`;
