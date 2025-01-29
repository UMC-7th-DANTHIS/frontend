import React, { useState } from 'react';
import sampleImage from '../../../../assets/image.png';
import styled from 'styled-components';
import MyRegisterDetail from './MyRegisterDetail';
import { ReactComponent as WriteIcon } from "../../../../assets/shape/write.svg"
import { ReactComponent as TrashIcon } from "../../../../assets/shape/trash.svg"
import { useNavigate } from 'react-router-dom';
import Pagination from '../../../../components/Pagination';
import dummyRegister from '../../../../store/mypage/dummyRegister';
import NoRegister from '../NoRegister';
import Alert from '../../../../components/Alert';

const MyRegisterClass = ({ registeredClass }) => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const data = dummyRegister;
  const [currentPage, setCurrentPage] = useState(1);
  const perData = 6;
  // const filteredList = data.slice(
  //   perData * (currentPage - 1),
  //   perData * currentPage
  // );

  const handleImageClick = (index) => {
    setSelectedClass(index);
  };

  const gotoRegister = () => {
    navigate('/classregister');
  }

  const handleShowAlert = () => {
    setShowAlert(true);
  }

  const hideShowAlert = () => {
    setShowAlert(false);
  }

  return (
    <PageWrapper>
      {selectedClass === null ? (
        <>
          {data.danceClasses.length > 0 ? (
            <ClassContainer>
              {data.danceClasses.map((danceClass) => (
                <ClassList key={danceClass.id} >
                  <Image src={danceClass.images[0] || sampleImage} alt={danceClass.className} onClick={() => handleImageClick(danceClass.id)} />
                  <ContentWrapper>
                    <TitleText>{danceClass.className}</TitleText>
                    <IconContainer>
                      <WriteIcon onClick={(e) => { gotoRegister() }} />
                      <TrashIcon onClick={(e) => {
                        e.stopPropagation();
                        handleShowAlert();
                      }} />
                      {showAlert && (
                        <Alert
                          message={
                            <span>
                              <span>
                                해당 수업을 삭제하면 <br />
                              </span>

                              <span>
                                추후에 <ColoredText> 복구가 불가 </ColoredText> 합니다. <br />
                              </span>

                              <span>
                                삭제 하시겠습니까?
                              </span>
                            </span>
                          }
                          onClose={hideShowAlert}
                          mariginsize="22.5px"
                          ContainerWidth="280px"
                          ContainerHeight="108px"
                          AlertWidth="392px"
                          AlertHeight="260px"
                          showButtons={true}
                          confirmLabel="취소"
                          cancelLabel="삭제하기"
                        />
                      )}
                    </IconContainer>
                  </ContentWrapper>
                </ClassList>
              ))}

            </ClassContainer>
          ) : (
            <NoRegister />
          )}
          {/* <PaginationContainer>
            <Pagination dataLength={data.length} perData={perData} currentPage={currentPage}
              setCurrentPage={setCurrentPage} />
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

const ColoredText = styled.span`
  color: #a60f62;
  font-weight: bold;
`;

