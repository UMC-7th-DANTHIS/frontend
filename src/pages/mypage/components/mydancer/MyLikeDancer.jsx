import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import sampleImage from '../../../../assets/errorImage.svg'
import Pagination from '../../../../components/Pagination';
import api from '../../../../api/api';
import LoadingSpinner from '../../../../components/LoadingSpinner';

const MyLikeDancer = () => {
  const [dancers, setDancers] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const perData = 6;
  const filteredList = dancers.slice(
    perData * (currentPage - 1),
    perData * currentPage
  );
  const [isLoading, setIsLoading] = useState(true);

  //내가 찜한 댄서 api
  const getDancer = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await api.get('/users/dancers', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const dancerArray = response.data.data.dancers || [];
      setDancers(dancerArray);
      // console.log('dancers 상태:', response.data.data.dancers);
    } catch (error) {
      console.error('데이터 가져오기 실패', error.response?.data || error.message);
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      getDancer();
    }, 1000);
  }, []);

  const handleImageError = (e) => {
    e.target.src = sampleImage;
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner isLoading={isLoading} />
      ) : (
        <>
          <DancerContainer>
            {filteredList.map((dancer) => (
              <DancerList key={dancer.id}>
                <Image
                  src={dancer.images[0] || dancer.images[1] || sampleImage}
                  alt={dancer.dancerName}
                  onError={handleImageError} // 이미지 로딩 실패시 임시 샘플 사진 출력 -> 추후 삭제 예정
                />
                <Dancer>{dancer.dancerName}</Dancer>
              </DancerList>
            ))}
          </DancerContainer>
          <PaginationContainer>
            <Pagination
              dataLength={dancers.length}
              perData={perData}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </PaginationContainer>
        </>
      )}
    </>
  );
};

export default MyLikeDancer;

const DancerContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 220px); 
  column-gap: 110px;
  row-gap: 78px;
  margin-top: 40px;
  justify-content: center; 

`;

const DancerList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  flex-direction: column;
`;

const Image = styled.img`
  width: 220px;
  height: 220px;
  object-fit: cover;
  border-radius: 10px;
`;

const Dancer = styled.div`
  color: #FFF;
  font-size: 24px;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -1.2px;
  margin-top: 5px;
`
const PaginationContainer = styled.div`
  margin-bottom: 246px;
  margin-top: 96px;
  display: flex;
  justify-content: center;
  align-items: center;
`
