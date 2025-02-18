import React, { useEffect, useState } from 'react';
import sampleImage from '../../../../assets/errorImage.svg'
import styled from 'styled-components';
import MyRegisterDetail from './MyRegisterDetail';
import { ReactComponent as WriteIcon } from "../../../../assets/shape/write.svg";
import { ReactComponent as TrashIcon } from "../../../../assets/shape/trash.svg";
import { useNavigate } from 'react-router-dom';
import Pagination from '../../../../components/Pagination';
import NoRegister from '../NoRegister';
import Alert from '../../../../components/Alert';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../../../../api/api';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import NoDancer from '../NoDancer';

const MyRegisterClass = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const [idDelete, setIdDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const perData = 9;
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery(
    {
      queryKey: ['userregister'],
      queryFn: async () => {
        const token = localStorage.getItem('token');
        const response = await api.get('/dancers/dance-classes', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log(response.data.data.danceClasses);
        return response.data.data.danceClasses || [];
      },
    }
  );

  const deleteClassMutation = useMutation({
    mutationFn: (classId) => api.delete(`/dance-classes/${classId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userregister'] });
    },
  });

  if (isLoading) {
    return <LoadingSpinner isLoading={isLoading} />;
  }
  if (isError) {
    if (error?.response?.status === 404) {
      return <NoDancer />
    }
    return <div>Error: {error?.message}</div>;
  }


  const handleImageError = (e) => {
    e.target.src = sampleImage;
  };


  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * perData;
    const endIndex = startIndex + perData;
    return Array.isArray(data) ? data.slice(startIndex, endIndex) : [];
  };

  const handleImageClick = (classId) => {
    navigate(`/detail/${classId}`);
  };


  const handlegoEdit = (classId) => {
    navigate(`/classregister/${classId}`);
  };

  const handleShowAlert = (id) => {
    setShowAlert(true);
    setIdDelete(id);
  };

  const hideShowAlert = () => {
    setShowAlert(false);
  };

  const handleDelete = () => {
    if (idDelete) {
      deleteClassMutation.mutate(idDelete);
      setShowAlert(false);
    }
  };

  return (
    <PageWrapper>
      {selectedClass === null ? (
        <>
          <ClassContainer>
            {getCurrentPageData().map((danceClass) => (
              <ClassList key={danceClass.id}>
                <Image src={danceClass.thumbnailImage[0] || sampleImage} alt={danceClass.id} onError={handleImageError} onClick={() => handleImageClick(danceClass.id)} />
                <ContentWrapper>
                  <TitleText>{danceClass.className}</TitleText>
                  <IconContainer>
                    <WriteIcon onClick={() => handlegoEdit(danceClass.id)} />
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
                        onConfirm={hideShowAlert}
                      />
                    )}
                  </IconContainer>
                </ContentWrapper>
              </ClassList>
            ))}
          </ClassContainer>
          <PaginationContainer>
            <Pagination
              dataLength={data.length}
              perData={perData}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </PaginationContainer>
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