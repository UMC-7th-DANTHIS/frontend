import React from 'react';
import styled from 'styled-components';
import sampleImage from '../../../assets/image.png'
import Pagination from '../../../components/Pagination';

const MyLikeClass = () => {
  return (
    <>
      <ClassContainer>
        {Array.from({ length: 6 }).map((_, index) => (
          <ClassList key={index}>
            <Image src={sampleImage} alt={`Class ${index + 1}`} />
            <Title> The Seed - Aurora  </Title>
            <Singer> Parana </Singer>
          </ClassList>
        ))}
      </ClassContainer>
      <PaginationContainer>
        <Pagination dataLength={10} perData={6} />
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
  margin-left: 50px;
`