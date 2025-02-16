import React, { useState } from 'react';
import styled from 'styled-components';
import sampleImage from '../../../../assets/errorImage.svg';
import Pagination from '../../../../components/Pagination';
import { useQuery } from '@tanstack/react-query';
import api from '../../../../api/api';
import LoadingSpinner from '../../../../components/LoadingSpinner';

const MyLikeDancer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const perData = 9;

  const { data, isLoading, isError, error } = useQuery(
    {
      queryKey: ['userdancers'],
      queryFn: async () => {
        const token = localStorage.getItem('token');
        const response = await api.get('/users/dancers', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        return response.data.data.dancers || [];
      },
    }
  );

  const filteredList = data ? data.slice(perData * (currentPage - 1), perData * currentPage) : [];

  const handleImageError = (e) => {
    e.target.src = sampleImage;
  };

  if (isLoading) {
    return <LoadingSpinner isLoading={isLoading} />;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <>
      <DancerContainer>
        {filteredList.map((dancer) => (
          <DancerList key={dancer.id}>
            <Image
              src={dancer.images[0] || dancer.images[1]}
              alt={dancer.dancerName}
              onError={handleImageError} // 이미지 로딩 실패시 임시 샘플 사진 출력 -> 추후 삭제 예정
            />
            <Dancer>{dancer.dancerName}</Dancer>
          </DancerList>
        ))}
      </DancerContainer>
      <PaginationContainer>
        <Pagination
          dataLength={data ? data.length : 0}
          perData={perData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </PaginationContainer>
    </>
  );
};

export default MyLikeDancer;

const DancerContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 220px); 
  column-gap: 110px;
  row-gap: 78px;
  margin-top: 40px;
  justify-content: center; 
`;

const DancerList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  flex-direction: column;
`;

const Image = styled.img`
  width: 220px;
  height: 220px;
  object-fit: cover;
  border-radius: 10px;
`;

const Dancer = styled.div`
  color: #FFF;
  font-size: 24px;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -1.2px;
  margin-top: 5px;
`;

const PaginationContainer = styled.div`
  margin-bottom: 246px;
  margin-top: 96px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

