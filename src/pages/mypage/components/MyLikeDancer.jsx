import React from 'react'
import styled from 'styled-components'
import sampleImage from '../../../assets/image.png'
import Pagination from '../../../components/Pagination';

const MyLikeDancer = () => {
  return (
    <>
      <DancerContainer>
        {Array.from({ length: 6 }).map((_, index) => (
          <DancerList key={index}>
            <Image src={sampleImage} alt={`Class ${index + 1}`} />
            <Dancer> DancerName </Dancer>
          </DancerList>
        ))}
      </DancerContainer>
      <PaginationContainer>
        <Pagination dataLength={10} perData={6} />
      </PaginationContainer>
    </>
  );
}

export default MyLikeDancer

const DancerContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 280px); 
  gap: 50px; 
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
  width: 280px;
  height: 280px;
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
  margin-left: 50px;
`