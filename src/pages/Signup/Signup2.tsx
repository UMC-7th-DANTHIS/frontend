import { useState, useEffect, ChangeEvent } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Shape1 from '../../assets/shape/shape1.svg';
import Shape2 from '../../assets/shape/shape2.svg';
import Profileimg from '../../assets/profileimg.svg';
import api from '../../api/api';
import SingleBtnAlert from '../../components/SingleBtnAlert';
import { UserType } from '@/types/Signup/useUser';
import StepperMobile from '../../common/Signup/StepperMobile';

const Signup2 = () => {
  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isNicknameValid, setIsNicknameValid] = useState<boolean | null>(null);
  const [isDefaultImage, setIsDefaultImage] = useState(true); // 기본 이미지 여부 상태
  const [uploadedImage, setUploadedImage] = useState<string | null>(null); // 업로드된 이미지
  const [errorMessage, setErrorMessage] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [, setUser] = useState<UserType | null>(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleNicknameCheck = async () => {
    try {
      const response = await api.get(
        `/users/check-nickname?nickname=${nickname}`
      );
      if (response.data.code === 200) {
        if (response.data.data === true) {
          setIsNicknameValid(true); // 사용 가능한 닉네임
          console.log('사용 가능한 닉네임입니다.');
        } else {
          setIsNicknameValid(false); // 중복된 닉네임
          console.log('중복된 닉네임입니다.');
        }
      } else {
        console.error('닉네임 확인 요청 실패:', response.data.message);
        setIsNicknameValid(false); // 기본적으로 유효하지 않다고 설정
      }
    } catch (error) {
      console.error('닉네임 확인 중 오류 발생:', error);
      setIsNicknameValid(false); // 기본적으로 유효하지 않다고 설정
    }
  };

  // 닉네임 유효성 검사 함수
  const validateNickname = (value: string): string => {
    if (value.length === 0) {
      return '닉네임은 최소 1자 이상 입력해야 합니다.';
    }
    if (value.length > 10) {
      return '닉네임은 최대 10자까지 입력 가능합니다.';
    }
    if (/\s/.test(value)) {
      return '닉네임 사이에는 공백을 입력할 수 없습니다.';
    }
    return ''; // 유효한 닉네임
  };

  const navigate = useNavigate();

  // 닉네임 입력 핸들러
  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNickname(value); // 입력값 업데이트
    setErrorMessage(validateNickname(value)); // 유효성 검사 결과 업데이트
    setIsNicknameValid(null);
  };

  // 전화번호 유효성 검사 함수
  const validatePhone = (value: string): string => {
    // 전화번호 형식: 000-0000-0000 (하이픈 포함)
    const phoneRegex = /^\d{3}-\d{4}-\d{4}$/;

    if (!phoneRegex.test(value)) {
      return '적절하지 않은 형식입니다. 전화번호 및 형식을 다시 확인해주세요.';
    }
    return ''; // 유효한 경우 빈 문자열 반환
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // 숫자만 남기기
    const onlyNumbers = value.replace(/\D/g, '');

    // 하이픈 자동 삽입 (000-0000-0000 형식)
    if (onlyNumbers.length <= 3) {
      value = onlyNumbers;
    } else if (onlyNumbers.length <= 7) {
      value = `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(3)}`;
    } else {
      value = `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(3, 7)}-${onlyNumbers.slice(7, 11)}`;
    }

    setPhoneNumber(value); // 입력값 업데이트
    console.log('현재 입력된 전화번호:', value); // 값이 정상적으로 들어가는지 확인
    setPhoneError(validatePhone(value)); // 유효성 검사 결과 업데이트
  };

  const handleNext = () => {
    // 닉네임 유효성 검사
    if (!nickname) {
      setShowAlert(true);
      console.log('닉네임이 입력되지 않았습니다.');
      return;
    }
    if (!isNicknameValid) {
      setShowAlert(true);
      console.log('닉네임 중복 확인이 완료되지 않았거나 실패했습니다.');
      return;
    }

    // 성별 유효성 검사
    if (!gender) {
      setShowAlert(true);
      console.log('성별이 선택되지 않았습니다.');
      return;
    }

    // 전화번호 유효성 검사
    if (!phoneNumber || phoneError) {
      setShowAlert(true);
      console.log('전화번호가 입력되지 않았습니다.');
      return;
    }

    // 프로필 사진 검사 (기본 이미지 또는 업로드된 이미지가 있어야 함)
    if (!isDefaultImage && !uploadedImage) {
      setShowAlert(true);
      console.log('프로필 사진이 설정되지 않았습니다.');
      return;
    }

    // 2단계 데이터 로컬 저장
    const signup2Data = {
      nickname,
      gender,
      phoneNumber,
      profileImage: isDefaultImage
        ? 'https://example.com/default-profile.jpg'
        : uploadedImage
    };

    localStorage.setItem('signup2Data', JSON.stringify(signup2Data)); // 로컬 저장
    console.log(signup2Data);
    navigate('/signup3'); // 다음 단계로 이동
  };

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      console.log('📡 Presigned URL 요청 시작...');
      // 1️⃣ Presigned URL 요청
      const fileExtension = file.name.split('.').pop(); // 파일 확장자 추출
      const response = await api.post(
        `/image/user?fileExtension=${fileExtension}`
      );
      console.log('📡 Presigned URL API 응답:', response);
      if (!response.data || !response.data.presignedUrl) {
        throw new Error('Presigned URL 발급 실패');
      }

      const { presignedUrl, fileUrl } = response.data; // URL 정보 가져오기
      console.log('발급된 url', presignedUrl);

      // 2️⃣ S3에 이미지 업로드
      const uploadResponse = await fetch(presignedUrl, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': file.type } // 파일 타입 설정
      });

      if (!uploadResponse.ok) {
        throw new Error(`업로드 실패: ${uploadResponse.status}`);
      }

      // 3️⃣ 최종적으로 업로드된 이미지 URL을 상태에 저장
      setUploadedImage(fileUrl); // 프로필 사진 상태 업데이트
      setIsDefaultImage(false); // 기본 이미지 비활성화
      console.log('✅ 이미지 업로드 성공:', fileUrl);
    } catch (error) {
      console.error('❌ 파일 업로드 오류:', error);
    }
  };

  const handleCheckboxChange = () => {
    setIsDefaultImage(true); // 기본 이미지 사용 설정
    setUploadedImage(null); // 업로드된 이미지 초기화
  };

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const response = await api.get('/users/me'); // API 요청 (토큰 자동 포함)
  //       console.log('유저 정보:', response.data);
  //       setUser(response.data.data);
  //       //setNickname(response.data.data.nickname || ""); // 닉네임 값 설정
  //       setEmail(response.data.data.email || '');
  //     } catch (error) {
  //       console.error('유저 정보를 불러오는 중 오류 발생:', error);
  //     }
  //   };

  //   fetchUser();
  // }, []);

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
        </StepperDesktop>
           <StepperMobile
        currentStep={2}
        steps={[
          "이용약관 동의",
          "회원 정보 입력",
          "선호 장르 및 댄서 고르기",
          "가입 완료",
        ]}
      />
      </Stepper>
      <DataForm>
        <Field>
          <Label>닉네임</Label>
          <InputWrapper>
            <Input
              type="text"
              placeholder="닉네임을 입력하세요."
              value={nickname}
              onChange={handleNicknameChange}
            />
            <Button onClick={handleNicknameCheck}>중복확인</Button>
          </InputWrapper>
          {isNicknameValid === true && (
            <ValidMessage>사용 가능한 닉네임입니다.</ValidMessage>
          )}
          {isNicknameValid === false && (
            <ErrorMessage>다른 유저와 중복되는 닉네임입니다.</ErrorMessage>
          )}
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </Field>

        <Field>
          <Gender>
            <Label>성별</Label>
            <RadioGroup>
              <RadioLabel>
                <LabelText>남</LabelText>
                <RadioInput
                  type="radio"
                  name="gender"
                  value="남"
                  onChange={(e) => setGender(e.target.value)}
                />
                <CustomCircle />
              </RadioLabel>
              <RadioLabel>
                <LabelText>여</LabelText>
                <RadioInput
                  type="radio"
                  name="gender"
                  value="여"
                  onChange={(e) => setGender(e.target.value)}
                />
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
          <Message> ‘-’ 기호를 제외한 숫자만 입력해주세요.</Message>
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
              <HiddenInput
                type="file"
                id="file-upload"
                accept="image/*"
                onChange={handleFileUpload}
              />
              <UploadButton htmlFor="file-upload">파일 업로드</UploadButton>

              <RadioWrapper>
                <RadioLabel>
                  <RadioInput
                    type="checkbox"
                    name="profile"
                    value="기본이미지 사용하기"
                    checked={isDefaultImage}
                    onChange={handleCheckboxChange}
                  />
                  <CustomCircle1 />
                  <LabelText1>기본 이미지 사용하기</LabelText1>
                </RadioLabel>
              </RadioWrapper>
            </UploadContainer>
          </ProfileContainer>
        </Field>
      </DataForm>
      <NextButton onClick={handleNext}>
        <Next>다음으로</Next>
      </NextButton>
      {showAlert && (
        <SingleBtnAlert
          onClose={() => setShowAlert(false)}
          message={
            <span>
              <span>
                모든 항목을 <br />
              </span>
              <span>
                <ColoredText>적절하게 </ColoredText>
              </span>
              <span>
                입력했는지 확인해주세요.
                <br />
              </span>
            </span>
          }
          mariginsize="25px"
          ContainerWidth="280px"
          ContainerHeight="108px"
          //marginsize="24px"
          AlertWidth="392px"
          AlertHeight="260px"
          showButtons={true}
          confirmLabel="확인"
        />
      )}
    </Layout>
  );
};
export default Signup2;

const Layout = styled.div`
  background-color: black;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 155px;
`;
const SignupTitle = styled.div`
  color: var(--main_white, #fff);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: 17px;
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
  width: 160px;
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
  width: 160px;
`;

const DataForm = styled.div`
  border: none;
  width: 90%;
  flex-shrink: 0;
  border-radius: 25px;
  margin-top: 52px;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${({ theme }) => theme.media.tablet} {
  border: 2px solid var(--main_purple, #9819c3);
  width: 900px;
  height: 900px;
  }
`;
const Field = styled.div`
  margin-top: 40px;
  //margin-left: 25px;
  width: 324px;
${({ theme }) => theme.media.tablet} {
  margin-top: 46px;
  width: 600px;
}
`;
const Gender = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  padding-bottom: 20px;
  ${({ theme }) => theme.media.tablet} {
  flex-direction: row;
}
`;

const Label = styled.label`
  color: var(--main_white, #fff);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-right: 157px;
  ${({ theme }) => theme.media.tablet} {
    font-size: 22px;
    margin-left: 8px;
}
`;
const InputBox = styled.div`
  margin-bottom: 10px;
`;
const Input = styled.input`
  background: none;
  color: white;
  border: none;
  color: var(--sub_light-gray, #ddd);
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: 244px;
  height: 32px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid var(--sub_light-gray, #ddd);
  margin-top: 10px;
  padding-left: 20px;
  ${({ theme }) => theme.media.tablet} {
  width: 501px;
  height: 60px;
  font-size: 20px;
}
`;
const Input2 = styled.input`
  color: white;
  border: none;
  background: none;
  color: var(--sub_light-gray, #ddd);
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: 325px;
  height: 32px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid var(--sub_light-gray, #ddd);
  margin-top: 10px;
  padding-left: 20px;
   ${({ theme }) => theme.media.tablet} {
  width: 588px;
  height: 60px;
  font-size: 20px;
}
`;
const InputWrapper = styled.div`
  display: flex;
`;
const Email = styled.div`
  color: white;
  border: none;
  background: none;
  color: var(--sub_light-gray, #ddd);
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: 325px;
  height: 32px;
  display: flex;
  text-align: left;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid var(--sub_light-gray, #ddd);
  margin-top: 10px;
  padding-left: 20px;
  ${({ theme }) => theme.media.tablet} {
  width: 588px;
  height: 60px;
  font-size: 20px;
}
`;

const Button = styled.button`
  display: flex;
  width: 65px;
  height: 32px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background: var(--sub_light-gray, #ddd);
  color: var(--main_purple, #9819c3);
  text-align: center;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 10px;
  margin-left: 21px;
  cursor: pointer;
  ${({ theme }) => theme.media.tablet} {
    font-size: 15px;
    width: 72px;
    height: 65px;
    font-weight: 600;
  }
`;

const ValidMessage = styled.div`
  color: var(--highlight_green, #00dd0b);
  text-align: center;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 10px;
  text-align: right;
  margin-right: 215px;
  ${({ theme }) => theme.media.tablet} {
    font-size: 14px;
  }
`;

const ErrorMessage = styled.div`
  color: var(--highlight_red, #f00);
  text-align: center;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 10px;
  margin-right: 215px;
  text-align: right;
  ${({ theme }) => theme.media.tablet} {
    font-size: 14px;
  }
`;

const ErrorMessage1 = styled.div`
  color: var(--highlight_red, #f00);
  text-align: center;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 10px;
  margin-right: 130px;
  text-align: right;
   ${({ theme }) => theme.media.tablet} {
    font-size: 14px;
  }
`;
const RadioWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 88px;
  margin-left: 70px;
  ${({ theme }) => theme.media.tablet} {
    gap: 88px;
    margin-left: 1px;
  }
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
`;

const RadioInput = styled.input`
  display: none; /* 기본 라디오 버튼 숨기기 */
`;

const CustomCircle = styled.span`
  width: 16px;
  height: 16px;
  border: 2px solid #a60f62; /* 외곽선 색상 */
  background: white;
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
    background-color: white; /* 선택된 경우 내부 색상 변경 */
  }

  ${RadioInput}:checked + &::after {
    content: '';
    width: 12px;
    height: 12px;
    background-color: #a60f62; /* 선택된 상태의 중앙 원 */
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

  ${({ theme }) => theme.media.tablet} {
  width: 24px;
  height: 24px;
}
`;
const CustomCircle1 = styled.span`
  width: 16px;
  height: 16px;
  border: 2px solid #a60f62; /* 외곽선 색상 */
  background: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  position: relative;
  ${RadioInput}:checked + & {
    background-color: white; /* 선택된 경우 내부 색상 변경 */
  }

  ${RadioInput}:checked + &::after {
    content: '';
    width: 12px;
    height: 12px;
    background-color: #a60f62; /* 선택된 상태의 중앙 원 */
    border-radius: 50%;
    position: absolute;
  }
  ${({ theme }) => theme.media.tablet} {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
`;

const Message = styled.div`
  color: #fff;
  text-align: left;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  //margin-right: 130px;
  margin-left: 170px;
  margin-top: -15px;
  ${({ theme }) => theme.media.tablet} {
  font-size: 14px;
  margin-left: 370px;
}
`;
const LabelText = styled.span`
  color: var(--main_white, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  ${({ theme }) => theme.media.tablet} {
  font-size: 20px;
}
`;

const LabelText1 = styled.div`
  color: var(--main_white, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
    ${({ theme }) => theme.media.tablet} {
  font-size: 18px;
}
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 45px;
  margin-top: 10px;
`;

const ProfileImageWrapper = styled.div`
  width: 100px;
  height: 100px;
  //border: 1px solid #666;
  border-radius: 2px;
  overflow: hidden;
  ${({ theme }) => theme.media.tablet} {
  width: 160px;
  height: 160px;
}
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
  color: var(--sub_light-gray, #ddd);
  text-align: center;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  ${({ theme }) => theme.media.tablet} {
  font-size: 15px;
}
`;

const UploadButton = styled.label`
  width: 168px;
  height: 26px;
  flex-shrink: 0;
  background-color: transparent;
  border: 1px solid #666;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  display: flex;
   ${({ theme }) => theme.media.tablet} {
  width: 300px;
  height: 36px;
}
`;

const HiddenInput = styled.input`
  display: none;
  color: white;
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
  width: 300px;
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
  ${({ theme }) => theme.media.tablet} {
  font-size: 20px;
}
`;

const ColoredText = styled.span`
  color: #a60f62;
`;