import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Shape1 from '../../assets/shape/shape1.svg';
import Shape2 from '../../assets/shape/shape2.svg';
import Searchicon from '../../assets/searchicon.svg';
import Overlay from '../../common/Signup/Overlay';
import Close from '../../assets/buttons/close.svg';
import api from '../../api/api';
import type {DancerType} from "../../common/Signup/Overlay"
import { Signup2Data } from '@/types/Signup/useUser';
import { Genre, GenreButtonProps } from '@/types/Signup/useGenre';
import StepperMobile from '../../common/Signup/StepperMobile';

const Signup3 = () => {
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
  const [signup2Data, setSignup2Data] = useState<Signup2Data | null>(null); // Signup2에서 가져온 데이터 상태
  const [favoriteDancer, setFavoriteDancer] = useState<string>('');
  const [searchResults, setSearchResults] = useState<DancerType[]>([]);
  const [isOverlayOpen, setIsOverlayOpen] = useState<boolean>(false); // Overlay 상태 추가
  const [selectedDancers, setSelectedDancers] = useState<DancerType[]>([]); // 선택된 댄서 상태

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

  const addDancer = (user: DancerType) => {
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
  // const openOverlay = () => {
  //   setIsOverlayOpen(true);
  // };

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
      <Stepper>
        <StepperDesktop>
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
      </StepperDesktop>
           <StepperMobile
        currentStep={3}
        steps={[
          "이용약관 동의",
          "회원 정보 입력",
          "선호 장르 및 댄서 고르기",
          "가입 완료",
        ]}
      />
      </Stepper>
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
        <Next>다음으로</Next>
      </NextButton>
      {isOverlayOpen && (
        <Overlay
          onclose={closeOverlay}
          onSelectUser={addDancer}
          searchResults={searchResults}
        >
          <div
            style={{ maxHeight: '200px', overflowY: 'auto', padding: '16px' }}
          >
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
  padding-bottom: 205px;
  ${({ theme }) => theme.media.tablet} {
   padding-bottom: 451px;
  }
`;
const SignupTitle = styled.div`
  color: var(--main_white, #fff);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  display: flex;
  justify-content: center;
  text-align: center;
   ${({ theme }) => theme.media.tablet} {
   font-size: 32px;
   margin-top: 17px;
  }
`;

const Stepper = styled.div`
  display: flex;
  margin-top: 30px;
`
const StepperDesktop = styled.div`
  display: none;
  ${({ theme }) => theme.media.tablet} {
    display: flex;
    flex-direction: row;
  }
  `

const MenuItemWrapper = styled.div`
  width: 260px;
  /* height: 64px; */
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
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  width: 196px;
`;
const Text2 = styled.div`
  position: absolute; /* 부모(MenuItemWrapper)를 기준으로 위치 */
  top: 50%; /* 세로 중앙 정렬 */
  left: 50%; /* 가로 중앙 정렬 */
  transform: translate(-50%, -50%); /* 중앙 정렬을 위한 위치 보정 */
  color: var(--text_secondary-gray, #b2b2b2);
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: 196px;
`;

const Form = styled.div`
  border: none;
  width: 90%;
  flex-shrink: 0;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${({ theme }) => theme.media.tablet} {
  border: 2px solid var(--main_purple, #9819c3);
  width: 900px;
  height: 562px;
  margin-top: 100px;
  }
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 58px;
  ${({ theme }) => theme.media.tablet} {
  flex-direction: row;
  }
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  width: 325px;
  ${({ theme }) => theme.media.tablet} {
  width: 520px;
  }
`;

const Title = styled.div`
  color: var(--main_white, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  //margin-left: 191px;
  display: flex;
   ${({ theme }) => theme.media.tablet} {
  font-size: 22px;
  }
`;

const Select = styled.div`
  color: var(--text_secondary-gray, #b2b2b2);
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  margin-top: 8px;
  ${({ theme }) => theme.media.tablet} {
  margin-left: 20px;
  }
`;

const ButtonGrid = styled.div`
  margin-top: 11px;
  display: grid;
  //grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 17px;
  grid-template-columns: repeat(3, 100px);
  align-items : center;
  justify-content: center;
  margin-bottom: 89px;
  width: 325px;
  /* 마지막 줄의 항목들만 선택 */
  & > button:nth-last-child(-n + 2) {
    justify-self: center; /* 마지막 줄의 버튼들을 중앙으로 정렬 */
    margin-left: 120px;
  }
  ${({ theme }) => theme.media.tablet} {
  margin-bottom: 63px;
  grid-template-columns: repeat(3, 160px);
  width: 514px;
  & > button:nth-last-child(-n + 2) {
    justify-self: center; /* 마지막 줄의 버튼들을 중앙으로 정렬 */
    margin-left: 170px;
  }
  }
`;

const GenreButton = styled.button<GenreButtonProps>`
  width: 100px;
  height: 30px;
  margin-top: 16px;
  border: 1px solid ${({ isSelected }) => (isSelected ? '#9819C3' : '#DDDDDD')};
  background-color: ${({ isSelected }) => isSelected ? '#9819C3' : 'transparent'};
  color: white;
  border-radius: 4px;
  cursor: pointer;
  color: var(--sub_light-gray, #ddd);
  text-align: center;
  font-size: 12px;
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
  ${({ theme }) => theme.media.tablet} {
  width: 160px;
  height: 34px;
  font-size: 15px;
  }
`;

const Search = styled.div`
  display: flex;
  width: 320px;
  height: 40px;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  margin-top: 26px;
  //margin-left: 193px;
  border-radius: 8px;
  border: 1px solid var(--sub_light-gray, #ddd);
  //padding-left : 38px;
  ${({ theme }) => theme.media.tablet} {
  width: 514px;
  height: 60px;
  }
`;
const SearchInput = styled.input`
  width: 100%;
  padding: 30px;
  background: none;
  border: none;
  color: var(--sub_light-gray, #ddd);
  font-family: Pretendard;
  font-size: 12px;
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
  ${({ theme }) => theme.media.tablet} {
  font-size: 18px;
  padding: 38px;
  }
`;
const SearchButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 31px;
`;
const SearchIcon = styled.img`
  width: 18px;
  height: 18px;
  ${({ theme }) => theme.media.tablet} {
  width: 26px;
  height: 26px;
  }
`;

const NextButton = styled.button`
  width: 300px;
  height: 44px;
  flex-shrink: 0;
  border-radius: 15px;
  background: var(--main_purple, #9819c3);
  margin-top: 70px;
  cursor: pointer;
  ${({ theme }) => theme.media.tablet} {
  height: 52px;
  }
`;

const Next = styled.div`
  color: var(--main_white, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  {({ theme }) => theme.media.tablet} {
  font-size: 20px;
  }
`;

// const ResultList = styled(Overlay)`
//   position: absolute;
//   top: 100%;
//   left: 0;
//   right: 0;
//   background-color: #1e1e1e;
//   color: #fff;
//   border: 1px solid #333;
//   border-radius: 4px;
//   z-index: 10;
//   max-height: 200px;
//   overflow-y: auto;
// `;

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
  gap: 21px;
  flex-wrap: wrap;
  //margin-left: 193px;
  margin-top: 35px;
  {({ theme }) => theme.media.tablet} {
  gap: 17px;
  }
`;

const DancerTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 1px solid var(--sub_light-gray, #ddd);
  height: 30px;
  width: 90px;
  color: var(--sub_light-gray, #ddd);
  text-align: center;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  position: relative;
  {({ theme }) => theme.media.tablet} {
  height: 34px;
  width: 160px;
  font-size: 15px;
  }
`;

const RemoveButton = styled.button`
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  margin-left: 10px;
  background: none;
  border: none;
  cursor: pointer;
  color: white;
  position: absolute; /* 부모(DancerTag) 기준으로 배치 */
  top: -15px; /* 이름의 오른쪽 상단에 배치 */
  right: -8px;
  {({ theme }) => theme.media.tablet} {
  height: 27px;
  width: 27px;
  }
`;

const Remove = styled.img``;

const DancerName = styled.div`
  margin-left: 20px;
  flex: 1;
`;