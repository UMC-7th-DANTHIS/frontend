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
  classes: DanceClassType[];
}

const ClassTab: React.FC<ClassTabProps> = ({ classes: initialClasses }) => {
  const { dancerId } = useParams<{ dancerId: string }>();
  const [classes, setClasses] = useState<DanceClassType[]>(initialClasses); // 수업 데이터
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지
  const [, setTotalPages] = useState<number>(1); // 전체 페이지 수
  const [totalElements, setTotalElements] = useState<number>(0); // 전체 요소 개수 상태 추가

  const perData = 6; // 페이지당 데이터 수

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await api.get(`/dancers/dance-classes`, {
          params: {
            dancerId: dancerId, // 특정 댄서의 수업 조회
            page: currentPage,
            size: perData
          }
        });

        if (response.data.code === 200) {
          setClasses(response.data.data.danceClasses); // 수업 데이터 저장
          setTotalPages(response.data.data.totalPages); // 전체 페이지 수 설정
          setTotalElements(response.data.data.totalElements); // totalElements 추가
          console.log(response.data.data);
        } else {
          console.error('수업 정보 불러오기 실패:', response.data.message);
        }
      } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
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
  margin-left: 216px;
  margin-right: 210px;
  display: ${({ hasClasses }) =>
    hasClasses ? 'grid' : 'flex'}; // 수업이 없을 때 flex로 변경
  grid-template-columns: ${({ hasClasses }) =>
    hasClasses ? 'repeat(3, 1fr)' : 'none'};
`;
const Class = styled.div`
  margin-bottom: 24px;
  width: 300px;
  height: 300px;
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
