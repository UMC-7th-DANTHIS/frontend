import React, { useState } from 'react';
import styled from 'styled-components';
import sampleImage from '../../../../assets/image.png';
import Pagination from '../../../../components/Pagination';
import { useNavigate } from 'react-router-dom';
import api from '../../../../api/api';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';

const fetchTakeClass = async (currentPage, perData) => {
  const token = localStorage.getItem('token');
  const response = await api.get('/users/dance-classes', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page: currentPage,
      size: perData
    }
  });
  // console.log(response.data);
  console.log('1111', response.data.data.danceClasses);
  return {
    classlist: response.data.data.danceClasses || [],
    totalElements: response.data.data.totalElements || 0,
  };
};

const MyReview = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const perData = 9;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['usertakeclass', currentPage, perData],
    queryFn: () => fetchTakeClass(currentPage, perData),
  });

  if (isLoading) {
    return (
      <LoadingSpinner isLoading={isLoading} />
    );
  }


  if (isError) {
    return <div>Error: {error?.message}</div>;
  }


  const handleImageClick = (data) => {
    navigate(`/review/${data.id}`, { state: { className: data.className } });
  };
  const classList = Array.isArray(data?.classlist) ? data.classlist : [];

  return (
    <>
      <ClassContainer>
        {classList.map((danceClass) => (
          <ClassList key={danceClass.id}>
            <Image
              src={danceClass.thumbnailImage || sampleImage}
              alt={danceClass.id}
              onClick={() => handleImageClick(danceClass)}
            />
            <Title>{danceClass.className}</Title>
            <Singer>{danceClass.dancerName}</Singer>
          </ClassList>
        ))}
      </ClassContainer>
      <PaginationContainer>
        <Pagination
          dataLength={data.totalElements}
          perData={perData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </PaginationContainer>
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
