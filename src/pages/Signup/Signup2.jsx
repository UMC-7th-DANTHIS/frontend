import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import Shape1 from '../../assets/shape/shape1.svg'
import Shape2 from '../../assets/shape/shape2.svg'
import Profileimg from '../../assets/profileimg.svg'
import api from '../../api/api'
import SingleBtnAlert from '../../components/SingleBtnAlert'

const Signup2 = () =>{
  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isNicknameValid, setIsNicknameValid] = useState(null); 
  const [preview, setPreview] = useState(null);
  const [isDefaultImage, setIsDefaultImage] = useState(true); // 기본 이미지 여부 상태
  const [uploadedImage, setUploadedImage] = useState(null); // 업로드된 이미지
  const [errorMessage, setErrorMessage] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [user, setUser] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleNicknameCheck = async () => {
    try {
      const response = await api.get(`/users/check-nickname?nickname=${nickname}`);
      if (response.data.code === 200) {
        if (response.data.data === true) {
          setIsNicknameValid(true); // 사용 가능한 닉네임
          console.log("사용 가능한 닉네임입니다.");
        } else {
          setIsNicknameValid(false); // 중복된 닉네임
          console.log("중복된 닉네임입니다.");
        }
      } else {
        console.error("닉네임 확인 요청 실패:", response.data.message);
        setIsNicknameValid(false); // 기본적으로 유효하지 않다고 설정
      }
    } catch (error) {
      console.error("닉네임 확인 중 오류 발생:", error);
      setIsNicknameValid(false); // 기본적으로 유효하지 않다고 설정
    }
  };
  
  

   // 닉네임 유효성 검사 함수
   const validateNickname = (value) => {
    if (value.length === 0) {
      return "닉네임은 최소 1자 이상 입력해야 합니다.";
    }
    if (value.length > 10) {
      return "닉네임은 최대 10자까지 입력 가능합니다.";
    }
    if (/\s/.test(value)) {
      return "닉네임 사이에는 공백을 입력할 수 없습니다.";
    }
    return ""; // 유효한 닉네임
  };

  const navigate = useNavigate();

    // 닉네임 입력 핸들러
  const handleNicknameChange = (e) => {
  const value = e.target.value;
  setNickname(value); // 입력값 업데이트
  setErrorMessage(validateNickname(value)); // 유효성 검사 결과 업데이트
};

// 전화번호 유효성 검사 함수
const validatePhone = (value) => {
  // 전화번호 형식: 000-0000-0000 (하이픈 포함)
  const phoneRegex = /^\d{3}-\d{4}-\d{4}$/;

  if (!phoneRegex.test(value)) {
    return "적절하지 않은 형식입니다. 전화번호 및 형식을 다시 확인해주세요.";
  }
  return ""; // 유효한 경우 빈 문자열 반환
};

const handlePhoneChange = (e) => {
  let value = e.target.value;

  // 숫자만 남기기
  const onlyNumbers = value.replace(/\D/g, ""); 

  // 하이픈 자동 삽입 (000-0000-0000 형식)
  if (onlyNumbers.length <= 3) {
    value = onlyNumbers;
  } else if (onlyNumbers.length <= 7) {
    value = `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(3)}`;
  } else {
    value = `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(3, 7)}-${onlyNumbers.slice(7, 11)}`;
  }

  setPhoneNumber(value); // 입력값 업데이트
  console.log("현재 입력된 전화번호:", value); // 값이 정상적으로 들어가는지 확인
  setPhoneError(validatePhone(value)); // 유효성 검사 결과 업데이트
};


  const handleNext = () => {
     // 닉네임 유효성 검사
  if (!nickname) {
    setShowAlert(true);
    console.log("닉네임이 입력되지 않았습니다.");
    return;
  }
  if (!isNicknameValid) {
    setShowAlert(true);
    console.log("닉네임 중복 확인이 완료되지 않았거나 실패했습니다.");
    return;
  }

  // 성별 유효성 검사
  if (!gender) {
    setShowAlert(true);
    console.log("성별이 선택되지 않았습니다.");
    return;
  }

  // 전화번호 유효성 검사
  if (!phoneNumber || phoneError) {
    setShowAlert(true);
    console.log("전화번호가 입력되지 않았습니다.");
    return;
  }

  // 프로필 사진 검사 (기본 이미지 또는 업로드된 이미지가 있어야 함)
  if (!isDefaultImage && !uploadedImage) {
    setShowAlert(true);
    console.log("프로필 사진이 설정되지 않았습니다.");
    return;
  }

   // 2단계 데이터 로컬 저장
   const signup2Data = {
    nickname,
    gender,
    phoneNumber,
    profileImage: isDefaultImage ? 'https://example.com/default-profile.jpg' : uploadedImage,
  };

  localStorage.setItem('signup2Data', JSON.stringify(signup2Data)); // 로컬 저장
  console.log(signup2Data);
  navigate('/signup3'); // 다음 단계로 이동
};
   

  //  // 파일 업로드 처리
  //  const handleFileUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setUploadedImage(reader.result); // 업로드된 이미지 설정
  //       setIsDefaultImage(false); // 기본 이미지 사용 해제
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    // if (!file || !file.type.startsWith('image/')) return;
  
    try {
      console.log("📡 Presigned URL 요청 시작...");
      // 1️⃣ Presigned URL 요청
      const fileExtension = file.name.split('.').pop(); // 파일 확장자 추출
      const response = await api.post(`/image/user?fileExtension=${fileExtension}`);
      console.log("📡 Presigned URL API 응답:", response);
      if (!response.data || !response.data.presignedUrl) {
        throw new Error('Presigned URL 발급 실패');
      }

  
      const { presignedUrl, fileUrl } = response.data; // URL 정보 가져오기
      console.log('발급된 url', presignedUrl);
  
      // 2️⃣ S3에 이미지 업로드
      const uploadResponse = await fetch(presignedUrl, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': file.type }, // 파일 타입 설정
      });
  
      if (!uploadResponse.ok) {
        throw new Error(`업로드 실패: ${uploadResponse.status}`);
      }
  
      // 3️⃣ 최종적으로 업로드된 이미지 URL을 상태에 저장
      setUploadedImage(fileUrl); // 프로필 사진 상태 업데이트
      setIsDefaultImage(false); // 기본 이미지 비활성화
      console.log('✅ 이미지 업로드 성공:', fileUrl);
  
    } catch (error) {
      console.error('❌ 파일 업로드 오류:', error.message);
    }
  };
  
  const handleCheckboxChange = () => {
    setIsDefaultImage(true); // 기본 이미지 사용 설정
    setUploadedImage(null); // 업로드된 이미지 초기화
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/users/me"); // API 요청 (토큰 자동 포함)
        console.log("유저 정보:", response.data);
        setUser(response.data.data);
        //setNickname(response.data.data.nickname || ""); // 닉네임 값 설정
        setEmail(response.data.data.email  || "");
      } catch (error) {
        console.error("유저 정보를 불러오는 중 오류 발생:", error);
      }
    };

    fetchUser();
  }, []);

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
                onChange={handleNicknameChange} />
                <Button onClick={handleNicknameCheck}>중복확인</Button>
                </InputWrapper>
                {isNicknameValid === true && <ValidMessage>사용 가능한 닉네임입니다.</ValidMessage>}
                {isNicknameValid === false && <ErrorMessage>다른 유저와 중복되는 닉네임입니다.</ErrorMessage>}
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </Field>

        <Field>
          <Gender>
          <Label>성별</Label>
          <RadioGroup>
          <RadioLabel>
          <LabelText>남</LabelText>
        <RadioInput type="radio" name="gender" value="남" onChange={(e) => setGender(e.target.value)} />
        <CustomCircle />
      </RadioLabel>
      <RadioLabel>
      <LabelText>여</LabelText>
        <RadioInput type="radio" name="gender" value="여" onChange={(e) => setGender(e.target.value)} />
        <CustomCircle />
      </RadioLabel>
          </RadioGroup>
          </Gender>
        </Field>

        <Field>
          <Label>이메일</Label>
          <InputBox>
          <Email>{email}</Email>
          </InputBox>
        </Field>

        <Field>
          <Label>전화번호</Label>
          <Message>전화번호는 000-0000-0000 형식이어야 합니다.</Message>
          <InputBox>
          <Input2
            type="tel"
            placeholder="전화번호를 입력하세요."
            value={phoneNumber}
            onChange={handlePhoneChange}
          />
          </InputBox>
          {phoneError && <ErrorMessage1>{phoneError}</ErrorMessage1>}
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
        <RadioInput type="checkbox" name="profile" value="기본이미지 사용하기" checked={isDefaultImage} onChange ={handleCheckboxChange} />
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
      {showAlert && (
        <SingleBtnAlert
          onClose={() => setShowAlert(false)}
          message={
            <span>
              <span>모든 항목을 <br /></span>
              <span><ColoredText>적절하게  </ColoredText></span>
              <span>입력했는지 확인해주세요.<br /></span>
            </span>
          }
          mariginsize="25px"
          ContainerWidth="280px"
          ContainerHeight="108px"
          marginsize="24px"
          AlertWidth="392px"
          AlertHeight="260px"
          showButtons={true}
          confirmLabel="확인"
          
        />
      )}
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
margin-bottom : 10px;
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
const Email = styled.div`
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
display : flex;
text-align : leftjustify-content: center;
align-items: center;
flex-shrink: 0;
border-radius: 8px;
border: 1px solid var(--sub_light-gray, #DDD);
margin-top : 10px;
padding-left : 20px;
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
cursor : pointer;
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
text-align : right;
margin-right :215px;

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
margin-right :215px;
text-align : right;
`;

const ErrorMessage1 = styled.div`
  color: var(--highlight_red, #F00);
text-align: center;
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: normal;
margin-top : 10px;
margin-right :130px;
text-align : right;
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
  width: 24px;
  height: 24px;
  border: 2px solid #A60F62; /* 외곽선 색상 */
  background : white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
  position: relative;
  top: 50%; /* 부모의 50% */
  left: 50%; /* 부모의 50% */
  transform: translate(-50%, -50%); /* 중심으로 이동 */
  ${RadioInput}:checked + & {
     background-color:white; /* 선택된 경우 내부 색상 변경 */
  }

  ${RadioInput}:checked + &::after {
    content: "";
    width: 16.8px;
    height: 16.8px;
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
    width: 14px;
    height: 14px;
    background-color: #A60F62; /* 선택된 상태의 중앙 원 */
    border-radius: 50%;
    position: absolute;
  }

   
`;

const Message = styled.div`
color: #FFF;
text-align: right;
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: normal;
margin-right : 130px;
margin-top : -15px;
`
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
  gap: 45px;
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

const ColoredText = styled.span`
  color: #A60F62;
`