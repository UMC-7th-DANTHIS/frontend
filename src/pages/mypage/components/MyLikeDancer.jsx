import React from 'react'
import styled from 'styled-components'

const MyLikeDancer = () => {
    return (
        <DancerContainer>
            {Array.from({ length: 6 }).map((_, index) => (
                <DancerList key={index}>
                    <div>사진</div>
                </DancerList>
            ))}
        </DancerContainer>
    );
}

export default MyLikeDancer

const DancerContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 280px); 
    gap: 50px; 
    margin-top: 70px;
    justify-content: center; 

`;


const DancerList = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 280px;
    height: 280px;
    border-radius: 10px;
    background-color: #333;
`;