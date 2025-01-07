import React from 'react';
import styled from 'styled-components';

const MyLikeClass = () => {
    return (
        <ClassContainer>
            {Array.from({ length: 6 }).map((_, index) => (
                <ClassList key={index}>
                    <div>내용</div>
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
    margin-top: 70px;
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
