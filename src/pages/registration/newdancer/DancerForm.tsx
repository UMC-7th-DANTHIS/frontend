import { useState, useCallback } from 'react';
import styled from 'styled-components';

import { Input, Textarea } from '../_components/Inputs';
import { GenreSelectorDancer } from '../_components/GenreSelector';
import ImagesUploader from '../_components/ImagesUploader';
import SubmitButton from '../_components/SubmitButton';
import FormAlert from '../_components/FormAlert';

import { DancerFormState } from '../../../types/RegisterFormInterface';
import useConfirmLeave from '../../../hooks/useConfirmLeave';
import useValidation from '../../../hooks/useValidation';
import { postDancer } from '../../../api/registration';
import { IS_FOR } from '../../../enum/registration';

interface DancerFormProps {
  setIsRegistered: React.Dispatch<React.SetStateAction<boolean>>;
}

const DancerForm = ({ setIsRegistered }: DancerFormProps) => {
  const [formState, setFormState] = useState<DancerFormState>({
    dancerName: '',
    instargramId: '',
    openChatUrl: '',
    bio: '',
    history: '',
    preferredGenres: [],
    dancerImages: ['', '', '']
  });
  const [showInvalidAlert, setShowInvalidAlert] = useState<boolean>(false);
  const [showLeaveAlert, setShowLeaveAlert] = useState<boolean>(false);
  const isValid = useValidation(formState, IS_FOR.DANCER);

  // 뒤로 가기 방지 팝업 경고
  useConfirmLeave({ setAlert: setShowLeaveAlert });

  // 등록 폼 상태 업데이트
  const handleFormChange = useCallback(<K extends keyof DancerFormState>(key: K, value: DancerFormState[K]) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedFormState = {
      ...formState,
      dancerImages: formState.dancerImages.filter((img) => img) // ''  값 제거
    };

    if (!isValid) {
      setShowInvalidAlert(true);
      return;
    }

    try {
      const data = await postDancer(updatedFormState);
      if (data) setIsRegistered(true);
    } catch (error) {
      console.error('❌ 댄서 등록 실패:', error);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <InputContainer>
        <LabelWrapper>
          <Label>댄서 네임</Label>
        </LabelWrapper>
        <Input
          label="댄서 네임"
          value={formState.dancerName}
          onChange={(e) => handleFormChange('dancerName', e.target.value)}
          placeholder="댄서 네임을 입력하세요."
          maxLength={20}
        />

        <LabelWrapper>
          <Label>Instagram 아이디</Label>
        </LabelWrapper>
        <Input
          label="Instagram 아이디"
          value={formState.instargramId}
          onChange={(e) => handleFormChange('instargramId', e.target.value)}
          placeholder="Instagram 아이디를 입력하세요."
        />

        <LabelWrapper>
          <Label>오픈채팅방 링크</Label>
          <Notice>*유저들과의 채팅이 이루어질 오픈채팅방 링크를 입력해주세요.</Notice>
        </LabelWrapper>
        <Input
          label="오픈채팅방 링크"
          value={formState.openChatUrl}
          onChange={(e) => handleFormChange('openChatUrl', e.target.value)}
          placeholder="카카오톡 오픈채팅방 링크를 입력하세요."
        />

        <LabelWrapper>
          <Label>한 마디 소개글</Label>
          <Notice>*최대 60자까지 입력 가능합니다.</Notice>
        </LabelWrapper>
        <Input
          label="한 마디 소개글"
          value={formState.bio}
          onChange={(e) => handleFormChange('bio', e.target.value)}
          placeholder="한 마디 소개글을 입력하세요."
        />

        <LabelWrapper>
          <Label>주 장르</Label>
          <Notice>*최대 2개까지 선택 가능합니다.</Notice>
        </LabelWrapper>
        <GenreSelectorDancer selectedGenres={formState.preferredGenres} handleFormChange={handleFormChange} />

        <LabelWrapper>
          <Label>댄서 이력</Label>
          <Notice>*최대 1000자까지 입력 가능합니다.</Notice>
        </LabelWrapper>
        <Textarea
          label="댄서 이력"
          value={formState.history}
          onChange={(e) => handleFormChange('history', e.target.value)}
          placeholder="댄서 이력을 입력하세요."
        />

        <LabelWrapper $long>
          <Label>댄서 사진</Label>
          <Notice>*최대 3장까지 등록 가능합니다. {'\n'}*가장 첫 번째로 등록된 사진이 프로필로 사용됩니다.</Notice>
        </LabelWrapper>
        <ImagesUploader isFor={IS_FOR.DANCER} images={formState.dancerImages} handleFormChange={handleFormChange} />
      </InputContainer>

      <Notice>* 댄서 등록은 내부 운영팀의 심사를 통해 최종 승인됩니다.</Notice>
      <SubmitButton text="댄서 등록하기" />

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

export default DancerForm;

const FormContainer = styled.form`
  justify-items: center;
  padding-bottom: 143px;
`;
const InputContainer = styled.div`
  width: 900px;
  padding-top: 63px;
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
