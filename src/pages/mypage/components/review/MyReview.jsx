import React, { useState } from 'react';
import styled from 'styled-components';
import sampleImage from '../../../../assets/image.png';
import Pagination from '../../../../components/Pagination';
import dummyClass from '../../../../store/mypage/dummyClass';
import { useNavigate } from 'react-router-dom';

const MyReview = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const perData = 6;
  const data = dummyClass;
  const filteredList = data.slice(
    perData * (currentPage - 1),
    perData * currentPage
  );

  const handleImageClick = (data) => {
    navigate(`/review/${data.id}`);
  };

  return (
    <>
      <ClassContainer>
        {filteredList.map((data) => (
          <ClassList key={data.id}>
            <Image
              src={data.images[0] || sampleImage}
              alt={data.id}
              onClick={() => handleImageClick(data)}
            />
            <Title>{data.className}</Title>
            <Singer>{data.dancerName}</Singer>
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
