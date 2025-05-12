import React, { useState } from 'react';
import sampleImage from '../../../../assets/errorImage.svg';
import styled from 'styled-components';
import MyRegisterDetail from './MyRegisterDetail';
import { ReactComponent as WriteIcon } from '../../../../assets/shape/write.svg';
import { ReactComponent as TrashIcon } from '../../../../assets/shape/trash.svg';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../../../components/Pagination';
import NoRegister from '../NoRegister';
import Alert from '../../../../components/Alert';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../../../../api/api';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import NoDancer from '../NoDancer';

interface RegisterClassProps {
  id: number;
  thumbnailImage: string;
  className: string;
}

const MyRegisterClass = () => {
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const navigate = useNavigate();
  const [idDelete, setIdDelete] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const perData = 9;
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery<
    RegisterClassProps[] | null
  >({
    queryKey: ['userregister'],
    queryFn: async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/dancers/dance-classes', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        return response.data.data.danceClasses || [];
      } catch (error: any) {
        if (error.response?.status === 404) {
          return null;
        }
        throw error;
      }
    }
  });

  const deleteClassMutation = useMutation({
    mutationFn: (classId: number) => api.delete(`/dance-classes/${classId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userregister'] });
    }
  });

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;
  if (data === null) return <NoDancer />;
  if (data?.length === 0) return <NoRegister />;
  if (isError) return <div>Error: {(error as Error)?.message}</div>;

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = sampleImage;
  };

  const getCurrentPageData = (): RegisterClassProps[] => {
    const startIndex = (currentPage - 1) * perData;
    return Array.isArray(data)
      ? data.slice(startIndex, startIndex + perData)
      : [];
  };

  const handleImageClick = (classId: number) => {
    navigate(`/detail/${classId}`);
  };

  const handlegoEdit = (classId: number) => {
    navigate(`/classregister/${classId}`);
  };

  const handleShowAlert = (id: number) => {
    setShowAlert(true);
    setIdDelete(id);
  };

  const hideShowAlert = () => {
    setShowAlert(false);
  };

  const handleDelete = () => {
    if (idDelete !== null) {
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
                <Image
                  src={danceClass.thumbnailImage}
                  alt={String(danceClass.id)}
                  onError={handleImageError}
                  onClick={() => handleImageClick(danceClass.id)}
                />
                <ContentWrapper>
                  <TitleText>{danceClass.className}</TitleText>
                  <IconContainer>
                    <WriteIcon onClick={() => handlegoEdit(danceClass.id)} />
                    <TrashIcon
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShowAlert(danceClass.id);
                      }}
                    />
                    {showAlert && (
                      <Alert
                        message={
                          <span>
                            <span>
                              해당 수업을 삭제하면 <br />
                            </span>
                            <span>
                              <ColoredText>복구가 불가</ColoredText>합니다.
                              <br />
                            </span>
                            <span>삭제 하시겠습니까?</span>
                          </span>
                        }
                        onClose={hideShowAlert}
                        marginsize="22.5px"
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
              dataLength={data?.length ?? 0}
              perData={perData}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </PaginationContainer>
        </>
      ) : (
        <MyRegisterDetail />
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
  color: #fff;
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
