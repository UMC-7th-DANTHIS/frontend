import React, { useState } from 'react';
import styled from 'styled-components';
import sampleImage from '../../../../assets/errorImage.svg';
import Pagination from '../../../../components/Pagination';
import { useQuery } from '@tanstack/react-query';
import api from '../../../../api/api';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import { DancerProps } from '@/types/mypage/LikeDancerType';

const MyLikeDancer = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const perData = 9;
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery<DancerProps[]>({
    queryKey: ['userdancers'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      const response = await api.get('/users/dancers', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data.data.dancers || [];
    }
  });

  const filteredList = data
    ? data.slice(perData * (currentPage - 1), perData * currentPage)
    : [];

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = sampleImage;
  };

  if (isLoading) {
    return <LoadingSpinner isLoading={isLoading} />;
  }

  if (isError) {
    return <div>Error: {(error as Error)?.message}</div>;
  }

  const handleClick = (id: number) => {
    navigate(`/dancerprofile/${id}`);
  };

  return (
    <>
      {data?.length ? (
        <>
          <DancerContainer>
            {filteredList.map((dancer) => (
              <DancerList key={dancer.id}>
                <Image
                  src={dancer.images[0] || dancer.images[1]}
                  alt={dancer.dancerName}
                  onError={handleImageError}
                  onClick={() => handleClick(dancer.id)}
                />
                <DancerName>{dancer.dancerName}</DancerName>
              </DancerList>
            ))}
          </DancerContainer>
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
        <Text>내가 찜한 댄서가 없습니다.</Text>
      )}
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
  cursor: pointer;
`;

const DancerName = styled.div`
  color: #fff;
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

const Text = styled.div`
  color: #fff;
  text-align: center;
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 219px;
`;
