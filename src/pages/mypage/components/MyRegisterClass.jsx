import React, { useState } from 'react';
import sampleImage from '../../../assets/image.png';
import styled from 'styled-components';
import MyRegisterDetail from './MyRegisterDetail';
import { ReactComponent as WriteIcon } from "../../../assets/shape/write.svg"
import { ReactComponent as TrashIcon } from "../../../assets/shape/trash.svg"
import { useNavigate } from 'react-router-dom';
import Pagination from '../../../components/Pagination';
import dummyRegister from '../../../store/mypage/dummyRegister';
import NoRegister from './NoRegister';

const MyRegisterClass = ({ registeredClass }) => {
  const [selectedClass, setSelectedClass] = useState(null);
  const navigate = useNavigate();
  const data = dummyRegister;

  const handleImageClick = (index) => {
    setSelectedClass(index);
  };

  const gotoRegister = () => {
    navigate('/classregister');
  }

  return (
    <PageWrapper>
      {selectedClass === null ? (
        <>
          {data.danceClasses.length > 0 ? (
            <ClassContainer>
              {data.danceClasses.map((danceClass) => (
                <ClassList key={danceClass.id} onClick={() => handleImageClick(danceClass.id)} >
                  <Image src={danceClass.images[0] || sampleImage} alt={danceClass.className} />
                  <ContentWrapper>
                    <TitleText>{danceClass.className}</TitleText>
                    <IconContainer>
                      <WriteIcon onClick={(e) => { gotoRegister() }} />
                      <TrashIcon />
                    </IconContainer>
                  </ContentWrapper>
                </ClassList>
              ))}

            </ClassContainer>
          ) : (
            <NoRegister />
          )}
          {/* <PaginationContainer>
            <Pagination dataLength={10} perData={6} />
          </PaginationContainer> */}
        </>
      ) : (
        <MyRegisterDetail index={selectedClass} data={data} />

      )}
    </PageWrapper>
  );
};

export default MyRegisterClass;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ClassContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 220px);
  column-gap: 110px;
  justify-content: center;
  margin-top: 40px;
`;

const ClassList = styled.div`
  width: 220px;
  cursor: pointer;
`;

const Image = styled.img`
  width: 220px;
  height: 220px;
  object-fit: cover;
  border-radius: 10px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-top: 9px;
`;

const TitleText = styled.div`
  color: #FFF;
  font-size: 24px;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -1.2px;
  white-space: nowrap;          
  overflow: hidden;            
  text-overflow: ellipsis; 
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 11px;
  margin-bottom: 49px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
`;
