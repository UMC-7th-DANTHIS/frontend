import React, { useState } from "react";
import styled from "styled-components";
import DefaultProfile from "../../assets/profile.svg";

const NewDancerForm = ({ onRegister }) => {
  const [name, setName] = useState("");
  const [instagramId, setInstagramId] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [genres, setGenres] = useState([]);
  const [history, setHistory] = useState("");
  const [profileImg, setProfileImg] = useState(DefaultProfile);
  const [toggleDefaultImg, setToggleDefaultImg] = useState(false);

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
  const handleUploadFile = (e) => {};

  // 디폴트 이미지 사용 라디오 버튼 핸들러
  const handleToggleDefaultImg = () => {
    setToggleDefaultImg((prev) => !prev);
    if (!toggleDefaultImg) {
      setProfileImg(DefaultProfile);
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
      toggleDefaultImg, // 필요한가?
    };
    onRegister(formData);
    console.log("ok");
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <InfoContainer>
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
            <GenreBtn type="button" onClick={() => handleSelectGenre("힙합")}>
              #힙합
            </GenreBtn>
            <GenreBtn
              type="button"
              onClick={() => handleSelectGenre("걸스힙합")}
            >
              #걸스힙합
            </GenreBtn>
            <GenreBtn type="button" onClick={() => handleSelectGenre("팝핑")}>
              #팝핑
            </GenreBtn>
            <GenreBtn type="button" onClick={() => handleSelectGenre("락킹")}>
              #락킹
            </GenreBtn>
            <GenreBtn type="button" onClick={() => handleSelectGenre("왁킹")}>
              #왁킹
            </GenreBtn>
            <GenreBtn
              type="button"
              onClick={() => handleSelectGenre("걸리시/힙")}
            >
              #걸리시/힙
            </GenreBtn>
            <GenreBtn type="button" onClick={() => handleSelectGenre("크럼프")}>
              #크럼프
            </GenreBtn>
            <GenreBtn type="button" onClick={() => handleSelectGenre("텃팅")}>
              #텃팅
            </GenreBtn>
            <GenreBtn type="button" onClick={() => handleSelectGenre("코레오")}>
              #코레오
            </GenreBtn>
            <GenreBtn type="button" onClick={() => handleSelectGenre("K-pop")}>
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
            <img src={profileImg} alt="Profile Image" />
            <FileUploadWrapper>
              <UploadBtn
                type="file"
                onChange={handleUploadFile}
                accept="image/*"
              />

              <RadioDefaultWrapper>
                <RadioDefaultImage
                  type="checkbox"
                  checked={toggleDefaultImg}
                  onChange={handleToggleDefaultImg}
                />
                <UseDefaultImage>기본 이미지 사용하기</UseDefaultImage>
              </RadioDefaultWrapper>
            </FileUploadWrapper>
          </ProfileWrapper>
        </div>
      </InfoContainer>

      <Notice>*댄서 등록은 내부 운영팀의 심사를 통해 최종 승인됩니다.</Notice>
      <RegBtn type="submit">
        <RegBtnMsg>댄서 등록하기</RegBtnMsg>
      </RegBtn>
    </FormContainer>
  );
};

export default NewDancerForm;

const FormContainer = styled.form`
  justify-items: center;
  padding-bottom: 142.79px;
`;
const InfoContainer = styled.div`
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
const RegBtnMsg = styled.span`
  color: var(--main_white, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
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
  border: 1px solid var(--sub_light-gray, #ddd);
  background-color: transparent;

  color: var(--sub_light-gray, #ddd);
  text-align: center;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  &:hover {
    cursor: pointer;
  }

  &:nth-last-child(1) {
    grid-column: 2;
  }
`;
const FileUploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 43px 0 47px 36px;
`;
const UploadBtn = styled.input`
  width: 300px;
  height: 36px;
  flex-shrink: 0;
  border-radius: 4px;
  border: 1px solid var(--sub_light-gray, #ddd);
  background-color: transparent;

  color: var(--text_secondary-gray, #b2b2b2);
  text-align: center;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
const RadioDefaultWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 15px;
  align-items: center;
`;
const RadioDefaultImage = styled.input`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin: 0;
`;
const UseDefaultImage = styled.div`
  margin-left: 14px;
  color: var(--main_white, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
