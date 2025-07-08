import { useState, useCallback } from 'react';
import styled from 'styled-components';

import ConfirmLeaveAlert from '../../components/ConfirmLeaveAlert';
import SingleBtnAlert from '../../components/SingleBtnAlert';
import {
  GenreSelectorClass,
  ImagesUploader,
  Input,
  StarRating,
  SubmitButton,
  TagSelector,
  Textarea,
  VideoUploader
} from '.';

import { ClassFormState } from '../../types/register';
import useValidation from '../../hooks/registration/useValidation';
import usePostClass from '../../hooks/registration/usePostClass';
import useConfirmLeave from '../../hooks/useConfirmLeave';

interface ClassFormProps {
  setIsRegistered: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ClassForm({ setIsRegistered }: ClassFormProps) {
  const [formState, setFormState] = useState<ClassFormState>({
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
  const isValid = useValidation(formState, 'class');
  const [showInvalidAlert, setShowInvalidAlert] = useState<boolean>(false);
  const [showLeaveAlert, setShowLeaveAlert] = useState<boolean>(false);

  const { mutate: postClass } = usePostClass();

  // 뒤로 가기 방지 팝업 경고
  useConfirmLeave({ setAlert: setShowLeaveAlert });

  const handleFormChange = useCallback(<K extends keyof ClassFormState>(key: K, value: ClassFormState[K]) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedFormState = {
      ...formState,
      pricePerSession: Number(formState.pricePerSession) || 0, // 빈 값이면 0 처리
      images: formState.images.filter((img) => img) // ''  값 제거
    };

    if (!isValid) {
      setShowInvalidAlert(true);
      return;
    }

    postClass(updatedFormState, { onSuccess: () => setIsRegistered(true) });
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
        <ImagesUploader isFor="class" images={formState.images} handleFormChange={handleFormChange} />
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
      {showInvalidAlert && (
        <SingleBtnAlert
          message={
            <AlertText>
              모든 항목을{'\n'}
              <ColoredText>적절하게 </ColoredText>
              입력했는지 확인해주세요.
            </AlertText>
          }
          onClose={() => setShowInvalidAlert(false)}
          mariginsize="33px"
          showButtons={true}
        />
      )}
      {showLeaveAlert && (
        <ConfirmLeaveAlert
          message={
            <AlertText>
              해당 페이지를 벗어나면{'\n'}
              작성 중인 정보가 <ColoredText> 모두 삭제</ColoredText>됩니다.
              {'\n'}
              떠나시겠습니까?
            </AlertText>
          }
          onClose={() => setShowLeaveAlert(false)}
          showButtons={true}
        />
      )}
    </FormContainer>
  );
}

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
const AlertText = styled.span`
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px;
  white-space: pre-line;
`;
const ColoredText = styled.span`
  color: #a60f62;
  font-weight: bold;
`;
