import React, { useState } from 'react';
import Profileimg from '../../../../assets/profileimg.svg';
import styled from 'styled-components';
import MypageGenre from '../MypageGenre';

const ProfileUser = () => {
  const [nicknameStatus, setNicknameStatus] = useState(null);
  const [isDefaultImage, setIsDefaultImage] = useState(false);
  const [file, setFile] = useState(null);
  const [formState, setFormState] = useState({
    nickname: '',
    gender: [],
    email: '',
    phone: '',
    images: [null],
    genre: [],
  });

  const handleRadioChange = () => {
    setIsDefaultImage(true);
    setFile(null);
    setFormState((prev) => ({
      ...prev,
      images: [Profileimg],
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFormState((prev) => ({
        ...prev,
        images: [URL.createObjectURL(selectedFile)],
      }));
      setIsDefaultImage(false);
    }
  };


  const handleFileUploadClick = () => {
    document.getElementById("file-upload").click();
  };


  const handleFormChange = (key, value) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const handleDoubleCheck = () => {
    if (formState.nickname === '사용중') {
      setNicknameStatus('다른 유저와 중복되는 닉네임입니다.');
    } else if (formState.nickname.trim() === '') {
      setNicknameStatus('닉네임을 입력해주세요.');
    } else {
      setNicknameStatus('사용 가능한 닉네임입니다.');
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    console.log("저장할 데이터:", formState);
  }

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
                  onChange={(e) => handleFormChange('nickname', e.target.value)}
                />
                <ErrorText error={nicknameStatus === "다른 유저와 중복되는 닉네임입니다."}>
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
                checked={formState.gender === "남"}
                onChange={() => handleFormChange("gender", "남")}
              />
            </RadioLabel>
            <RadioLabel>
              여
              <RadioInput
                type="radio"
                name="gender"
                value="여"
                checked={formState.gender === "여"}
                onChange={() => handleFormChange("gender", "여")}
              />

            </RadioLabel>
          </GenderContainer>

          <EmailContainer>
            <Label>이메일</Label>
            <EmailInput type="text" placeholder="이메일을 입력하세요." value={formState.email} onChange={(e) => { handleFormChange('email', e.target.value) }} />
          </EmailContainer>

          <PhoneContainer>
            <Label>전화번호</Label>
            <EmailInput type="text" placeholder="전화번호를 입력하세요." value={formState.phone} onChange={(e) => { handleFormChange('phone', e.target.value) }} />
          </PhoneContainer>

          <ImageContainer>
            <Label>프로필 사진</Label>
            <ProfileContainer>
              <ProfileImageWrapper>

                <ProfileImage src={formState.images[0] || Profileimg} alt="프로필 이미지" />
              </ProfileImageWrapper>
              <UploadContainer>
                <UploadButton type="button" onClick={handleFileUploadClick}>
                  파일 업로드
                </UploadButton>
                <HiddenInput
                  type="file"
                  id="file-upload"
                  accept="image/*"
                  onChange={handleFileChange}
                />

                <RadioWrapper>
                  <RadioLabel>
                    <RadioInput
                      type="radio"
                      name="profile"
                      value="기본이미지 사용하기"
                      checked={isDefaultImage}
                      onChange={handleRadioChange}
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
              onGenreChange={(selectedGenres) => {
                handleFormChange('genre', selectedGenres);
              }}
            />

          </DanceContainer>
        </ItemContainer>
      </UserContainer>
      <SaveButton type="submit" onClick={handleSaveProfile}>프로필 저장</SaveButton>
    </AllContainer>
  );
};

export default ProfileUser;


const AllContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

//
const UserContainer = styled.div`
  width: 900px;
  height: 1314px;
  flex-shrink: 0;
  border: 2px solid #9819C3;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const NicknameContainer = styled.div`
  margin-top: 47px;
  margin-bottom: 59px;
`

const Label = styled.div`
  color: white;
  font-size: 22px;
  font-weight: 600;
  line-height: normal;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  margin-top: 10px;
  cursor: pointer;
`

const Input = styled.input`
  display: flex;
  width: 501px;
  height: 60px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  background-color: #000;
  border: 1px solid #DDDDDD;
  border-radius: 8px;
  color: white;
  font-size: 20px;
  padding-left: 33px;

  &::placeholder {
        color: #DDD;
        font-size: 20px;
        font-weight: 500;
    }
`
const DoubleCheck = styled.button`
  display: flex;
  padding: 8px;
  justify-content: center;
  align-items: center;
  border: 1px solid #DDD;
  border-radius: 8px;
  width: 70px;
  height: 36px;
  margin-top: 13px;
  color: #4D4D4D;
  font-size: 15px;
  font-weight: 400;
  cursor: pointer;
`

const ErrorContainer = styled.div`
  text-align: end;
`

const ErrorText = styled.div`
  color: ${(props) => (props.error ? "#FF0000" : "#00DD0B")};
  font-size: 14px;
  font-weight: 400;
  margin-top: 9px;
`;

//
const GenderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 88px;
  margin-bottom: 86px;
`;

const GenderLabel = styled.div`
  color: white;
  font-size: 22px;
  font-weight: 600;
  line-height: normal;
  margin-right: 156px;
`

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  color: white;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;

`;

const RadioInput = styled.input`
  appearance: none;
  width: 24px;
  height: 24px;
  border: 2px solid #A60F62;
  border-radius: 50%;
  display: flex;
  background-color: white;
  align-items: center;
  justify-content: center;
  outline: none;
  cursor: pointer;
  margin-left: 13px;

  &:checked {
    background-color: #A60F62;
    border: 3px solid #fff;
  }
`;

//
const EmailContainer = styled.div`
  margin-bottom: 55px;
`

const EmailInput = styled.input`
  display: flex;
  width: 588px;
  height: 60px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  background-color: #000;
  border: 1px solid #DDDDDD;
  border-radius: 8px;
  color: white;
  font-size: 20px;
  margin-top: 10px;
  padding-left: 28px;

  &::placeholder {
        color: #DDD;
        font-size: 20px;
        font-weight: 500;
    }
`
const PhoneContainer = styled.div`
  margin-bottom: 70px;
`
//
const ImageContainer = styled.div`
  margin-bottom: 89px;
`

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top : 10px;

`

const ProfileImageWrapper = styled.div`
  width: 160px;
  height: 160px;
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
  margin-left: 45px;
`;

const UploadButton = styled.button`
  width: 300px;
  height: 36px;
  flex-shrink: 0;
  background-color: transparent;
  color: white;
  border: 1px solid #DDDDDD;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
`;

const HiddenInput = styled.input`
  visibility: hidden;
  color : white;
`;

const RadioWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top : 15px;
`;

const RadioText = styled.div`
  color: #FFF;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  line-height: normal;
  margin-left: 10px;
  margin-top: 4px;

`

//
const DanceContainer = styled.div`
  margin-bottom: 74px;
`

const DanceTextContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const Text = styled.div`
  color: #B2B2B2;
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  margin-left: 20px;
  margin-top: 9px;
`

const SaveButton = styled.button`
  width: 300px;
  height: 52px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 77px;
  border-radius: 15px;
  background-color: #9819C3;
  border: none;
  color: white;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 159px;
  cursor: pointer;
`

