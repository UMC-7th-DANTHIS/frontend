import React, { useState } from 'react';
import sampleImage from '../../../assets/image.png';
import styled from 'styled-components';
import MyRegisterDetail from './MyRegisterDetail';
import { ReactComponent as WriteIcon } from "../../../assets/shape/write.svg"
import { ReactComponent as TrashIcon } from "../../../assets/shape/trash.svg"

const MyRegisterClass = () => {
  const [selectedClass, setSelectedClass] = useState(null);

  const handleImageClick = (index) => {
    setSelectedClass(index);
  };

  return (
    <>
      {selectedClass === null ? (
        <ClassContainer>
          {Array.from({ length: 6 }).map((_, index) => (
            <ClassList
              key={index}
              onClick={() => handleImageClick(index)}
            >
              <Image src={sampleImage} alt={`Class ${index + 1}`} />
              <TitleText> The Seed- Aurora </TitleText>
              <IconContainer>
                <WriteIcon />
                <TrashIcon />
              </IconContainer>
            </ClassList>
          ))}
        </ClassContainer>
      ) : (
        <MyRegisterDetail index={selectedClass} />
      )}
    </>
  );
};

export default MyRegisterClass;

const ClassContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 220px);
  gap: 110px;
  margin-top: 40px;
  justify-content: center;
`;

const ClassList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 220px;
  height: 220px;
  border-radius: 10px;
  cursor: pointer;
`;

const Image = styled.img`
  width: 220px;
  height: 220px;
  object-fit: cover;
  border-radius: 10px;
`;

const TitleText = styled.div`
  color: #FFF;
  font-size: 24px;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -1.2px;
  margin-top: 9px;
`

const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 11px;
`