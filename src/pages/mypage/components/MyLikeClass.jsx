import React from 'react';
import styled from 'styled-components';
import sampleImage from '../../../assets/image.png'

const MyLikeClass = () => {
  return (
    <ClassContainer>
      {Array.from({ length: 6 }).map((_, index) => (
        <ClassList key={index}>
          <Image src={sampleImage} alt={`Class ${index + 1}`} />
        </ClassList>
      ))}
    </ClassContainer>
  );
};

export default MyLikeClass;

const ClassContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 280px); 
    gap: 50px; 
    margin-top: 40px;
    justify-content: center; 

`;

const ClassList = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 280px;
    height: 280px;
    border-radius: 10px;
    background-color: #333;
`;

const Image = styled.img`
    width: 280px;
    height: 280px;
    object-fit: cover;
    border-radius: 10px;
`;
