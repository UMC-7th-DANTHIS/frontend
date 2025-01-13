import React, { useState } from "react";
import styled from "styled-components";
import { Input, Textarea } from "../components/Inputs";
import GenreSelector from "../components/GenreSelector";
import ImagesUploader from "../components/ImagesUploader";
import SubmitButton from "../components/SubmitButton";

const DancerForm = ({ onRegister }) => {
  const [formState, setFormState] = useState({
    name: "",
    instagramId: "",
    openchatUrl: "",
    introduction: "",
    genres: [],
    history: "",
    images: [null, null, null, null],
  });

  // 등록 폼 상태 업데이트
  const handleFormChange = (key, value) => {
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
        <Input
          label="댄서 네임"
          value={formState.name}
          onChange={(e) => handleFormChange("name", e.target.value)}
          placeholder="댄서 네임을 입력하세요"
        />
        <Input
          label="Instagram 아이디"
          value={formState.instagramId}
          onChange={(e) => handleFormChange("instagramId", e.target.value)}
          placeholder="Instagram 아이디를 입력하세요"
        />
        <NoticedLabel>
          <Label>오픈채팅방 링크</Label>
          <Notice>
            *유저들과의 채팅이 이루어질 오픈채팅방 링크를 입력해주세요
          </Notice>
        </NoticedLabel>
        <Input
          value={formState.openchatUrl}
          onChange={(e) => handleFormChange("openchatUrl", e.target.value)}
          placeholder="카카오톡 오픈채팅방 링크를 입력하세요"
        />
        <Input
          label="한 마디 소개글"
          value={formState.introduction}
          onChange={(e) => handleFormChange("introduction", e.target.value)}
          placeholder="한 마디 소개글을 입력하세요"
        />
        <GenreSelector
          selectedGenres={formState.genres}
          handleFormChange={handleFormChange}
        />
        <Textarea
          label="댄서 이력"
          value={formState.history}
          onChange={(e) => handleFormChange("history", e.target.value)}
          placeholder="댄서 이력을 입력하세요"
        />
        <NoticedLabel>
          <Label>댄서 사진</Label>
          <Notice>
            {"\n"} *최대 4장까지 등록 가능합니다
            {"\n"} *가장 첫 번째로 등록된 사진이 프로필로 사용됩니다
          </Notice>
        </NoticedLabel>
        <ImagesUploader
          images={formState.images}
          handleFormChange={handleFormChange}
        />
      </InputContainer>

      <Notice>*댄서 등록은 내부 운영팀의 심사를 통해 최종 승인됩니다.</Notice>
      <SubmitButton text="댄서 등록하기" />
    </FormContainer>
  );
};

export default DancerForm;

const FormContainer = styled.form`
  justify-items: center;
  padding-bottom: 143px;
`;
const InputContainer = styled.div`
  width: 900px;
  flex-shrink: 0;
  padding-top: 63px;
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
const Label = styled.div`
  margin-left: 8px;
  color: var(--main_white, #fff);
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const Notice = styled.div`
  color: var(--text_secondary-gray, #b2b2b2);
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  white-space: pre-line;
`;
