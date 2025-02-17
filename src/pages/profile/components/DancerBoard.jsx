import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import dummyClasses from '../../../store/reservation/dummyClasses';
//import { ReactComponent as Line } from '../../../assets/shape/line.svg';
import { ReactComponent as FocusedCircle } from '../../../assets/shape/focusedcircle.svg';
import Pagination from '../../../components/Pagination';
import api from '../../../api/api'

const ClassBoard = () => {
  const genres = [
    { id: 1, name: '힙합' },
    { id: 2, name: '걸스힙합' },
    { id: 3, name: '팝핑' },
    { id: 4, name: '락킹' },
    { id: 5, name: '왁킹' },
    { id: 6, name: '걸리시/힐' },
    { id: 7, name: '크럼프' },
    { id: 8, name: '텃팅' },
    { id: 9, name: '코레오' },
    { id: 10, name: 'K-pop' }
  ];
  const [selectedGenre, setSelectedGenre] = useState(1);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [totalElements, setTotalElements] = useState(0); // 전체 요소 개수 상태 추가
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
  const [isFetching, setIsFetching] = useState(false); // 로딩 상태
  const navigate = useNavigate();
  const perData = 9;

  useEffect(() => {
    // API 호출 함수
    const fetchData = async () => {
      // setIsFetching(true); // 로딩 시작
      try {
        const genreId = selectedGenre;
        const response = await api.get(
          `/dancers/genres/${genreId}?page=${currentPage}`
        );
        if (response.data.code === 200) {
          setData(response.data.data.dancers);
          setTotalPages(response.data.data.totalPages);
          setTotalElements(response.data.data.totalElements); // totalElements 추가
          console.log("댄서 데이터를 성공적으로 불러왔습니다.");
          console.log(response.data.data);
        } else {
          console.error("데이터를 불러오는 데 실패했습니다.");
        }
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
       } 
      // finally {
      //   setIsFetching(false); // 로딩 종료
      // }
    };

    fetchData();
  }, [selectedGenre, currentPage]);

  // 장르 선택 핸들러
  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
  };

  const handlePageChange = (newPage) => {
    console.log(`페이지 변경 요청: ${newPage} / 총 페이지: ${totalPages}`);
    
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  

  // 현재 페이지에 보여질 요소 계산
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * perData;
    const endIndex = startIndex + perData;

    return data.slice(startIndex, endIndex);
  };

  const handleDancerClick =(dancerId) => 
  { navigate(`/dancerprofile/${dancerId}`);}

  return (
    <Container>
      <Sidebar>
        {genres.map((genre) => (
          <GenreWrapper key={genre.id} onClick={() => handleGenreClick(genre.id)}>
            {selectedGenre === genre.id && <FocusedCircle />}
            <Genre $isActive={selectedGenre === genre.id}>{genre.name}</Genre>
          </GenreWrapper>
        ))}
      </Sidebar>
      <Line />
      <BoardContainer>
      <Classes>
      {data.map((dancer) => (
          <Class to={`/dancerprofile/${dancer.id}`} key={dancer.id} 
          >
            <Image src={dancer.images[0]} alt={dancer.dancerName} />
           
            <Dancer>{dancer.dancerName}</Dancer>
          </Class>
        ))}
      </Classes>
      {/* <PaginationContainer> */}
        <Pagination
          dataLength={totalElements}
          perData={perData}
          currentPage={currentPage}
          setCurrentPage={handlePageChange}
        />
      {/* </PaginationContainer> */}
      </BoardContainer>
    </Container>
  );
};

export default ClassBoard;

// const Container = styled.div`
//   display: flex;
//   flex-direction: column; /* 이미 방향이 row로 설정되어 있음 */
//   //align-items: flex-start; /* 세로 정렬이 위쪽으로 고정 */
//   //justify-content: flex-start; /* 가로 정렬이 왼쪽으로 고정 */
//   background-color: black;
//   padding-bottom: 200px; /* 임시로 적용한 패딩 */
//   width : 1200px;
// `;

// const Content = styled.div`
// display : flex;
// flex-direction : row;
// `

// const Sidebar = styled.div`
//   display: flex;
//   flex-direction: column;
//   //height: 900px;
//   margin-top: 14px;
// `;
// const GenreWrapper = styled.div`
//   display: flex;
//   flex-direction: row;
//   //align-items: center;
//   width: 197px;
//   margin-bottom: 50px;
//   justify-content : flex-start;
//   &:hover {
//     cursor: pointer;
//   }
// `;
// const Genre = styled.div`
//   color: var(--text_secondary-gray, #b2b2b2);
//   font-family: Pretendard;
//   font-size: 24px;
//   font-style: normal;
//   font-weight: 500;
//   line-height: normal;
//   letter-spacing: -1.2px;
//   transition: all 0.3s ease;

//   ${({ $isActive }) =>
//     $isActive &&
//     `margin-left: 13px;
//     color: var(--main_white, #fff);
//     font-size: 30px;
//     font-weight: 600;
//     letter-spacing: -1.5px;`}
// `;



// const Classes = styled.div`
//   display: grid;
//   grid-template-columns: repeat(3,1fr); /* 각 칸의 너비를 고정 */
//   grid-template-rows: 350px; /* 행 높이를 콘텐츠에 맞게 조정 */
//   grid-gap: ; /* 간격 제거 */
//   justify-content: center; /* 그리드 전체를 가운데 정렬 */
//   //align-items : center;
//   margin: 0 auto; /* 컨테이너 자체 가운데 정렬 */
//   //width: auto; /* 전체 크기를 내용에 맞춤 */
//   //height : auto;
//   //margin-left : 20px;
// `;


// const Class = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start; /* 내부 요소를 위로 정렬 */
//   align-items: center;
//   margin: 55px;
//   height : 300px;
//   &:hover {
//     cursor: pointer;
//   }
// `;

// const Image = styled.div`
//   width: 220px;
//   height: 220px;
//   border-radius: 10px; 
//   background: url(<path-to-image>) lightgray 50% / cover no-repeat;

//   img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//   }
// `;

// const Dancer = styled.div`
//   color: #FFF;
//   font-family: Pretendard;
//   font-size: 24px;
//   font-style: normal;
//   font-weight: 600;
//   line-height: normal;
//   letter-spacing: -1.2px;
//   margin-top : 9px;
//   margin-bottom : 20px;
// `;
const PaginationContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left:200px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  background-color: black;
  justify-content: center;
`;
const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  height: 900px;
  margin-top: 14px;
`;
const Line = styled.div`
  width: 0px;
  height: 770px;
  border: 2px solid var(--main_purple, #9819c3);
`;
const GenreWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 197px;
  margin-bottom: 50px;

  &:hover {
    cursor: pointer;
  }
`;
const Genre = styled.div`
  color: var(--text_secondary-gray, #b2b2b2);
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -1.2px;
  transition: all 0.3s ease;

  ${({ $isActive }) =>
    $isActive &&
    `margin-left: 13px;
    color: var(--main_white, #fff);
    font-size: 30px;
    font-weight: 600;
    letter-spacing: -1.5px;`}
`;
const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 38px 0 160px 36px;
`;
const Classes = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(auto-fill, 333px);
  width: 880px;
`;
const Class = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration-line: none;
  margin-bottom: 54px;

  &:hover {
    cursor: pointer;
  }
`;
const Image = styled.img`
  width: 220px;
  height: 220px;
  border-radius: 10px;
  background: url(<path-to-image>) lightgray 50% / cover no-repeat;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover; // 비율 유지
  }
`;
const Title = styled.div`
  margin-top: 9px;
  color: #fff;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -1.2px;
`;
const Dancer = styled.div`
  color: #FFF;
font-family: Pretendard;
font-size: 24px;
font-style: normal;
font-weight: 600;
line-height: normal;
letter-spacing: -1.2px;
margin-top : 9px;
`;
