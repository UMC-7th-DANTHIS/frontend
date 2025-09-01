import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
//import { ReactComponent as Line } from '../../../assets/shape/line.svg';
import { ReactComponent as FocusedCircle } from '../../assets/shape/focusedcircle.svg';
import Pagination from '../../components/Pagination';
import api from '../../api/api';
import LoadingSpinner from '../../components/LoadingSpinner';

type DancerType = {
  id: number;
  dancerName: string;
  images: string[];
};

type GenreType = {
  id: number;
  name: string;
};

const ClassBoard: React.FC = () => {
  const genres: GenreType[] = [
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
  const [selectedGenre, setSelectedGenre] = useState<number>(1);
  const [data, setData] = useState<DancerType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지 상태
  const [totalElements, setTotalElements] = useState<number>(0); // 전체 요소 개수 상태 추가
  const [, setTotalPages] = useState<number>(1); // 전체 페이지 수
  const [isFetching, setIsFetching] = useState<boolean>(false); // 로딩 상태

  const perData = 9;

  useEffect(() => {
    // API 호출 함수
    const fetchData = async () => {
      setIsFetching(true); // 로딩 시작
      try {
        const genreId = selectedGenre;
        const response = await api.get(
          `/dancers/genres/${genreId}?page=${currentPage}`
        );
        if (response.data.code === 200) {
          setData(response.data.data.dancers);
          setTotalPages(response.data.data.totalPages);
          setTotalElements(response.data.data.totalElements); // totalElements 추가
          console.log('댄서 데이터를 성공적으로 불러왔습니다.');
          console.log(response.data.data);
        } else {
          console.error('데이터를 불러오는 데 실패했습니다.');
        }
      } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
      } finally {
        setIsFetching(false); // 로딩 종료
      }
    };

    fetchData();
  }, [selectedGenre, currentPage]);

// const BASE_URL = process.env.REACT_APP_API_BASE_URL!;

// useEffect(() => {
//   const controller = new AbortController();
//   const load = async () => {
//     setIsFetching(true);
//     try {
//       const res = await fetch(
//         `${BASE_URL}/dancers/genres/${selectedGenre}?page=${currentPage}`,
//         { method: 'GET', credentials: 'omit', signal: controller.signal } // ✅ 완전 공개 요청
//       );
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
//       const json = await res.json();
//       if (json.code === 200) {
//         setData(json.data.dancers);
//         setTotalElements(json.data.totalElements);
//         setTotalPages(json.data.totalPages);
//       }
//     } catch (e) {
//       if ((e as any).name !== 'AbortError') console.error(e);
//     } finally {
//       setIsFetching(false);
//     }
//   };
//   load();
//   return () => controller.abort();
// }, [selectedGenre, currentPage]);

// const baseUrlRef = useRef(process.env.REACT_APP_API_BASE_URL!);

// useEffect(() => {
//   const controller = new AbortController();

//   const load = async () => {
//     setIsFetching(true);
//     try {
//       const res = await fetch(
//         `${baseUrlRef.current}/dancers/genres/${selectedGenre}?page=${currentPage}`,
//         { method: 'GET', credentials: 'omit', signal: controller.signal }
//       );
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
//       const json = await res.json();
//       if (json.code === 200) {
//         setData(json.data.dancers);
//         setTotalElements(json.data.totalElements);
//         setTotalPages(json.data.totalPages);
//       }
//     } catch (e) {
//       if ((e as any).name !== 'AbortError') console.error(e);
//     } finally {
//       setIsFetching(false);
//     }
//   };

//   load();
//   return () => controller.abort();
// }, [selectedGenre, currentPage]);


  // 장르 선택 핸들러
  const handleGenreClick = (genre: number) => {
    setSelectedGenre(genre);
  };

  // const handlePageChange = (newPage: number) => {
  //   console.log(`페이지 변경 요청: ${newPage} / 총 페이지: ${totalPages}`);

  //   if (newPage >= 1 && newPage <= totalPages) {
  //     setCurrentPage(newPage);
  //   }
  // };

  // 현재 페이지에 보여질 요소 계산
  // const getCurrentPageData = () => {
  //   const startIndex = (currentPage - 1) * perData;
  //   const endIndex = startIndex + perData;

  //   return data.slice(startIndex, endIndex);
  // };

  // const handleDancerClick = (dancerId: number) => {
  //   navigate(`/dancerprofile/${dancerId}`);
  // };

  return (
    <Container>
      <Sidebar>
        {genres.map((genre) => (
          <GenreWrapper
            key={genre.id}
            onClick={() => handleGenreClick(genre.id)}
          >
            {selectedGenre === genre.id && <FocusedCircle />}
            <Genre $isActive={selectedGenre === genre.id}>{genre.name}</Genre>
          </GenreWrapper>
        ))}
      </Sidebar>
      <Line />
      {isFetching ? (
        <LoadingContainer>
          <LoadingSpinner isLoading={isFetching} />
        </LoadingContainer>
      ) : (
        <BoardContainer>
          <Classes>
            {data.map((dancer) => (
              <Class to={`/dancerprofile/${dancer.id}`} key={dancer.id}>
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
           setCurrentPage={setCurrentPage}
          />
          {/* </PaginationContainer> */}
        </BoardContainer>
      )}
    </Container>
  );
};

export default ClassBoard;

 const LoadingContainer = styled.div`
   width: 880px;
 `;
// const PaginationContainer = styled.div`
//   margin-top: 20px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-left: 200px;
// `;

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

const Genre = styled.div<{ $isActive: boolean }>`
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
// const Title = styled.div`
//   margin-top: 9px;
//   color: #fff;
//   font-family: Pretendard;
//   font-size: 24px;
//   font-style: normal;
//   font-weight: 600;
//   line-height: normal;
//   letter-spacing: -1.2px;
// `;
const Dancer = styled.div`
  color: #fff;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -1.2px;
  margin-top: 9px;
`;
