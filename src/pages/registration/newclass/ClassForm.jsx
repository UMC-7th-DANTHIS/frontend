import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Textarea, StarRating } from '../components/Inputs';
import GenreSelector from '../components/GenreSelector';
import ImagesUploader from '../components/ImagesUploader';
import VideoUploader from '../components/VideoUploader';
import SubmitButton from '../components/SubmitButton';

const ClassForm = ({ onRegister }) => {
  const [formState, setFormState] = useState({
    name: '',
    price: '',
    level: 0,
    genres: [],
    description: '',
    recommendedFor: '',
    images: [null, null, null, null],
    video: null,
    url: ''
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
          label="수업 이름"
          value={formState.name}
          onChange={(e) => handleFormChange('name', e.target.value)}
          placeholder="수업 이름을 입력하세요"
        />
        <Input
          label="회당 가격"
          value={formState.price}
          onChange={(e) => handleFormChange('price', e.target.value)}
          placeholder="회당 가격을 입력하세요"
        />
        <StarRating
          label="난이도"
          value={formState.level}
          handleFormChange={handleFormChange}
        />
        <GenreSelector
          selectedGenres={formState.genres}
          handleFormChange={handleFormChange}
        />
        <Textarea
          label="수업 소개"
          value={formState.description}
          onChange={(e) => handleFormChange('description', e.target.value)}
          placeholder="시간, 장소, 가격 등 수업에 대한 자세한 소개를 입력하세요"
        />
        <Textarea
          label="수업 추천 대상"
          value={formState.recommendedFor}
          onChange={(e) => handleFormChange('recommendedFor', e.target.value)}
          placeholder="이 수업은 누구에게 추천하며, 그 이유를 입력하세요"
        />
        <NoticedLabel>
          <Label>수업 사진</Label>
          <Notice>
            {'\n\n'} *최대 4장까지 등록 가능합니다
            {'\n'} *가장 첫 번째로 등록된 사진이 프로필로 사용됩니다
            {'\n'} *등록된 사진이 없는 경우, 댄서 등록 시 사용한 사진으로 자동
            등록됩니다
          </Notice>
        </NoticedLabel>
        <ImagesUploader
          images={formState.images}
          handleFormChange={handleFormChange}
        />
        <NoticedLabel>
          <Label>수업 영상</Label>
          <Notice>
            {'\n'} *영상 파일 혹은 url 중 하나의 형식을 선택해 업로드 해주세요{' '}
            {'\n'} *수업 영상이 없는 경우, 댄서 영상을 업로드 해주세요
          </Notice>
        </NoticedLabel>
        <VideoUploader
          video={formState.video}
          handleFormChange={handleFormChange}
        />
      </InputContainer>

      <Notice>
        *댄스 수업 등록은 내부 운영팀의 심사를 통해 최종 승인됩니다.
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
