import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { Input, Textarea } from '../_components/Inputs';
import StarRating from '../_components/StarRating';
import { GenreSelectorClass } from '../_components/GenreSelector';
import ImagesUploader from '../_components/ImagesUploader';
import VideoUploader from '../_components/VideoUploader';
import SubmitButton from '../_components/SubmitButton';
import TagSelector from '../_components/TagSelector';
import FormAlert from '../_components/FormAlert';

import useConfirmLeave from '../../../hooks/useConfirmLeave';
import api from '../../../api/api';
import { ClassFormState } from '../../../types/RegisterFormInterface';
import useValidation from '../../../hooks/useValidation';
import { IS_FOR } from '../../../enum/registration';
import { updateClass } from '../../../api/registration';

const ClassRegisterEdit = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    className: '',
    pricePerSession: '',
    difficulty: 0,
    genre: 0,
    description: '',
    targetAudience: '',
    hashtags: [],
    images: ['', '', ''],
    videoUrl: ''
  });
  const [showInvalidAlert, setShowInvalidAlert] = useState<boolean>(false);
  const [showLeaveAlert, setShowLeaveAlert] = useState<boolean>(false);
  const isValid = useValidation(formState, IS_FOR.CLASS);

  const { classId } = useParams();

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const response = await api.get(`/dance-classes/${classId}`);
        const data = response.data.data;
        setFormState({
          className: data.className || '',
          pricePerSession: data.pricePerSession || '',
          difficulty: data.difficulty || 0,
          genre: data.genre || 0,
          description: data.details.description || '',
          targetAudience: data.details.targetAudience || 's',
          hashtags: data.details.hashtags || [],
          images: data.details.danceClassImages || ['', '', ''],
          videoUrl: data.details.videoUrl || ''
        });
      } catch (error: unknown) {
        console.error(error);
      }
    };
    fetchClassData();
  }, [classId]);

  // 뒤로 가기 방지 팝업 경고
  useConfirmLeave({ setAlert: setShowLeaveAlert });

  // 등록 폼 상태 업데이트
  const handleFormChange = useCallback(<K extends keyof ClassFormState>(key: K, value: ClassFormState[K]) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedFormState = {
      ...formState,
      pricePerSession: Number(formState.pricePerSession) || 0
    };

    if (!isValid) {
      setShowInvalidAlert(true);
      return;
    }

    try {
      const data = await updateClass(classId!, updatedFormState);
      if (data) navigate(`/mypage?menu=registeredclasses`);
    } catch (error) {
      console.error('❌ 수업 업데이트 실패:', error);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <InputContainer>
        <LabelWrapper>
          <Label>수업 이름</Label>
        </LabelWrapper>
        <Input
          label="수업 이름"
          value={formState.className}
          onChange={(e) => handleFormChange('className', e.target.value)}
          placeholder="수업 이름을 입력하세요."
          maxLength={20}
        />
        <LabelWrapper>
          <Label>회당 가격</Label>
        </LabelWrapper>
        <Input
          label="회당 가격"
          value={formState.pricePerSession}
          onChange={(e) => handleFormChange('pricePerSession', e.target.value)}
          placeholder="회당 가격을 입력하세요."
        />
        <LabelWrapper>
          <Label>난이도</Label>
        </LabelWrapper>
        <StarRating value={formState.difficulty} handleFormChange={handleFormChange} />
        <LabelWrapper>
          <Label>장르</Label>
          <Notice>*최대 1개까지 선택 가능합니다.</Notice>
        </LabelWrapper>
        <GenreSelectorClass selectedGenre={formState.genre} handleFormChange={handleFormChange} />
        <LabelWrapper>
          <Label>수업 소개</Label>
          <Notice>*최대 1000자까지 입력 가능합니다.</Notice>
        </LabelWrapper>
        <Textarea
          label="수업 소개"
          value={formState.description}
          onChange={(e) => handleFormChange('description', e.target.value)}
          placeholder="시간, 장소, 가격 등 수업에 대한 자세한 소개를 입력하세요."
        />
        <LabelWrapper>
          <Label>수업 추천 대상</Label>
          <Notice>*최대 1000자까지 입력 가능합니다.</Notice>
        </LabelWrapper>
        <Textarea
          label="수업 추천 대상"
          value={formState.targetAudience}
          onChange={(e) => handleFormChange('targetAudience', e.target.value)}
          placeholder="이 수업은 누구에게 추천하며, 그 이유를 입력하세요."
        />
        <LabelWrapper>
          <Label>해시태그</Label>
          <Notice>*최대 3개까지 선택 가능합니다.</Notice>
        </LabelWrapper>
        <TagSelector selectedTags={formState.hashtags} handleFormChange={handleFormChange} />

        <LabelWrapper $long>
          <Label>수업 사진</Label>
          <Notice>
            *최대 3장까지 등록 가능합니다.
            {'\n'} *가장 첫 번째로 등록된 사진이 썸네일로 사용됩니다.
            {'\n'} *등록된 사진이 없는 경우, 댄서 등록 시 사용한 사진으로 자동 등록됩니다.
          </Notice>
        </LabelWrapper>
        <ImagesUploader isFor={IS_FOR.CLASS} images={formState.images} handleFormChange={handleFormChange} />
        <LabelWrapper $long>
          <Label>수업 영상</Label>
          <Notice>
            *영상 파일 혹은 url 중 하나의 형식을 선택해 업로드 해주세요.
            {'\n'} *수업 영상이 없는 경우, 댄서 영상을 업로드 해주세요.
          </Notice>
        </LabelWrapper>
        <VideoUploader video={formState.videoUrl} handleFormChange={handleFormChange} />
      </InputContainer>

      <Notice>*댄스 수업 등록은 내부 운영팀의 심사를 통해 최종 승인됩니다.</Notice>
      <SubmitButton text="댄스 수업 등록하기" />

      {/* 경고 팝업창 */}
      <FormAlert
        showInvalidAlert={showInvalidAlert}
        setShowInvalidAlert={setShowInvalidAlert}
        showLeaveAlert={showLeaveAlert}
        setShowLeaveAlert={setShowLeaveAlert}
      />
    </FormContainer>
  );
};

export default ClassRegisterEdit;

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
const LabelWrapper = styled.div<{ $long?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: ${({ $long }) => ($long ? 'center' : 'flex-end')};
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
  margin-left: 20px;
  margin-bottom: 1px;
  color: var(--text_secondary-gray, #b2b2b2);
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  white-space: pre-line;
`;
