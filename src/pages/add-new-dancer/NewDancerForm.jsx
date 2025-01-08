import React, { useState } from "react";
import styled from "styled-components";
import DefaultProfileImage from "../../assets/profile.svg";
import { ReactComponent as RadioBtnOn } from "../../assets/buttons/radio-button-on.svg";
import { ReactComponent as RadioBtnOff } from "../../assets/buttons/radio-button-off.svg";

const NewDancerForm = ({ onRegister }) => {
  const [name, setName] = useState("");
  const [instagramId, setInstagramId] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [genres, setGenres] = useState([]);
  const [history, setHistory] = useState("");
  const [profileImg, setProfileImg] = useState(DefaultProfileImage);
  const [isToggledRadio, setIsToggledRadio] = useState(true);

  // 장르 선택 핸들러
  const handleSelectGenre = (genre) => {
    setGenres(
      (prev) =>
        prev.includes(genre)
          ? prev.filter((item) => item !== genre) // 제거
          : [...prev, genre] // 추가
    );
  };

  // 파일 업로드 핸들러
  const handleUploadFile = (e) => {
    const file = e.target.files[0]; // 파일 가져오기
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImg(reader.result); // profileImg 업데이트
      };
      reader.readAsDataURL(file);
      setIsToggledRadio(false);
    }
  };

  // 디폴트 이미지 사용 라디오 버튼 핸들러
  const handleToggleRadio = () => {
    setIsToggledRadio((prev) => !prev);
    if (!isToggledRadio) {
      setProfileImg(DefaultProfileImage);
    }
  };

  // 댄서 등록 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name,
      instagramId,
      introduction,
      genres,
      history,
      profileImg,
    };
    onRegister(formData);
    console.log(formData); // 임시
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <InputContainer>
        <div>
          <Label>댄서 네임</Label>
          <InputBox
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="댄서 네임을 입력하세요"
          />
        </div>
        <div>
          <Label>Instagram 아이디</Label>
          <InputBox
            value={instagramId}
            onChange={(e) => setInstagramId(e.target.value)}
            placeholder="Instagram 아이디를 입력하세요"
          />
        </div>
        <div>
          <Label>한 마디 소개글</Label>
          <InputBox
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            placeholder="한 마디 소개글을 입력하세요"
          />
        </div>
        <div>
          <Label>장르</Label>
          <GenreWrapper>
            <GenreBtn
              type="button"
              selected={genres.includes("힙합")}
              onClick={() => handleSelectGenre("힙합")}
            >
              #힙합
            </GenreBtn>
            <GenreBtn
              type="button"
              selected={genres.includes("걸스힙합")}
              onClick={() => handleSelectGenre("걸스힙합")}
            >
              #걸스힙합
            </GenreBtn>
            <GenreBtn
              type="button"
              selected={genres.includes("팝핑")}
              onClick={() => handleSelectGenre("팝핑")}
            >
              #팝핑
            </GenreBtn>
            <GenreBtn
              type="button"
              selected={genres.includes("락킹")}
              onClick={() => handleSelectGenre("락킹")}
            >
              #락킹
            </GenreBtn>
            <GenreBtn
              type="button"
              selected={genres.includes("왁킹")}
              onClick={() => handleSelectGenre("왁킹")}
            >
              #왁킹
            </GenreBtn>
            <GenreBtn
              type="button"
              selected={genres.includes("걸리시/힙")}
              onClick={() => handleSelectGenre("걸리시/힙")}
            >
              #걸리시/힙
            </GenreBtn>
            <GenreBtn
              type="button"
              selected={genres.includes("크럼프")}
              onClick={() => handleSelectGenre("크럼프")}
            >
              #크럼프
            </GenreBtn>
            <GenreBtn
              type="button"
              selected={genres.includes("텃팅")}
              onClick={() => handleSelectGenre("텃팅")}
            >
              #텃팅
            </GenreBtn>
            <GenreBtn
              type="button"
              selected={genres.includes("코레오")}
              onClick={() => handleSelectGenre("코레오")}
            >
              #코레오
            </GenreBtn>
            <GenreBtn
              type="button"
              selected={genres.includes("K-pop")}
              onClick={() => handleSelectGenre("K-pop")}
            >
              #K-pop
            </GenreBtn>
          </GenreWrapper>
        </div>
        <div>
          <Label>댄서 이력</Label>
          <TextareaBox
            value={history}
            onChange={(e) => setHistory(e.target.value)}
            placeholder="댄서 이력을 입력하세요"
          />
        </div>
        <div>
          <Label>댄서 프로필 사진</Label>
          <ProfileWrapper>
            <ImageContainer>
              <img src={profileImg} alt="New Profile Image" />
            </ImageContainer>
            <FileUploadContainer>
              <UploadBtn htmlFor="file">
                <FileUploadText>파일 업로드</FileUploadText>
              </UploadBtn>
              <HiddenInput
                type="file"
                id="file"
                onChange={handleUploadFile}
                accept="image/*"
              />

              <UseDefaultContainer>
                <RadioBtn onClick={handleToggleRadio}>
                  {isToggledRadio ? <RadioBtnOn /> : <RadioBtnOff />}
                </RadioBtn>
                <UseDefaultImgText>기본 이미지 사용하기</UseDefaultImgText>
              </UseDefaultContainer>
            </FileUploadContainer>
          </ProfileWrapper>
        </div>
      </InputContainer>

      <Notice>*댄서 등록은 내부 운영팀의 심사를 통해 최종 승인됩니다.</Notice>
      <RegBtn type="submit">
        <RegBtnText>댄서 등록하기</RegBtnText>
      </RegBtn>
    </FormContainer>
  );
};

export default NewDancerForm;

const FormContainer = styled.form`
  justify-items: center;
  padding-bottom: 142.79px;
`;
const InputContainer = styled.div`
  width: 900px;
  flex-shrink: 0;
  padding-top: 58.23px;
  padding-bottom: 64.09px;
  justify-items: center;
  border-radius: 25px;
  border: 2px solid var(--main_purple, #9819c3);
`;
const Notice = styled.div`
  color: var(--text_secondary-gray, #b2b2b2);
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: 42.71px;
  margin-bottom: 34.06px;
`;
const GenreWrapper = styled.div`
  width: 514px;
  padding: 8px 37px 69px 37px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 33px;
  column-gap: 17px;
`;
const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
const Label = styled.div`
  margin-bottom: 10px;
  margin-left: 8.11px;
  color: var(--main_white, #fff);
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const InputBox = styled.input`
  width: 524.72px;
  flex-shrink: 0;
  margin-bottom: 27.42px;
  padding: 18px 31.64px;
  border-radius: 8px;
  border: 1px solid var(--sub_light-gray, #ddd);
  background-color: transparent;
  color: var(--text_secondary-gray, #b2b2b2);

  /* 입력창/내용 */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;
const TextareaBox = styled.textarea`
  width: 524.72px;
  height: 466px;
  flex-shrink: 0;
  margin-bottom: 27.42px;
  padding: 23.64px 30.29px;
  border-radius: 8px;
  border: 1px solid var(--sub_light-gray, #ddd);
  background-color: transparent;
  color: var(--text_secondary-gray, #b2b2b2);

  /* 입력창/내용 */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;
const GenreBtn = styled.button`
  display: flex;
  width: 160px;
  max-width: 160px;
  padding: 8px 10px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  border: 1px solid
    ${(props) =>
      props.selected
        ? "var(--main_purple, #9819C3)"
        : "var(--sub_light-gray, #ddd)"};
  background-color: ${(props) =>
    props.selected ? "var(--main_purple, #9819C3)" : "transparent"};

  color: var(--sub_light-gray, #ddd);
  text-align: center;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  &:hover {
    cursor: pointer;
    border: 1px solid var(--main_purple, #9819c3);
  }

  &:nth-last-child(1) {
    grid-column: 2;
  }
`;
const ImageContainer = styled.div`
  width: 160px;
  height: 160px;
  flex-shrink: 0;
  border-radius: 2px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover; // 비율 유지
  }
`;
// 파일 업로드
const FileUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 43px 0 47px 36px;
`;
const UploadBtn = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 36px;
  flex-shrink: 0;
  border-radius: 4px;
  border: 1px solid var(--sub_light-gray, #ddd);
  background-color: transparent;

  &:hover {
    cursor: pointer;
  }
`;
const FileUploadText = styled.div`
  color: var(--text_secondary-gray, #b2b2b2);
  text-align: center;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
const HiddenInput = styled.input`
  display: none;
`;
const UseDefaultContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 15px;
  align-items: center;
`;
// 기본 이미지 사용 라디오오
const RadioBtn = styled.div`
  display: flex;
  cursor: pointer;
`;
const UseDefaultImgText = styled.div`
  margin-left: 14px;
  color: var(--main_white, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
// 제출 버튼
const RegBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 52px;
  flex-shrink: 0;
  border: none;
  border-radius: 15px;
  background: var(--main_purple, #9819c3);

  &:hover {
    cursor: pointer;
  }
`;
const RegBtnText = styled.span`
  color: var(--main_white, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
