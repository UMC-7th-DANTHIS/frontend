import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Pagination from '../../components/Pagination';
import { useParams } from 'react-router-dom';
import api from '../../api/api';

type DanceClassType = {
  id: number;
  className: string;
  thumbnailImage: string;
};

interface ClassTabProps {
  dancerId: number;
}

const ClassTab: React.FC<ClassTabProps> = ({ dancerId }) => {
  const [classes, setClasses] = useState<DanceClassType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalElements, setTotalElements] = useState<number>(0);

  const perData = 6;

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await api.get(`/dancers/dance-classes`, {
          params: {
            dancerId,
            page: currentPage,
            size: perData,
          },
        });

        if (response.data.code === 200) {
          setClasses(response.data.data.danceClasses);
          setTotalPages(response.data.data.totalPages);
          setTotalElements(response.data.data.totalElements);
          console.log(response.data.data);
        }
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
      }
    };

    fetchClasses();
  }, [dancerId, currentPage]);

  return (
    <Layout>
      <ClassContainer hasClasses={classes.length > 0}>
        {classes.length > 0 ? (
          classes.map((item) => (
            <Class key={item.id}>
              <ClassImg src={item.thumbnailImage} alt={item.className} />
            </Class>
          ))
        ) : (
          <NoClassMessage>등록된 수업이 없습니다.</NoClassMessage>
        )}
      </ClassContainer>
      <PaginationContainer>
        <Pagination
          dataLength={totalElements} // 전체 데이터 수
          perData={perData} // 페이지당 데이터 수
          currentPage={currentPage} // 현재 페이지
          setCurrentPage={setCurrentPage} // 페이지 변경 함수
        />
      </PaginationContainer>
    </Layout>
  );
};

export default ClassTab;

const Layout = styled.div`
  display: flex;
  margin-top: 100px;
  justify-content: center;
  padding-bottom: 442px;
  flex-direction: column;
`;

const ClassContainer = styled.div<{ hasClasses: boolean }>`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 56px;
  margin-left: 220px;
  margin-right: 210px;
  display: ${({ hasClasses }) =>
    hasClasses ? 'grid' : 'flex'}; // 수업이 없을 때 flex로 변경
  grid-template-columns: ${({ hasClasses }) =>
    hasClasses ? 'repeat(3, 1fr)' : 'none'};
`;
const Class = styled.div`
  margin-bottom: 24px;
  width: 295px;
  height: 295px;
  border-radius: 10px;
  background: url(<path-to-image>) lightgray 50% / cover no-repeat;
`;
const ClassImg = styled.img`
  width: 100%;
  height: 100%;
  flex-shrink: 0;
`;
const PaginationContainer = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
`;

const NoClassMessage = styled.div`
  color: white;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  width: 100%;
  height: 100%;
`;
