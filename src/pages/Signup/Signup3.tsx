import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Shape1 from '../../assets/shape/shape1.svg';
import Shape2 from '../../assets/shape/shape2.svg';
import Logoimg from '../../assets/logo.svg';
import Searchicon from '../../assets/searchicon.svg';
import Overlay from './components/Overlay';
import Close from '../../assets/buttons/close.svg';
import api from '../../api/api';

interface Genre {
  id: number;
  name: string;
}

interface Dancer {
  id: number;
  name: string;
  image: string;
}

interface Signup2Data {
  nickname: string;
  gender: string;
  phoneNumber: string;
  profileImage: string;
}

interface GenreButtonProps {
  isSelected: boolean;
}
const Signup3 = () => {
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
  const [signup2Data, setSignup2Data] = useState<Signup2Data | null>(null); // Signup2에서 가져온 데이터 상태
  const [favoriteDancer, setFavoriteDancer] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Dancer[]>([]);
  const [isOverlayOpen, setIsOverlayOpen] = useState<boolean>(false); // Overlay 상태 추가
  const [selectedDancers, setSelectedDancers] = useState<Dancer[]>([]); // 선택된 댄서 상태

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
    { id: 10, name: 'K-pop' },
    { id: 11, name: '없음' }
  ];

  const toggleGenre = (genre: Genre) => {
    setSelectedGenres((prev) =>
      prev.some((g) => g.id === genre.id)
        ? prev.filter((g) => g.id !== genre.id)
        : [...prev, genre]
    );
  };

  const addDancer = (user: Dancer) => {
    if (!selectedDancers.some((dancer) => dancer.id === user.id)) {
      setSelectedDancers([...selectedDancers, user]);
    }
    setIsOverlayOpen(false); // 오버레이 닫기
  };

  const removeDancer = (dancerId: number) => {
    setSelectedDancers((prev) => prev.filter((d) => d.id !== dancerId));
  };

  // 검색 필터 함수
  const handleSearch = async () => {
    const normalizedSearch = favoriteDancer.trim().toLowerCase();
    if (normalizedSearch === '') {
      setSearchResults([]); // 검색어가 비어 있으면 빈 배열 설정
      setIsOverlayOpen(false);
      return;
    }
    try {
      const response = await api.get(
        `${process.env.REACT_APP_API_BASE_URL}/search/dancers`,
        {
          params: {
            query: normalizedSearch,
            page: 1, // 기본 페이지 번호
            size: 5 // 기본 사이즈
          }
        }
      );
      console.log('검색 결과:', response.data);
      setSearchResults(response.data.data.results); // 검색 결과 설정
      setIsOverlayOpen(true); // 오버레이 열기
    } catch (error) {
      console.error('검색 API 호출 중 오류:', error);
      setSearchResults([]); // 오류 발생 시 빈 배열
    }
  };

  // Overlay 열기 및 닫기 함수
  const openOverlay = () => {
    setIsOverlayOpen(true);
  };

  const closeOverlay = () => {
    setIsOverlayOpen(false);
  };

  const navigate = useNavigate();

  useEffect(() => {
    // Signup2 데이터 로컬스토리지에서 가져오기
    //const data = JSON.parse(localStorage.getItem('signup2Data'));
    const data = localStorage.getItem('signup2Data');
    if (data) {
      setSignup2Data(JSON.parse(data)); // 상태에 저장
      console.log('Signup2에서 가져온 데이터:', data); // 데이터 출력
    } else {
      console.error('Signup2 데이터가 없습니다. 이전 단계로 이동합니다.');
      navigate('/signup2'); // 데이터가 없으면 이전 단계로 이동
    }
  }, [navigate]);

  const handleNext = async () => {
    const requestBody = {
      ...signup2Data,
      preferredGenres: selectedGenres.map((genre) => genre.id), // Extract genre IDs
      preferredDancers: selectedDancers.map((dancer) => dancer.id) // Extract dancer IDs
    };
    try {
      const response = await api.put(
        `${process.env.REACT_APP_API_BASE_URL}/users`,
        requestBody
      );
      console.log('서버 응답:', response.data);
      console.log('회원 정보 수정 성공:', response.data.data);
      navigate('/signup4'); // 홈으로 이동
    } catch (error) {
      console.error('회원 정보 수정 실패:', error);
      alert('회원 정보 수정에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <Layout>
      <SignupTitle> 회원가입 </SignupTitle>
      <MenuContainer>
        <MenuItemWrapper>
          <MenuItem src={Shape2} />
          <Text2>1&#41; 이용약관 동의</Text2>
        </MenuItemWrapper>

        <MenuItemWrapper>
          <MenuItem src={Shape2} />
          <Text2>2&#41; 회원 정보 입력</Text2>
        </MenuItemWrapper>

        <MenuItemWrapper>
          <MenuItem src={Shape1} />
          <Text1>3&#41; 선호 장르 및 댄서 고르기</Text1>
        </MenuItemWrapper>

        <MenuItemWrapper>
          <MenuItem src={Shape2} />
          <Text2>4&#41; 가입 완료</Text2>
        </MenuItemWrapper>
      </MenuContainer>
      <Form>
        <Section>
          <TitleBox>
            <Title>선호하는 댄스 장르가 무엇인가요?</Title>
            <Select>*최대 5개까지 선택 가능합니다.</Select>
          </TitleBox>
          <ButtonGrid>
            {genres.map((genre) => (
              <GenreButton
                key={genre.id}
                onClick={() => toggleGenre(genre)}
                isSelected={selectedGenres.some((g) => g.id === genre.id)}
              >
                #{genre.name}
              </GenreButton>
            ))}
          </ButtonGrid>
        </Section>

        <Section>
          <Title>선호하는 댄서는 누구인가요?</Title>
          <Search>
            <SearchInput
              type="text"
              placeholder="검색어를 입력하세요"
              value={favoriteDancer}
              onChange={(e) => setFavoriteDancer(e.target.value)}
            />
            <SearchButton onClick={handleSearch}>
              <SearchIcon src={Searchicon} alt="search" />
            </SearchButton>
          </Search>
          {/* 선택된 댄서 표시 */}
          <SelectedDancers>
            {selectedDancers.map((dancer) => (
              <DancerTag key={dancer.id}>
                {dancer.name}
                <RemoveButton onClick={() => removeDancer(dancer.id)}>
                  <Remove src={Close} />
                </RemoveButton>
              </DancerTag>
            ))}
          </SelectedDancers>
        </Section>
      </Form>
      <NextButton onClick={handleNext}>
        <Next>가입 완료</Next>
      </NextButton>
      {isOverlayOpen && (
        <Overlay
          onclose={closeOverlay}
          onSelectUser={addDancer}
          searchResults={searchResults}
        >
          {/* <ResultList>
            {searchResults.map((dancer) => (
              <ResultItem key={dancer.id}>
                <ResultImage src={dancer.image} alt={dancer.name} />
                <DancerName>{dancer.name}</DancerName>
              </ResultItem>
            ))}
          </ResultList> */}
           <div style={{ maxHeight: '200px', overflowY: 'auto', padding: '16px' }}>
      {searchResults.map((dancer) => (
        <ResultItem key={dancer.id}>
          <ResultImage src={dancer.image} alt={dancer.name} />
          <DancerName>{dancer.name}</DancerName>
        </ResultItem>
      ))}
         </div>
        </Overlay>
      )}
    </Layout>
  );
};

export default Signup3;

const Layout = styled.div`
  background-color: black;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 132px;
`;
const SignupTitle = styled.div`
  color: var(--main_white, #fff);
  font-family: Pretendard;
  font-size: 48px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: 15.72px;
  display: flex;
  justify-content: center;
  text-align: center;
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 35px;
`;
const MenuItemWrapper = styled.div`
  width: 320px;
  height: 64px;
  flex-shrink: 0;
  position: relative;
  margin-left: -18px;
`;
const MenuItem = styled.img`
  width: 100%;
  height: 100%;
`;

const Text1 = styled.div`
  position: absolute; /* 부모(MenuItemWrapper)를 기준으로 위치 */
  top: 50%; /* 세로 중앙 정렬 */
  left: 50%; /* 가로 중앙 정렬 */
  transform: translate(-50%, -50%); /* 중앙 정렬을 위한 위치 보정 */
  color: var(--main_white, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const Text2 = styled.div`
  position: absolute; /* 부모(MenuItemWrapper)를 기준으로 위치 */
  top: 50%; /* 세로 중앙 정렬 */
  left: 50%; /* 가로 중앙 정렬 */
  transform: translate(-50%, -50%); /* 중앙 정렬을 위한 위치 보정 */
  color: var(--text_secondary-gray, #b2b2b2);
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const Form = styled.div`
  width: 900px;
  height: 626px;
  flex-shrink: 0;
  border-radius: 25px;
  border: 2px solid var(--main_purple, #9819c3);
  margin-top: 86px;
  display: flex;
  flex-direction: column;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 52px;
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  color: var(--main_white, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-left: 191px;
  display: flex;
`;

const Select = styled.div`
  color: var(--text_secondary-gray, #b2b2b2);
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  margin-left: 20px;
  margin-top: 8px;
`;

const ButtonGrid = styled.div`
  margin-top: 11px;
  margin-left: 193px;
  margin-right: 193px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 17px;
  //align-items : center;
  justify-content: center;
  margin-bottom: 63px;

  /* 마지막 줄의 항목들만 선택 */
  & > button:nth-last-child(-n + 2) {
    justify-self: center; /* 마지막 줄의 버튼들을 중앙으로 정렬 */
    margin-left: 170px;
  }
`;

const GenreButton = styled.button<GenreButtonProps>`
  //padding: 10px;
  width: 160px;
  height: 34px;
  margin-top: 16px;
  border: 1px solid ${({ isSelected }) => (isSelected ? '#9819C3' : '#DDDDDD')};
  background-color: ${({ isSelected }) =>
    isSelected ? '#9819C3' : 'transparent'};
  color: white;
  border-radius: 4px;
  cursor: pointer;
  color: var(--sub_light-gray, #ddd);
  text-align: center;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  &:hover {
    border: 1px solid #9819c3;
    transition: 0.1s;
  }
  align-items: center;
  justify-content: center;
  display: flex;
`;

const Search = styled.div`
  display: flex;
  width: 514px;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  margin-top: 26px;
  margin-left: 193px;
  border-radius: 8px;
  border: 1px solid var(--sub_light-gray, #ddd);
  //padding-left : 38px;
`;
const SearchInput = styled.input`
  width: 100%;
  padding: 38px;
  background: none;
  border: none;
  color: var(--sub_light-gray, #ddd);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  &::placeholder {
    color: #dddddd;
  }

  &:focus {
    border: none;
    outline: none;
  }
`;
const SearchButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 31px;
`;
const SearchIcon = styled.img`
  width: 26px;
  height: 26px;
`;

const NextButton = styled.button`
  width: 300px;
  height: 52px;
  flex-shrink: 0;
  border-radius: 15px;
  background: var(--main_purple, #9819c3);
  margin-top: 70px;
  cursor: pointer;
  margin-bottom: 448px;
`;

const Next = styled.div`
  color: var(--main_white, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const ResultList = styled(Overlay)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #1e1e1e;
  color: #fff;
  border: 1px solid #333;
  border-radius: 4px;
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
`;

const ResultItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #333;
  }
`;

const ResultImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const SelectedDancers = styled.div`
  display: flex;
  gap: 17px;
  flex-wrap: wrap;
  margin-left: 193px;
  margin-top: 35px;
`;

const DancerTag = styled.div`
  display: flex;
  align-items: center;

  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 1px solid var(--sub_light-gray, #ddd);
  height: 34px;
  width: 160px;
  color: var(--sub_light-gray, #ddd);
  text-align: center;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  position: relative;
`;

const RemoveButton = styled.button`
  width: 27px;
  height: 27px;
  flex-shrink: 0;
  margin-left: 10px;
  background: none;
  border: none;
  cursor: pointer;
  color: white;
  position: absolute; /* 부모(DancerTag) 기준으로 배치 */
  top: -15px; /* 이름의 오른쪽 상단에 배치 */
  right: -8px;
`;

const Remove = styled.img``;

const DancerName = styled.div`
  margin-left: 20px;
  flex: 1;
`;
