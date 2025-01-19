import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import Shape1 from '../../assets/shape/shape1.svg'
import Shape2 from '../../assets/shape/shape2.svg'



const Signup1 = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/signup2"); // "/next" 경로로 이동
  };

  const agreements = [
    { id: 1, title: "이용약관 전체 동의", required: false },
    { id: 2, title: "서비스 이용약관 동의", required: true },
    { id: 3, title: "개인정보 처리방침 동의", required: true },
  ];
  return (
    <Layout>
      <SignupTitle> 회원가입 </SignupTitle>
      <MenuContainer>
        <MenuItemWrapper>
        <MenuItem src={Shape1} />
        <Text1>1&#41; 이용약관 동의</Text1>
        </MenuItemWrapper>

        <MenuItemWrapper>
        <MenuItem src={Shape2} />
        <Text2>2&#41; 회원 정보 입력</Text2>
        </MenuItemWrapper>

        <MenuItemWrapper>
        <MenuItem src={Shape2} />
        <Text2>3&#41; 선호 장르 및 댄서 고르기</Text2>
        </MenuItemWrapper>

        <MenuItemWrapper>
        <MenuItem src={Shape2} />
        <Text2>4&#41; 가입 완료</Text2>
        </MenuItemWrapper>

      </MenuContainer>
      <CheckForm>
       {agreements.map((item, index) => (
        <>
          <AgreementItem key={item.id}>
            <TextContainer>
              <Title>
                {item.title} {item.required && <RequiredTag>(필수)</RequiredTag>}
              </Title>
              {index !== 0 && <Detail>자세히 보기 &gt;</Detail>}
            </TextContainer>
            <CheckboxWrapper>
              <Checkbox id={`checkbox-${item.id}`} type="checkbox" />
              <CustomCircle htmlFor={`checkbox-${item.id}`} />
            </CheckboxWrapper>
          </AgreementItem>
           {index < agreements.length - 1 && <Line />}
           </>
        ))}
      </CheckForm>
      <NextButton onClick = {handleNext}>
        <Next>다음으로</Next>
      </NextButton>
    </Layout>
  )
}

export default Signup1;

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
const CheckForm = styled.div`
width: 1000px;
height: 364px;
flex-shrink: 0;
border-radius: 25px;
border: 2px solid var(--main_purple, #9819C3);
margin-top : 47px;
`
const AgreementItem = styled.div`
  display: flex;
  justify-content: space-between; /* 텍스트와 체크박스를 양 끝으로 */
  align-items: center;
  padding-left : 323px;
  padding-right : 340px;
  padding-top : 36px;
  padding-bottom : 30px;
  //border-bottom: 1px solid #4D4D4D;

 
  /* &:last-child {
    border-bottom: none;
  } */
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column; /* 제목과 자세히 보기를 세로로 정렬 */
  margin-top : 10px;
`;

const Title = styled.div`
  color: var(--main_white, #FFF);
text-align: center;
font-family: Pretendard;
font-size: 20px;
font-style: normal;
font-weight: 600;
line-height: normal;
`;

const Detail = styled.div`
  color: var(--text_gray, #4D4D4D);
//text-align: center;
margin-top : 8px;
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: normal;


`;


const RequiredTag = styled.span`
  color: var(--main_white, #FFF);
text-align: center;
font-family: Pretendard;
font-size: 20px;
font-style: normal;
font-weight: 600;
line-height: normal;
margin-left : 5px;
`;

const Line = styled.div`
  
  height: 1px;
  
  margin: 0 auto; /* 중앙 정렬 */
  background-color: #DDD; /* 두 번째 항목만 다른 배경색 */
  width : 352px;
  &:nth-of-type(2) {
    background-color: #4D4D4D;
    width:  436px;; /* 선 길이 */
  }
`;
const CheckboxWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Checkbox = styled.input`
  position: absolute;
  opacity: 0; /* 기본 체크박스 숨기기 */
  z-index: -1;
`;

const CustomCircle = styled.label`
  width: 24px;
  height: 24px;
  border: 2px solid #A60F62;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:after {
    content: "";
    width: 24px;
    height: 24px;
    background-color: #A60F62;
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  /* 체크박스가 체크되었을 때 */
  input:checked + &::after {
    opacity: 1;
  }
`;

const NextButton = styled.button`
width: 300px;
height: 52px;
flex-shrink: 0;
border-radius: 15px;
background: var(--main_purple, #9819C3);
margin-top : 30px;
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