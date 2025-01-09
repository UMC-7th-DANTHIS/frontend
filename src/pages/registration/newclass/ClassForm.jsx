import React, { useState } from "react";
import styled from "styled-components";
import { InputBox, TextareaBox, UrlBox } from "../components/Inputs";
import GenreSelector from "../components/GenreSelector";
import FileUploader from "../components/FileUploader";
import SubmitButton from "../components/SubmitButton";
import { ReactComponent as PictureIcon } from "../../../assets/picture.svg";
import { ReactComponent as VedioIcon } from "../../../assets/vedio.svg";

const ClassForm = ({ onRegister }) => {
  const [formState, setFormState] = useState({
    name: "",
    price: "",
    level: 0,
    genres: [],
    description: "",
    recommendedFor: "",
    images: ["", "", ""], // 수업 사진 3개
    video: "",
    url: "",
  });

  // 등록 폼 상태 업데이트
  const updateForm = (key, value) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  // 수업 등록 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formState);
    console.log(formState); // 임시
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <InputContainer>
        <InputBox
          label="수업 이름"
          value={formState.name}
          onChange={(e) => updateForm("name", e.target.value)}
          placeholder="수업 이름을 입력하세요"
        />
        <InputBox
          label="회당 가격"
          value={formState.price}
          onChange={(e) => updateForm("price", e.target.value)}
          placeholder="회당 가격을 입력하세요"
        />
        <div>
          <Label>난이도</Label>
        </div>
        <GenreSelector
          selectedGenres={formState.genres}
          updateForm={updateForm}
        />
        <TextareaBox
          label="수업 소개"
          value={formState.description}
          onChange={(e) => updateForm("description", e.target.value)}
          placeholder="시간, 장소, 가격 등 수업에 대한 자세한 소개를 입력하세요"
        />
        <TextareaBox
          label="수업 추천 대상"
          value={formState.recommendedFor}
          onChange={(e) => updateForm("recommendedFor", e.target.value)}
          placeholder="이 수업은 누구에게 추천하며, 그 이유를 입력하세요"
        />
        <NoticedLabel>
          <Label>
            수업 사진 <LabelSpan>(0/3)</LabelSpan>
          </Label>
          <Notice>*수업 사진이 없는 경우, 댄서 사진을 업로드 해주세요</Notice>
        </NoticedLabel>
        <ImageUploadWrapper>
          {formState.images.map((image, index) => (
            <FileUploader key={index} Icon={PictureIcon} accept="image/*" />
          ))}
        </ImageUploadWrapper>
        <NoticedLabel>
          <Label>수업 영상</Label>
          <Notice>
            {"\n"} *영상 파일 혹은 url 중 하나의 형식을 선택해 업로드 해주세요{" "}
            {"\n"} *수업 영상이 없는 경우, 댄서 영상을 업로드 해주세요
          </Notice>
        </NoticedLabel>
        <VideoUploadWrapper>
          <FileUploader Icon={VedioIcon} accept="video/*" />
        </VideoUploadWrapper>
        <UrlBox
          value={formState.url}
          onChange={(e) => updateForm("url", e.target.value)}
          placeholder="동영상 링크를 붙여넣으세요"
        />
      </InputContainer>

      <Notice>
        *댄스 수업 등록은 내부 운영팀의 심사를 통해 최종 승인됩니다
      </Notice>
      <SubmitButton text="댄스 수업 등록하기" />
    </FormContainer>
  );
};

export default ClassForm;

const FormContainer = styled.form`
  justify-items: center;
  padding-bottom: 143px;
`;
const InputContainer = styled.div`
  width: 900px;
  flex-shrink: 0;
  padding-top: 58px;
  padding-bottom: 80px;
  margin-bottom: 43px;
  justify-items: center;
  border-radius: 25px;
  border: 2px solid var(--main_purple, #9819c3);
`;
const NoticedLabel = styled.div`
  display: grid;
  grid-template-columns: 165px auto;
  align-items: center;
  justify-content: flex-start;
  width: 589px;
`;
const ImageUploadWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 13.5px;
  width: 627px;
  height: 200px;
  flex-shrink: 0;
  margin-top: 32px;
  margin-bottom: 63px;
`;
const VideoUploadWrapper = styled.div`
  display: flex;
  width: 589px;
  height: 200px;
  flex-shrink: 0;
  margin-top: 25px;
  margin-bottom: 46px;
`;
const Label = styled.div`
  margin-left: 8px;
  color: var(--main_white, #fff);
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const LabelSpan = styled.span`
  color: var(--main_white, #fff);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const Notice = styled.div`
  color: var(--text_secondary-gray, #b2b2b2);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  white-space: pre-line;
`;
