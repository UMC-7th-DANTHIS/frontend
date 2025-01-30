import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Input, Textarea } from '../components/Inputs';
import GenreSelector from '../components/GenreSelector';
import ImagesUploader from '../components/ImagesUploader';
import SubmitButton from '../components/SubmitButton';
import SingleBtnAlert from '../../../components/SingleBtnAlert';

const DancerForm = ({ onRegister }) => {
  const [isValid, setIsValid] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    instagramId: '',
    openchatUrl: '',
    introduction: '',
    genres: [],
    history: '',
    images: [null, null, null]
  });

  // 유효성 검사 (임시)
  useEffect(() => {
    const isNameValid =
      formState.name.trim().length > 0 && formState.name.trim().length <= 20;
    const isInstagramIdValid =
      formState.instagramId.trim().length > 0 &&
      formState.instagramId.trim().length <= 20;
    const isOpenchatUrlValid = formState.openchatUrl.startsWith('http');
    const isIntroductionValid = formState.introduction.length <= 80;
    const isGenresValid =
      formState.genres.length > 0 && formState.genres.length <= 2;
    const isHistoryValid = formState.history.length <= 1000;
    const isImagesValid =
      formState.images.filter((img) => img !== null).length <= 3;

    // 모든 필드가 유효하면 true
    setIsValid(
      isNameValid &&
        isInstagramIdValid &&
        isOpenchatUrlValid &&
        isIntroductionValid &&
        isGenresValid &&
        isHistoryValid &&
        isImagesValid
    );
  }, [formState]);

  // 등록 폼 상태 업데이트
  const handleFormChange = (key, value) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  // 수업 등록 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onRegister(formState);
      console.log(formState); // 임시
    } else {
      setShowAlert(true); // 제출 불가능한 상태에서 클릭 시도하면 팝업창 생성
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
          value={formState.name}
          onChange={(e) => handleFormChange('name', e.target.value)}
          placeholder="댄서 네임을 입력하세요."
          maxLength={20}
        />

        <LabelWrapper>
          <Label>Instagram 아이디</Label>
        </LabelWrapper>
        <Input
          label="Instagram 아이디"
          value={formState.instagramId}
          onChange={(e) => handleFormChange('instagramId', e.target.value)}
          placeholder="Instagram 아이디를 입력하세요."
          maxLength={20}
        />

        <LabelWrapper>
          <Label>오픈채팅방 링크</Label>
          <Notice>
            * 유저들과의 채팅이 이루어질 오픈채팅방 링크를 입력해주세요.
          </Notice>
        </LabelWrapper>
        <Input
          label="오픈채팅방 링크"
          value={formState.openchatUrl}
          onChange={(e) => handleFormChange('openchatUrl', e.target.value)}
          placeholder="카카오톡 오픈채팅방 링크를 입력하세요."
          maxLength={255}
        />

        <LabelWrapper>
          <Label>한 마디 소개글</Label>
          <Notice>* 최대 80자까지 입력 가능합니다.</Notice>
        </LabelWrapper>
        <Input
          label="한 마디 소개글"
          value={formState.introduction}
          onChange={(e) => handleFormChange('introduction', e.target.value)}
          placeholder="한 마디 소개글을 입력하세요."
          maxLength={80}
        />

        <LabelWrapper>
          <Label>주 장르</Label>
          <Notice>* 최대 2개까지 선택 가능합니다.</Notice>
        </LabelWrapper>
        <GenreSelector
          selectedGenres={formState.genres}
          handleFormChange={handleFormChange}
        />

        <LabelWrapper>
          <Label>댄서 이력</Label>
          <Notice>* 최대 1000자까지 입력 가능합니다.</Notice>
        </LabelWrapper>
        <Textarea
          label="댄서 이력"
          value={formState.history}
          onChange={(e) => handleFormChange('history', e.target.value)}
          placeholder="댄서 이력을 입력하세요."
          maxLength={1000}
        />

        <LabelWrapper>
          <Label>댄서 사진</Label>
          <Notice>
            * 최대 3장까지 등록 가능합니다. {'\n'}* 가장 첫 번째로 등록된 사진이
            프로필로 사용됩니다.
          </Notice>
        </LabelWrapper>
        <ImagesUploader
          images={formState.images}
          handleFormChange={handleFormChange}
        />
      </InputContainer>

      <Notice>* 댄서 등록은 내부 운영팀의 심사를 통해 최종 승인됩니다.</Notice>
      <SubmitButton text="댄서 등록하기" />

      {showAlert && (
        <SingleBtnAlert
          message={
            <AlertText>
              모든 항목을{'\n'}
              <ColoredText>적절하게 </ColoredText>
              입력했는지 확인해주세요.
            </AlertText>
          }
          onClose={() => setShowAlert(false)}
          mariginsize="33px"
          showButtons={true}
        />
      )}
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
const LabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
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
  margin-left: 20px;
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
  white-space: pre-line;
`;
const ColoredText = styled.span`
  color: #a60f62;
  font-weight: bold;
`;
