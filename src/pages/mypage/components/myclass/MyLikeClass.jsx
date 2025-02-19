import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import sampleImage from '../../../../assets/errorImage.svg'
import Pagination from '../../../../components/Pagination';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';
import api from '../../../../api/api';
import { useNavigate } from 'react-router-dom';

const MyLikeClass = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const perData = 9;
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['userclass'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      const response = await api.get('/users/wishlists', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response.data.data.danceClasses);
      return response.data.data.danceClasses || [];
    },
  });

  const filteredList = data ? data.slice(perData * (currentPage - 1), perData * currentPage) : [];

  if (isLoading) {
    return <LoadingSpinner isLoading={isLoading} />;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  const handleImageError = (e) => {
    e.target.src = sampleImage;
  };

  const handleClick = (classId) => {
    navigate(`/classreservation/${classId}?tab=detail`)
  }

  return (
    <>
      <ClassContainer>
        {filteredList.map((danceClass) => (
          <ClassList key={danceClass.id}>
            <Image src={danceClass.thumbnailImage[0] || danceClass.thumbnailImage[1]} alt={danceClass.id} onError={handleImageError} onClick={() => handleClick(danceClass.id)} />
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
  );
};


export default MyLikeClass;

const ClassContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 220px); 
    column-gap : 110px;
    margin-top: 40px;
    justify-content: center; 
    align-items: center;
`;

const ClassList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* width: 280px;
    height: 280px; */
    border-radius: 10px;
`;

const Title = styled.div`
  color: #FFF;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -1.2px;
  margin-top: 9px;
`
const Singer = styled.div`
  color:  #B2B2B2;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.9px;
  margin-bottom: 53px;
`

const Image = styled.img`
  width: 220px;
  height: 220px;
  object-fit: cover;
  border-radius: 10px;
  background-color: white;
  cursor: pointer;
`;

const PaginationContainer = styled.div`
  margin-bottom: 205px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`

