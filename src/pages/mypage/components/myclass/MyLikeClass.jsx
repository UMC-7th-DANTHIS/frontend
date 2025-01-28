import React, { useState } from 'react';
import styled from 'styled-components';
import sampleImage from '../../../../assets/image.png'
import Pagination from '../../../../components/Pagination';
import dummyClass from '../../../../store/mypage/dummyClass';

const MyLikeClass = () => {
  const data = dummyClass;
  const [currentPage, setCurrentPage] = useState(1);
  const perData = 6;
  const filteredList = data.slice(
    perData * (currentPage - 1),
    perData * currentPage
  );

  return (
    <>
      <ClassContainer>
        {filteredList.map((data) => (
          <ClassList key={data.id}>
            <Image src={data.images[0] || sampleImage} alt={data.id} />
            <Title>{data.className}</Title>
            <Singer>{data.dancerName}</Singer>
          </ClassList>
        ))}
      </ClassContainer>
      <PaginationContainer>
        <Pagination dataLength={data.length} perData={perData} currentPage={currentPage}
          setCurrentPage={setCurrentPage} />
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
    /* background-color: #333; */
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
`;

const PaginationContainer = styled.div`
  margin-bottom: 205px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`
