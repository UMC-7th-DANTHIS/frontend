import React, {useState} from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import Shape1 from '../../assets/shape/shape1.svg'
import Shape2 from '../../assets/shape/shape2.svg'
import Profileimg from '../../assets/profileimg.svg'

const Signup2 = () =>{
  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isNicknameValid, setIsNicknameValid] = useState(null); 
  const [preview, setPreview] = useState(null);
  const [isDefaultImage, setIsDefaultImage] = useState(false); // 기본 이미지 여부 상태
  const [uploadedImage, setUploadedImage] = useState(null); // 업로드된 이미지


  const handleNicknameCheck = () => {
    // 닉네임 중복 확인 로직 (예: 서버 요청)
    if (nickname === "사용가능") {
      setIsNicknameValid(true);
    } else {
      setIsNicknameValid(false);
    }
  };

  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/signup3"); // "/next" 경로로 이동
  };

  const handleGenderChange = (e) => setGender(e.target.value);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result); // 업로드된 이미지 설정
        setIsDefaultImage(false); // 기본 이미지를 해제
      };
      reader.readAsDataURL(file);
    }
  };

   const handleCheckboxChange = (event) => {
    setIsDefaultImage(event.target.checked); // 체크박스 상태 업데이트
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
        <MenuItem src={Shape1} />
        <Text1>2&#41; 회원 정보 입력</Text1>
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
      <DataForm>
        <Field>
            <Label>닉네임</Label>
            <InputWrapper>
              <Input 
                type="text"
                placeholder = "닉네임을 입력하세요."
                value = {nickname}
                onChange={(e) => setNickname(e.target.value)} />
                <Button onClick={handleNicknameCheck}>중복확인</Button>
                </InputWrapper>
                {isNicknameValid === true && <ValidMessage>사용 가능한 닉네임입니다.</ValidMessage>}
                {isNicknameValid === false && <ErrorMessage>다른 유저와 중복되는 닉네임입니다.</ErrorMessage>}
        </Field>

        <Field>
          <Gender>
          <Label>성별</Label>
          <RadioGroup>
          <RadioLabel>
          <LabelText>남</LabelText>
        <RadioInput type="radio" name="gender" value="남" />
        <CustomCircle />
        
       
      </RadioLabel>

      <RadioLabel>
      <LabelText>여</LabelText>
        <RadioInput type="radio" name="gender" value="여" />
        <CustomCircle />
      </RadioLabel>
          </RadioGroup>
          </Gender>
        </Field>

        <Field>
          <Label>이메일</Label>
          <InputBox>
          <Input2
            type="email"
            placeholder="이메일을 입력하세요."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          </InputBox>
        </Field>

        <Field>
          <Label>전화번호</Label>
          <InputBox>
          <Input2
            type="tel"
            placeholder="전화번호를 입력하세요."
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          </InputBox>
        </Field>

        <Field>
          <Label>프로필 사진</Label>
          <ProfileContainer>
       <ProfileImageWrapper>
         {/* 업로드한 이미지 미리보기 */}
         {isDefaultImage || !uploadedImage ? (
           <ProfileImage src={Profileimg} alt="프로필 이미지" />
         ) : (
     
      <ProfileImage src={uploadedImage} alt="프로필 이미지" />
         )}
    </ProfileImageWrapper>
    <UploadContainer>
    <HiddenInput type="file" id="file-upload" accept="image/*" onChange={handleFileUpload} />
      <UploadButton htmlFor="file-upload">파일 업로드</UploadButton>
  
      <RadioWrapper>
      <RadioLabel>
        <RadioInput type="checkbox" name="profile" value="기본이미지 사용하기" onchange ={handleCheckboxChange} />
        <CustomCircle1 />
        <LabelText1>기본 이미지 사용하기</LabelText1>
      </RadioLabel>
      </RadioWrapper>
    </UploadContainer>
  </ProfileContainer>
        </Field>

      </DataForm>
      <NextButton onClick = {handleNext}>
        <Next>다음으로</Next>
      </NextButton>
    </Layout>
  )
}
export default Signup2;

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

const DataForm = styled.div`
width: 900px;
height: 900px;
flex-shrink: 0;
border-radius: 25px;
border: 2px solid var(--main_purple, #9819C3);
margin-top : 62px;
display : flex;
flex-direction : column;

`
const Field=styled.div`
margin-top : 46px;
margin-left: 161px;
/* display : flex;
flex-direction : column; */
`
const Gender = styled.div`
display : flex;
flex-direction : row;
padding-top : 20px;
padding-bottom : 20px;
`

const Label = styled.label`
color: var(--main_white, #FFF);
text-align: center;
font-family: Pretendard;
font-size: 22px;
font-style: normal;
font-weight: 600;
line-height: normal;
margin-left : 8px;
margin-right : 157px;
`
const InputBox = styled.div`
`
const Input = styled.input`
background : none;
color : white;
border : none;
  color: var(--sub_light-gray, #DDD);
font-family: Pretendard;
font-size: 20px;
font-style: normal;
font-weight: 500;
line-height: normal;
width: 501px;
height: 60px;
justify-content: center;
align-items: center;
flex-shrink: 0;
border-radius: 8px;
border: 1px solid var(--sub_light-gray, #DDD);
margin-top : 10px;
padding-left : 20px;
`
const Input2 = styled.input`
color : white;
border : none;
background : none;
  color: var(--sub_light-gray, #DDD);
font-family: Pretendard;
font-size: 20px;
font-style: normal;
font-weight: 500;
line-height: normal;
width: 588px;
height: 60px;
justify-content: center;
align-items: center;
flex-shrink: 0;
border-radius: 8px;
border: 1px solid var(--sub_light-gray, #DDD);
margin-top : 10px;
padding-left : 20px;
`
const InputWrapper = styled.div`
display: flex;

`

const Button = styled.button`
display: flex;
width: 72px;
height : 65px;
//padding: 20px 8px;
justify-content: center;
align-items: center;
//gap: 8px;
border-radius: 8px;
background: var(--sub_light-gray, #DDD);
color: var(--main_purple, #9819C3);
text-align: center;
font-family: Pretendard;
font-size: 15px;
font-style: normal;
font-weight: 600;
line-height: normal;
margin-top : 10px;
margin-left : 21px;
`

const ValidMessage = styled.div`
  color: var(--highlight_green, #00DD0B);
text-align: center;
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: normal;
margin-top : 10px;

`;

const ErrorMessage = styled.div`
  color: var(--highlight_red, #F00);
text-align: center;
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: normal;
margin-top : 10px;

`;
const RadioWrapper = styled.div`
  display: flex;
  align-items: center;
 margin-top : 10px;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 88px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color : white;
`;

const RadioInput = styled.input`
  display: none; /* 기본 라디오 버튼 숨기기 */
  
`;

const CustomCircle = styled.span`
  width: 20px;
  height: 20px;
  border: 2px solid #A60F62; /* 외곽선 색상 */
  background : white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
  position: relative;
  margin-left : 13px;
  ${RadioInput}:checked + & {
     background-color:white; /* 선택된 경우 내부 색상 변경 */
  }

  ${RadioInput}:checked + &::after {
    content: "";
    width: 12px;
    height: 12px;
    background-color: #A60F62; /* 선택된 상태의 중앙 원 */
    border-radius: 50%;
    position: absolute;
  }

  /* 초기 상태로 돌아가기 */
  ${RadioInput}:not(:checked) + & {
    background-color: white;
  }

  ${RadioInput}:not(:checked) + &::after {
    content: none; /* 선택 해제 시 중앙 원 제거 */
  }
`;
const CustomCircle1 = styled.span`
  width: 20px;
  height: 20px;
  border: 2px solid #A60F62; /* 외곽선 색상 */
  background : white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
  position: relative;
  ${RadioInput}:checked + & {
    background-color:white; /* 선택된 경우 내부 색상 변경 */
  }

  ${RadioInput}:checked + &::after {
    content: "";
    width: 12px;
    height: 12px;
    background-color: #A60F62; /* 선택된 상태의 중앙 원 */
    border-radius: 50%;
    position: absolute;
  }

   
`;

const LabelText = styled.span`
  color: var(--main_white, #FFF);
text-align: center;
font-family: Pretendard;
font-size: 20px;
font-style: normal;
font-weight: 500;
line-height: normal;
`;

const LabelText1 = styled.div`
  color: var(--main_white, #FFF);
text-align: center;
font-family: Pretendard;
font-size: 18px;
font-style: normal;
font-weight: 500;
line-height: normal;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top : 10px;
`;

const ProfileImageWrapper = styled.div`
  width: 160px;
  height: 160px;
  //border: 1px solid #666;
  border-radius: 5px;
  overflow: hidden;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px;

color: var(--sub_light-gray, #DDD);
text-align: center;
font-family: Pretendard;
font-size: 15px;
font-style: normal;
font-weight: 500;
line-height: normal;
`;

const UploadButton = styled.label`
   width: 300px;
height: 36px;
flex-shrink: 0;
  background-color: transparent;
  color: white;
  border: 1px solid #666;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  justify-content: center;
  align-items : center;
  display : flex;


`;

const HiddenInput = styled.input`
  display: none;
  color : white;
`;


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