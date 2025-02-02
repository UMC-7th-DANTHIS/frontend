import React, { useEffect, useState } from 'react';
import sampleImage from '../../../../assets/image.png';
import styled from 'styled-components';
import MyRegisterDetail from './MyRegisterDetail';
import { ReactComponent as WriteIcon } from "../../../../assets/shape/write.svg";
import { ReactComponent as TrashIcon } from "../../../../assets/shape/trash.svg";
import { useNavigate } from 'react-router-dom';
import Pagination from '../../../../components/Pagination';
import dummyRegister from '../../../../store/mypage/dummyRegister';
import NoRegister from '../NoRegister';
import Alert from '../../../../components/Alert';

const MyRegisterClass = ({ registeredClass }) => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({ danceClasses: [] });
  const [idDelete, setIdDelete] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const perData = 9;

  useEffect(() => {
    setData(dummyRegister);
  }, []);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * perData;
    const endIndex = startIndex + perData;
    return data.danceClasses.slice(startIndex, endIndex);
  };

  const handleImageClick = (index) => {
    setSelectedClass(index);
  };

  const gotoRegister = () => {
    navigate('/classregister');
  };

  const handleShowAlert = (id) => {
    setShowAlert(true);
    setIdDelete(id);
    console.log("id", id);
  };

  const hideShowAlert = () => {
    setShowAlert(false);
  };

  const handleDelete = () => {
    setData((prevData) => ({
      ...prevData,
      danceClasses: prevData.danceClasses.filter(
        (danceClass) => danceClass.id !== idDelete
      ),
    }));
    console.log("삭제완료");
    setShowAlert(false);
  };

  return (
    <PageWrapper>
      {selectedClass === null ? (
        <>
          {data.danceClasses && data.danceClasses.length > 0 ? (
            <ClassContainer>
              {getCurrentPageData().map((danceClass) => (
                <ClassList key={danceClass.id}>
                  <Image src={danceClass.images[0] || sampleImage} alt={danceClass.id} onClick={() => handleImageClick(danceClass.id)} />
                  <ContentWrapper>
                    <TitleText>{danceClass.className}</TitleText>
                    <IconContainer>
                      <WriteIcon onClick={(e) => { gotoRegister() }} />
                      <TrashIcon onClick={(e) => {
                        e.stopPropagation();
                        handleShowAlert(danceClass.id);
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
                          onCancel={handleDelete}
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
          <PaginationContainer>
            <Pagination
              dataLength={data.danceClasses.length}
              perData={perData}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </PaginationContainer>
        </>
      ) : (
        <MyRegisterDetail index={selectedClass} data={data} />
      )
      }
    </PageWrapper >
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
  background-color: white;
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
  align-items: center;
  margin-bottom: 164px;
`;

const ColoredText = styled.span`
  color: #a60f62;
  font-weight: bold;
`;
