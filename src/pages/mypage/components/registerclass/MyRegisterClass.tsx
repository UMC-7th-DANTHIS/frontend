import React, { useState } from 'react';
import sampleImage from '../../../../assets/errorImage.svg';
import styled from 'styled-components';
import MyRegisterDetail from './MyRegisterDetail';
import { ReactComponent as WriteIcon } from '../../../../assets/shape/write.svg';
import { ReactComponent as TrashIcon } from '../../../../assets/shape/trash.svg';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../../../components/Pagination';
import NoRegister from '../NoRegister';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../../../../api/api';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import { ModalTwoBtns } from '../../../../components/modals';
import NoDancer from '../NoDancer';
import { RegisterClassProps } from '@/types/mypage/RegisterType';
import MyEditClass from './MyEditClass';
import useIsMobile from '../../../../hooks/useIsMobile';

const MyRegisterClass = ({ dancerId }: { dancerId: number }) => {
  const [selectedClass] = useState<number | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const navigate = useNavigate();
  const [idDelete, setIdDelete] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const perData = 9;
  const queryClient = useQueryClient();
  const isMobile = useIsMobile();

  const [isEditing, setIsEditing] = useState(false);
  const [editClassId, setEditClassId] = useState<number | null>(null);

  const { data, isLoading, isError, error } = useQuery<
    RegisterClassProps[] | null
  >({
    queryKey: ['userregister'],
    queryFn: async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/dancers/info/dance-classes', {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          params: {
            dancerId: dancerId, // 특정 댄서의 수업 조회
            page: currentPage,
            size: perData
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

  const handleEdit = (classId: number) => {
    setEditClassId(classId);
    setIsEditing(true);
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

  if (isEditing && editClassId !== null) {
    return (
      <MyEditClass classId={editClassId} onClose={() => setIsEditing(false)} />
    );
  }

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
                  isMobile={isMobile}
                  onError={handleImageError}
                  onClick={() => handleImageClick(danceClass.id)}
                />
                <ContentWrapper>
                  <TitleText isMobile={isMobile}>{danceClass.className}</TitleText>
                  <IconContainer isMobile={isMobile}>
                    <WriteIcon onClick={() => handleEdit(danceClass.id)} />
                    <TrashIcon
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShowAlert(danceClass.id);
                      }}
                    />
                    {showAlert && (
                      <ModalTwoBtns
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
                        showButtons={true}
                        primaryLabel="취소"
                        secondaryLabel="삭제하기"
                        onPrimaryClick={hideShowAlert}
                        onSecondaryClick={handleDelete}
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

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 200px);
    column-gap: 40px;
    row-gap: 40px;
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 140px);
    column-gap: 20px;
    row-gap: 16px;
    margin-top: 30px;
  }
`;

const ClassList = styled.div`
  width: 220px;
  cursor: pointer;

  @media (max-width: 1024px) {
    width: 200px;
  }

  @media (max-width: 600px) {
    width: 140px;
  }
`;

const Image = styled.img<{ isMobile: boolean }>`
  object-fit: cover;
  border-radius: 10px;
  background-color: white;
  cursor: pointer;

  ${({ isMobile }) =>
    isMobile
      ? `
        width: 140px;
        height: 140px;
      `
      : `
        width: 220px;
        height: 220px;
      `}

  @media (max-width: 1024px) and (min-width: 601px) {
    width: 200px;
    height: 200px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-top: 9px;

  @media (max-width: 600px) {
    gap: 6px;
    margin-top: 6px;
  }
`;

const TitleText = styled.div<{ isMobile: boolean }>`
  color: #fff;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -1.2px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  ${({ isMobile }) =>
    isMobile
      ? `
        font-size: 18px;
      
      `
      : `
        font-size: 24px;
        white-space: nowrap;
      `}

  @media (max-width: 1024px) and (min-width: 601px) {
    font-size: 20px;
    min-height: 48px;
  }
`;

const IconContainer = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex-direction: row;
  gap: 11px;
  margin-bottom: 49px;

  ${({ isMobile }) =>
    isMobile &&
    `
      gap: 8px;
      margin-bottom: 20px;
    `}

  svg {
    cursor: pointer;
    ${({ isMobile }) =>
      isMobile &&
      `
        width: 18px;
        height: 18px;
      `}
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 164px;

  @media (max-width: 600px) {
    margin-bottom: 80px;
  }
`;

const ColoredText = styled.span`
  color: #a60f62;
  font-weight: bold;
`;
