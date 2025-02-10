import React, { useState } from 'react';
import styled from 'styled-components';
import ClassPic from '../../../assets/dummyphoto/class.svg';
import Pagination from '../../../components/Pagination';

const ClassTab = () => {
  const data = [
    { id: 1, img: ClassPic },
    { id: 2, img: ClassPic },
    { id: 3, img: ClassPic },
    { id: 4, img: ClassPic },
    { id: 5, img: ClassPic },
    { id: 6, img: ClassPic },
    { id: 7, img: ClassPic },
    { id: 8, img: ClassPic },
  ];

  const perData = 6; // 페이지당 데이터 수
  const [currentPage, setCurrentPage] = useState(1);

   // 현재 페이지에 보여질 데이터 계산
   const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * perData;
    const endIndex = startIndex + perData;
    return data.slice(startIndex, endIndex);
  };

  return (
    <Layout>
      <ClassContainer>
      {getCurrentPageData().map((item) => (
          <Class key={item.id}>
            <ClassImg src={item.img} />
          </Class>
        ))}
      </ClassContainer>
      <PaginationContainer>
        <Pagination
          dataLength={data.length} // 전체 데이터 수
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
  flex-direction : column;
`;

const ClassContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 56px;
  margin-left : 216px;
  margin-right : 210px;
  
`;
const Class = styled.div`
  margin-bottom: 24px;
`;
const ClassImg = styled.img`
  width: 300px;
  height: 300px;
  flex-shrink: 0;
`;
const PaginationContainer = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
`;