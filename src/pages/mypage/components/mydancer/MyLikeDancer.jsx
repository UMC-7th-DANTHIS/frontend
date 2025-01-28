import React, { useState } from 'react'
import styled from 'styled-components'
import sampleImage from '../../../../assets/image.png'
import Pagination from '../../../../components/Pagination';
import dummyDancer from '../../../../store/mypage/dummyDancer';

const MyLikeDancer = () => {
  const data = dummyDancer;
  const [currentPage, setCurrentPage] = useState(1);
  const perData = 6;
  const filteredList = data.slice(
    perData * (currentPage - 1),
    perData * currentPage
  );

  return (
    <>
      <DancerContainer>
        {filteredList.map((data) => (
          <DancerList key={data.id}>
            <Image src={data.images[0] || sampleImage} alt={data.id} />
            <Dancer> {data.dancerName} </Dancer>
          </DancerList>
        ))}
      </DancerContainer>
      <PaginationContainer>
        <Pagination dataLength={data.length} perData={perData} currentPage={currentPage}
          setCurrentPage={setCurrentPage} />
      </PaginationContainer>
    </>
  );
}

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
`
const PaginationContainer = styled.div`
  margin-bottom: 246px;
  margin-top: 96px;
  display: flex;
  justify-content: center;
  align-items: center;
`