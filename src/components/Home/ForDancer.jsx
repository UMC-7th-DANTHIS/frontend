import React from 'react';
import styled from 'styled-components';

const ForDancer = ({ dummyUserDancer }) => {
  return (
    <DancerContainer>
      {dummyUserDancer?.map((Dancer) => (
        <DancerContent>
          <DancerImage src={Dancer.Image} alt={'프로필 이미지'} />
          <DancerName>{Dancer.Dancer}</DancerName>
          <DancerGenre>{Dancer.Genre}</DancerGenre>
        </DancerContent>
      ))}
    </DancerContainer>
  );
};

const DancerContainer = styled.div`
  display: flex;
  gap: 39px;
  padding-bottom: 87px;
  border-bottom: 2px solid #4d4d4d;
  margin-bottom: 87px;
`;

const DancerContent = styled.div`
  text-align: center;
`;

const DancerImage = styled.img`
  width: 280px;
  height: 380px;
  flex-shrink: 0;

  background-color: white;
  border-radius: 50%;
  margin-bottom: 27px;
`;

const DancerName = styled.div`
  color: white;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const DancerGenre = styled.div`
  color: #b2b2b2;
  font-size: 20px;
  font-weight: 600;
`;

export default ForDancer;
