import React, {useState} from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import Shape1 from '../../assets/shape/shape1.svg'
import Shape2 from '../../assets/shape/shape2.svg'
import Logoimg from '../../assets/logo.svg'
const Signup3 = () => {
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [favoriteDancer, setFavoriteDancer] = useState("");
    const [selectedRecommendedDancers, setSelectedRecommendedDancers] = useState([]);
  
    const genres = ["힙합", "걸스힙합", "팝핑", "락킹", "왁킹", "걸리시/힐", "크럼프", "텃팅", "코레오", "K-pop", "없음"];
    const recommendedDancers = ["써니", "에이버리", "누누", "제이시", "우니", "없음"];
    
    const toggleGenre = (genre) => {
        setSelectedGenres((prev) =>
          prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
        );
      };
    
      const toggleRecommendedDancer = (dancer) => {
        setSelectedRecommendedDancers((prev) =>
          prev.includes(dancer) ? prev.filter((d) => d !== dancer) : [...prev, dancer]
        );
      };

       const navigate = useNavigate();
      const handleNext = () => {
        navigate("/signup4"); // "/next" 경로로 이동
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
    <Title>선호하는 댄스 장르가 무엇인가요?</Title>
    <ButtonGrid>
    {genres.map((genre) => (
            <GenreButton
              key={genre}
              onClick={() => toggleGenre(genre)}
              isSelected={selectedGenres.includes(genre)}
            >
              #{genre}
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
        </Search>
      </Section>

      <Section>
        <TitleContainer>
        <Logo src={Logoimg} />
        <Title1>가 추천하는 댄서</Title1>
        </TitleContainer>
        <ButtonGrid>
          {recommendedDancers.map((dancer) => (
            <RecommendedDancerButton
              key={dancer}
              onClick={() => toggleRecommendedDancer(dancer)}
              isSelected={selectedRecommendedDancers.includes(dancer)}
            >
              #{dancer}
            </RecommendedDancerButton>
          ))}
        </ButtonGrid>
      </Section>
  </Form>
  <NextButton onClick = {handleNext}>
        <Next>가입 완료</Next>
      </NextButton>
  </Layout>
  )
}

export default Signup3;


const Layout = styled.div`
background-color : black;
display : flex;
align-items : center;
flex-direction : column;
padding-bottom : 132px;
`
const SignupTitle = styled.div`
color: var(--main_white, #FFF);
font-family: Pretendard;
font-size: 48px;
font-style: normal;
font-weight: 600;
line-height: normal;
margin-top : 15.72px;
display : flex;
justify-content : center;
text-align : center;
`

const MenuContainer = styled.div`
display : flex;
flex-direction : row;
margin-top : 35px;

`
const MenuItemWrapper = styled.div`
width: 320px;
height: 64px;
flex-shrink: 0;
position : relative;
margin-left : -18px;

`
const MenuItem = styled.img`
  width: 100%;
  height: 100%;
`

const Text1=styled.div`
 position: absolute; /* 부모(MenuItemWrapper)를 기준으로 위치 */
  top: 50%; /* 세로 중앙 정렬 */
  left: 50%; /* 가로 중앙 정렬 */
  transform: translate(-50%, -50%); /* 중앙 정렬을 위한 위치 보정 */
color: var(--main_white, #FFF);
text-align: center;
font-family: Pretendard;
font-size: 22px;
font-style: normal;
font-weight: 600;
line-height: normal;
`
const Text2 = styled.div`
 position: absolute; /* 부모(MenuItemWrapper)를 기준으로 위치 */
  top: 50%; /* 세로 중앙 정렬 */
  left: 50%; /* 가로 중앙 정렬 */
  transform: translate(-50%, -50%); /* 중앙 정렬을 위한 위치 보정 */
color: var(--text_secondary-gray, #B2B2B2);
text-align: center;
font-family: Pretendard;
font-size: 18px;
font-style: normal;
font-weight: 500;
line-height: normal;
`

const Form = styled.div`
width: 900px;
height: 780px;
flex-shrink: 0;
border-radius: 25px;
border: 2px solid var(--main_purple, #9819C3);
margin-top : 86px;
display : flex;
flex-direction : column;

`
const Section = styled.div`
`

const Title = styled.div`
color: var(--main_white, #FFF);
text-align: center;
font-family: Pretendard;
font-size: 22px;
font-style: normal;
font-weight: 600;
line-height: normal;
margin-top : 52px;
margin-bottom : -20px;
margin-left : 191px;
display : flex;
`
const Title1 = styled.div`
color: var(--main_white, #FFF);
text-align: center;
font-family: Pretendard;
font-size: 22px;
font-style: normal;
font-weight: 600;
line-height: normal;
margin-bottom : -20px;
`

const ButtonGrid = styled.div`
  margin-top : 28px;
  padding-left : 193px;
  padding-right : 193px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 10px;
  align-items : center;
  justify-content : center;

`;

const GenreButton = styled.button`
  //padding: 10px;
  width : 160px;
  height : 34px;
  margin-top : 23px;
  border: 1px solid ${({ isSelected }) => (isSelected ? "#a020f0" : "#666")};
  background-color: ${({ isSelected }) => (isSelected ? "#a020f0" : "transparent")};
  color: white;
  border-radius: 4px;
  cursor: pointer;
  color: var(--sub_light-gray, #DDD);
text-align: center;
font-family: Pretendard;
font-size: 15px;
font-style: normal;
font-weight: 500;
line-height: normal;
  &:hover {
    background-color: #7e14c4;
  }
  align-items : center;
  justify-content : center;
  display : flex;
`;

const RecommendedDancerButton = styled(GenreButton)``;

const Search = styled.div`
display: flex;
width: 514px;
height: 60px;
justify-content: center;
align-items: center;
flex-shrink: 0;
margin-top : 26px;
padding-left : 193px;

`
const SearchInput = styled.input`
  
  width: 100%;
  padding: 10px;
  border: 1px solid #666;
  border-radius: 4px;
  background-color: #222;
  color: white;

  &::placeholder {
    color: #666;
  }

  &:focus {
    border : none;
   
  }
`;

const TitleContainer=styled.div`
display : flex;
flex-direction : row;
margin-top : 52px;
margin-bottom : -20px;
margin-left : 191px;
`

const Logo = styled.img`
width: 92.96px;
height: 23.88px;
flex-shrink: 0;

`

const NextButton = styled.button`
width: 300px;
height: 52px;
flex-shrink: 0;
border-radius: 15px;
background: var(--main_purple, #9819C3);
margin-top : 70px;
cursor : pointer;
`

const Next = styled.div`
color: var(--main_white, #FFF);
text-align: center;
font-family: Pretendard;
font-size: 20px;
font-style: normal;
font-weight: 600;
line-height: normal;`