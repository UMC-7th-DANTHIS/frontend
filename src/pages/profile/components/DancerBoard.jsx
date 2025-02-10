import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import dummyClasses from '../../../store/reservation/dummyClasses';
import { ReactComponent as Line } from '../../../assets/shape/line.svg';
import { ReactComponent as FocusedCircle } from '../../../assets/shape/focusedcircle.svg';
import Pagination from '../../../components/Pagination';


const ClassBoard = () => {
  const genres = [
    '힙합',
    '걸스힙합',
    '팝핑',
    '락킹',
    '왁킹',
    '걸리시/힐',
    '크럼프',
    '텃팅',
    '코레오',
    'K-pop'
  ];
  const [selectedGenre, setSelectedGenre] = useState(genres[0]);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const navigate = useNavigate();
  const perData = 9;

  useEffect(() => {
    setData(dummyClasses.filter((cls) => cls.genre === selectedGenre));
  }, [selectedGenre]);

  // 장르 선택 핸들러
  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
  };

  // 수업 선택 핸들러
  // const handleDancerClick = (dancerId) => {
  //   navigate(`/dancerprofile/${dancerId}`);
  // };

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
      <Content>
      <Sidebar>
        {genres.map((genre) => (
          <GenreWrapper key={genre} onClick={() => handleGenreClick(genre)}>
            {selectedGenre === genre && <FocusedCircle />}
            <Genre $isActive={selectedGenre === genre}>{genre}</Genre>
          </GenreWrapper>
        ))}
      </Sidebar>
      <Line />
      <Classes>
      {getCurrentPageData().map((cls) => (
          <Class key={cls.id} onClick={() => handleDancerClick(cls.id)}>
            <Image></Image>
            {/* <Title>{cls.title}</Title> */}
            <Dancer>{cls.dancer}</Dancer>
          </Class>
        ))}
      </Classes>
      </Content>
      <PaginationContainer>
        <Pagination
          dataLength={data.length}
          perData={perData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </PaginationContainer>
    </Container>
  );
};

export default ClassBoard;

const Container = styled.div`
  display: flex;
  flex-direction: column; /* 이미 방향이 row로 설정되어 있음 */
  //align-items: flex-start; /* 세로 정렬이 위쪽으로 고정 */
  //justify-content: flex-start; /* 가로 정렬이 왼쪽으로 고정 */
  background-color: black;
  padding-bottom: 200px; /* 임시로 적용한 패딩 */
  width : 1200px;
`;

const Content = styled.div`
display : flex;
flex-direction : row;
`

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  //height: 900px;
  margin-top: 14px;
`;
const GenreWrapper = styled.div`
  display: flex;
  flex-direction: row;
  //align-items: center;
  width: 197px;
  margin-bottom: 50px;
  justify-content : flex-start;
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



const Classes = styled.div`
  display: grid;
  grid-template-columns: repeat(3,1fr); /* 각 칸의 너비를 고정 */
  grid-template-rows: 350px; /* 행 높이를 콘텐츠에 맞게 조정 */
  grid-gap: ; /* 간격 제거 */
  justify-content: center; /* 그리드 전체를 가운데 정렬 */
  //align-items : center;
  margin: 0 auto; /* 컨테이너 자체 가운데 정렬 */
  //width: auto; /* 전체 크기를 내용에 맞춤 */
  //height : auto;
  //margin-left : 20px;
`;


const Class = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* 내부 요소를 위로 정렬 */
  align-items: center;
  margin: 55px;
  height : 300px;
  &:hover {
    cursor: pointer;
  }
`;

const Image = styled.div`
  width: 220px;
  height: 220px;
  border-radius: 10px; 
  background: url(<path-to-image>) lightgray 50% / cover no-repeat;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
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
  margin-bottom : 20px;
`;
const PaginationContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left:200px;
`;