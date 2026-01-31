import { useEffect, useState, ChangeEvent, FormEvent, useRef } from 'react';
import Profileimg from '../../../../assets/profileimg.svg';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import MypageGenre from '../MypageGenre';
import api from '../../../../api/api';
import { ModalOneBtn, ModalTwoBtns } from '../../../../components/modals';
import useConfirmLeave from '../../../../hooks/useConfirmLeave';
import { ErrorTextProps, UserFormState } from '@/types/mypage/EditProfileType';

const ProfileUser = () => {
  const navigate = useNavigate();
  const [nicknameStatus, setNicknameStatus] = useState<string | null>(null);
  const [showLeaveAlert, setShowLeaveAlert] = useState<boolean>(false);
  const [showInvalidAlert, setShowInvalidAlert] = useState<boolean>(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isDefaultImage, setIsDefaultImage] = useState<boolean>(false);
  const [formState, setFormState] = useState<UserFormState>({
    nickname: '',
    gender: '',
    email: '',
    phoneNumber: '',
    profileImage: '',
    preferredGenres: [],
    preferredDancers: []
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useConfirmLeave({ setAlert: setShowLeaveAlert });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/users/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = response.data.data;

        setFormState({
          nickname: data.nickname || '',
          gender: data.gender || '',
          email: data.email || '',
          phoneNumber: data.phoneNumber || '',
          profileImage: data.profileImage || Profileimg,
          preferredGenres: data.preferredGenres || [],
          preferredDancers: data.preferredDancers || []
        });

        setIsDefaultImage(data.profileImage === Profileimg);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const fileExtension = file.name.split('.').pop();
      const response = await api.post(
        `/image/user?fileExtension=${fileExtension}`
      );

      if (!response.data || !response.data.presignedUrl) {
        throw new Error('Presigned URL 발급 실패');
      }

      const { presignedUrl, fileUrl } = response.data;

      const uploadResponse = await fetch(presignedUrl, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': file.type }
      });

      if (!uploadResponse.ok) {
        throw new Error(`업로드 실패: ${uploadResponse.status}`);
      }

      setUploadedImage(fileUrl);
      setIsDefaultImage(false);
    } catch (error: any) {
      console.error('파일 업로드 오류:', error.message);
    }
  };

  const handleCheckboxChange = () => {
    setIsDefaultImage(true);
    setUploadedImage(null);
    setFormState((prev) => ({ ...prev, profileImage: Profileimg }));
  };

  const handleFormChange = (key: keyof UserFormState, value: any) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const handleDoubleCheck = async () => {
    if (!formState.nickname.trim()) {
      setNicknameStatus('닉네임을 입력해주세요.');
      return;
    }

    try {
      const response = await api.get(
        `/users/check-nickname?nickname=${formState.nickname}`
      );
      if (response.data.data === true) {
        setNicknameStatus('사용 가능한 닉네임입니다.');
      } else {
        setNicknameStatus('다른 유저와 중복되는 닉네임입니다.');
      }
    } catch (error) {
      console.error('닉네임 중복 체크 에러:', error);
      setNicknameStatus('중복 확인에 실패했습니다.');
    }
  };

  const validatePhone = (value: string): boolean => {
    const phoneRegex = /^\d{3}-\d{4}-\d{4}$/;
    return phoneRegex.test(value);
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    const onlyNumbers = value.replace(/\D/g, '');

    if (onlyNumbers.length <= 3) {
      value = onlyNumbers;
    } else if (onlyNumbers.length <= 7) {
      value = `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(3)}`;
    } else {
      value = `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(3, 7)}-${onlyNumbers.slice(7, 11)}`;
    }

    handleFormChange('phoneNumber', value);
  };

  const handleSaveProfile = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!formState.nickname) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    if (!formState.gender) {
      alert('성별을 선택해주세요.');
      return;
    }

    if (formState.phoneNumber && !validatePhone(formState.phoneNumber)) {
      alert('올바른 전화번호 형식이 아닙니다.');
      return;
    }

    const genderForPut =
      formState.gender === '남'
        ? 'male'
        : formState.gender === '여'
          ? 'female'
          : '';

    try {
      const token = localStorage.getItem('token');
      const updatedData = {
        nickname: formState.nickname,
        gender: genderForPut,
        email: formState.email,
        phoneNumber: formState.phoneNumber,
        profileImage: formState.profileImage,
        preferredGenres: formState.preferredGenres,
        preferredDancers: formState.preferredDancers
      };

      const response = await api.put('/users', updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        setShowInvalidAlert(true);
      }
    } catch (error) {
      console.error('업데이트 에러', error);
      alert('프로필 업데이트에 실패했습니다.');
    }
  };

  const handleGenderChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFormChange('gender', e.target.value);
  };

  return (
    <AllContainer>
      <UserContainer>
        <ItemContainer>
          <NicknameContainer>
            <Label>닉네임</Label>
            <InputContainer>
              <ErrorContainer>
                <Input
                  type="text"
                  placeholder="닉네임을 입력하세요."
                  value={formState.nickname}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleFormChange('nickname', e.target.value)
                  }
                />
                <ErrorText
                  error={
                    nicknameStatus === '다른 유저와 중복되는 닉네임입니다.'
                  }
                >
                  {nicknameStatus}
                </ErrorText>
              </ErrorContainer>
              <DoubleCheck onClick={handleDoubleCheck}>중복확인</DoubleCheck>
            </InputContainer>
          </NicknameContainer>

          <GenderContainer>
            <GenderLabel>성별</GenderLabel>
            <RadioLabel>
              남
              <RadioInput
                type="radio"
                name="gender"
                value="남"
                checked={formState.gender === '남'}
                onChange={handleGenderChange}
              />
            </RadioLabel>
            <RadioLabel>
              여
              <RadioInput
                type="radio"
                name="gender"
                value="여"
                checked={formState.gender === '여'}
                onChange={handleGenderChange}
              />
            </RadioLabel>
          </GenderContainer>

          <EmailContainer>
            <Label>이메일</Label>
            <EmailInput
              type="text"
              placeholder="이메일을 입력하세요."
              value={formState.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleFormChange('email', e.target.value)
              }
            />
          </EmailContainer>

          <PhoneContainer>
            <Label>전화번호</Label>
            <EmailInput
              type="text"
              placeholder="전화번호를 입력하세요."
              value={formState.phoneNumber}
              onChange={handlePhoneChange}
            />
          </PhoneContainer>

          <ImageContainer>
            <Label>프로필 사진</Label>
            <ProfileContainer>
              <ProfileImageWrapper>
                {isDefaultImage || !uploadedImage ? (
                  <ProfileImage src={Profileimg} alt="프로필 이미지" />
                ) : (
                  <ProfileImage src={uploadedImage} alt="프로필 이미지" />
                )}
              </ProfileImageWrapper>
              <UploadContainer>
                <UploadButton
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                >
                  파일 업로드
                </UploadButton>
                <HiddenInput
                  type="file"
                  id="file-upload"
                  accept="image/*"
                  onChange={handleFileUpload}
                />
                <RadioWrapper>
                  <RadioLabel>
                    <RadioInput
                      type="radio"
                      name="profile"
                      checked={isDefaultImage}
                      onChange={handleCheckboxChange}
                    />
                    <RadioText>기본 이미지 사용하기</RadioText>
                  </RadioLabel>
                </RadioWrapper>
              </UploadContainer>
            </ProfileContainer>
          </ImageContainer>

          <DanceContainer>
            <DanceTextContainer>
              <Label>선호하는 댄스 장르가 무엇인가요?</Label>
              <Text>* 최대 5개까지 선택 가능합니다.</Text>
            </DanceTextContainer>
            <MypageGenre
              genreSelect={5}
              selectedGenres={formState.preferredGenres}
              onGenreChange={(selectedGenres) => {
                console.log('선택된 장르', selectedGenres);
                handleFormChange('preferredGenres', selectedGenres);
              }}
            />
          </DanceContainer>
        </ItemContainer>
      </UserContainer>
      <SaveButton type="submit" onClick={handleSaveProfile}>
        프로필 저장
      </SaveButton>

      {showInvalidAlert && (
        <ModalOneBtn
          message={<AlertText>프로필 저장이 완료되었습니다.</AlertText>}
          onClose={() => setShowInvalidAlert(false)}
          showButtons={true}
        />
      )}

      {showLeaveAlert && (
        <ModalTwoBtns
          message={
            <AlertText>
              해당 페이지를 벗어나면{'\n'}
              작성 중인 정보가 <ColoredText>모두 삭제</ColoredText>됩니다.
              {'\n'}
              떠나시겠습니까?
            </AlertText>
          }
          onClose={() => setShowLeaveAlert(false)}
          onSecondaryClick={() => navigate('/mypage')}
          showButtons={true}
          primaryLabel="남기"
          secondaryLabel="떠나기"
        />
      )}
    </AllContainer>
  );
};

export default ProfileUser;

const AllContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

//
const UserContainer = styled.div`
  width: 900px;
  height: 1314px;
  flex-shrink: 0;
  border: 2px solid #9819c3;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  @media (max-width: 600px) {
    width: 100%;
    height: auto;
    padding: 20px 0;
    border: none;
    border-radius: 0;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;

  @media (max-width: 600px) {
    width: 100%;
    align-items: flex-start;
  }
`;

const NicknameContainer = styled.div`
  margin-top: 47px;
  margin-bottom: 59px;

  @media (max-width: 600px) {
    margin-top: 24px;
    margin-bottom: 30px;
    width: 100%;
  }
`;

const Label = styled.div`
  color: white;
  font-size: 22px;
  font-weight: 600;
  line-height: normal;

  @media (max-width: 600px) {
    font-size: 18px;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  margin-top: 10px;
  cursor: pointer;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 8px;
  }
`;

const Input = styled.input`
  display: flex;
  width: 501px;
  height: 60px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  background-color: #000;
  border: 1px solid #dddddd;
  border-radius: 8px;
  color: white;
  font-size: 20px;
  padding-left: 33px;

  &::placeholder {
    color: #ddd;
    font-size: 20px;
    font-weight: 500;
  }

  @media (max-width: 600px) {
    width: 100%;
    height: 50px;
    font-size: 16px;
    padding-left: 16px;

    &::placeholder {
      font-size: 16px;
    }
  }
`;
const DoubleCheck = styled.button`
  display: flex;
  padding: 8px;
  justify-content: center;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 70px;
  height: 36px;
  margin-top: 13px;
  color: #4d4d4d;
  font-size: 15px;
  font-weight: 400;
  cursor: pointer;

  @media (max-width: 600px) {
    width: 100%;
    margin-top: 0;
    height: 40px;
    font-size: 14px;
  }
`;

const ErrorContainer = styled.div`
  text-align: end;

  @media (max-width: 600px) {
    text-align: start;
  }
`;

const ErrorText = styled.div<ErrorTextProps>`
  color: ${(props) => (props.error ? '#FF0000' : '#00DD0B')};
  font-size: 14px;
  font-weight: 400;
  margin-top: 9px;

  @media (max-width: 600px) {
    font-size: 12px;
    margin-top: 6px;
  }
`;

//
const GenderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 88px;
  margin-bottom: 86px;

  @media (max-width: 600px) {
    gap: 40px;
    margin-bottom: 43px;
    flex-wrap: wrap;
  }
`;

const GenderLabel = styled.div`
  color: white;
  font-size: 22px;
  font-weight: 600;
  line-height: normal;
  margin-right: 156px;

  @media (max-width: 600px) {
    font-size: 18px;
    margin-right: 0;
    width: 100%;
  }
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  color: white;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const RadioInput = styled.input`
  appearance: none;
  width: 24px;
  height: 24px;
  border: 2px solid #a60f62;
  border-radius: 50%;
  display: flex;
  background-color: white;
  align-items: center;
  justify-content: center;
  outline: none;
  cursor: pointer;
  margin-left: 13px;

  &:checked {
    background-color: #a60f62;
    border: 3px solid #fff;
  }

  @media (max-width: 600px) {
    width: 20px;
    height: 20px;
    margin-left: 8px;
  }
`;

//
const EmailContainer = styled.div`
  margin-bottom: 55px;

  @media (max-width: 600px) {
    margin-bottom: 28px;
    width: 100%;
  }
`;

const EmailInput = styled.input`
  display: flex;
  width: 588px;
  height: 60px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  background-color: #000;
  border: 1px solid #dddddd;
  border-radius: 8px;
  color: white;
  font-size: 20px;
  margin-top: 10px;
  padding-left: 28px;

  &::placeholder {
    color: #ddd;
    font-size: 20px;
    font-weight: 500;
  }

  @media (max-width: 600px) {
    width: 100%;
    height: 50px;
    font-size: 16px;
    padding-left: 16px;

    &::placeholder {
      font-size: 16px;
    }
  }
`;
const PhoneContainer = styled.div`
  margin-bottom: 70px;

  @media (max-width: 600px) {
    margin-bottom: 35px;
    width: 100%;
  }
`;
//
const ImageContainer = styled.div`
  margin-bottom: 89px;

  @media (max-width: 600px) {
    margin-bottom: 45px;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ProfileImageWrapper = styled.div`
  width: 160px;
  height: 160px;
  overflow: hidden;

  @media (max-width: 600px) {
    width: 120px;
    height: 120px;
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
  margin-left: 45px;

  @media (max-width: 600px) {
    margin-left: 0;
    margin-top: 16px;
    width: 100%;
  }
`;

const UploadButton = styled.button`
  width: 300px;
  height: 36px;
  flex-shrink: 0;
  background-color: transparent;
  color: white;
  border: 1px solid #dddddd;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;

  @media (max-width: 600px) {
    width: 100%;
    height: 40px;
    font-size: 14px;
  }
`;

const HiddenInput = styled.input`
  visibility: hidden;
  color: white;
`;

const RadioWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;

  @media (max-width: 600px) {
    margin-top: 12px;
  }
`;

const RadioText = styled.div`
  color: #fff;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  line-height: normal;
  margin-left: 10px;
  margin-top: 4px;

  @media (max-width: 600px) {
    font-size: 14px;
    margin-left: 8px;
  }
`;

//
const DanceContainer = styled.div`
  margin-bottom: 74px;

  @media (max-width: 600px) {
    margin-bottom: 37px;
  }
`;

const DanceTextContainer = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Text = styled.div`
  color: #b2b2b2;
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  margin-left: 20px;
  margin-top: 9px;

  @media (max-width: 600px) {
    font-size: 12px;
    margin-left: 0;
    margin-top: 4px;
  }
`;

const SaveButton = styled.button`
  width: 300px;
  height: 52px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 77px;
  border-radius: 15px;
  background-color: #9819c3;
  border: none;
  color: white;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 159px;
  cursor: pointer;

  @media (max-width: 600px) {
    width: 100%;
    height: 48px;
    font-size: 18px;
    margin-top: 40px;
    margin-bottom: 80px;
  }
`;

const AlertText = styled.span`
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px;
  white-space: pre-line;

  ${({ theme }) => theme.media.tablet} {
    font-size: 16px;
  }
`;

const ColoredText = styled.span`
  color: #a60f62;
  font-weight: bold;
`;
