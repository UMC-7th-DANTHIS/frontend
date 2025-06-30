import React, { useState } from 'react';
import styled from 'styled-components';
import Pagination from '../../../../common/Pagination';
import { useNavigate } from 'react-router-dom';
import api from '../../../../api/api';
import LoadingSpinner from '../../../../common/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';

interface DanceClassProps {
  id: number;
  className: string;
  dancerName: string;
  thumbnailImage: string;
}

interface FetchTakeClassResponse {
  classlist: DanceClassProps[];
  totalElements: number;
}

const fetchTakeClass = async (
  currentPage: number,
  perData: number
): Promise<FetchTakeClassResponse> => {
  const token = localStorage.getItem('token');
  const response = await api.get('/users/dance-classes', {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {
      page: currentPage,
      size: perData
    }
  });

  return {
    classlist: response.data.data.danceClasses || [],
    totalElements: response.data.data.totalElements || 0
  };
};

const MyReview = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const perData = 9;

  const { data, isLoading, isError, error } = useQuery<FetchTakeClassResponse>({
    queryKey: ['usertakeclass', currentPage, perData],
    queryFn: () => fetchTakeClass(currentPage, perData)
  });

  if (isLoading) {
    return <LoadingSpinner isLoading={isLoading} />;
  }

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }

  const handleImageClick = (danceClass: DanceClassProps) => {
    navigate(`/review/${danceClass.id}`, {
      state: { className: danceClass.className }
    });
  };

  const classList = Array.isArray(data?.classlist) ? data?.classlist : [];

  return (
    <>
      {classList?.length === 0 ? (
        <NoClassMessage>수강한 수업이 없습니다.</NoClassMessage>
      ) : (
        <>
          <ClassContainer>
            {classList?.map((danceClass) => (
              <ClassList key={danceClass.id}>
                <Image
                  src={danceClass.thumbnailImage}
                  alt={String(danceClass.id)}
                  onClick={() => handleImageClick(danceClass)}
                />
                <Title>{danceClass.className}</Title>
                <Singer>{danceClass.dancerName}</Singer>
              </ClassList>
            ))}
          </ClassContainer>
          <PaginationContainer>
            <Pagination
              dataLength={data?.totalElements ?? 0}
              perData={perData}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </PaginationContainer>
        </>
      )}
    </>
  );
};

export default MyReview;

const ClassContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 220px);
  column-gap: 110px;
  margin-top: 40px;
  justify-content: center;
`;

const ClassList = styled.div`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  color: #fff;
  font-size: 24px;
  font-weight: 600;
  margin-top: 9px;
  letter-spacing: -1.2px;
`;

const Singer = styled.div`
  color: #b2b2b2;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 53px;
`;

const Image = styled.img`
  width: 220px;
  height: 220px;
  object-fit: cover;
  border-radius: 10px;
  cursor: pointer;
  background-color: white;
`;

const PaginationContainer = styled.div`
  margin-bottom: 205px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const NoClassMessage = styled.div`
  color: #fff;
  text-align: center;
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 100px;
  margin-top: 219px;
`;
