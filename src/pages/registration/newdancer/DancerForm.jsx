import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Input, Textarea } from '../components/Inputs';
import GenreSelector from '../components/GenreSelector';
import ImagesUploader from '../components/ImagesUploader';
import SubmitButton from '../components/SubmitButton';
import ConfirmLeaveAlert from '../../../components/ConfirmLeaveAlert';
import SingleBtnAlert from '../../../components/SingleBtnAlert';
import useConfirmLeave from '../../../hooks/useConfirmLeave';
import api from '../../../api/api';

const DancerForm = ({ setIsRegistered }) => {
  const [isValid, setIsValid] = useState(false);
  const [showInvalidAlert, setShowInvalidAlert] = useState(false);
  const [showLeaveAlert, setShowLeaveAlert] = useState(false);
  const [formState, setFormState] = useState({
    dancerName: '',
    instargramId: '',
    openChatUrl: '',
    bio: '',
    history: '',
    preferredGenres: [],
    dancerImages: ['', '', '']
  });

  // 뒤로 가기 방지 팝업 경고
  useConfirmLeave({ setAlert: setShowLeaveAlert });

  // 유효성 검사 (임시)
  useEffect(() => {
    const isDancerNameValid =
      formState.dancerName.trim().length > 0 &&
      formState.dancerName.trim().length <= 20;
    const isInstargramIdValid =
      formState.instargramId.trim().length > 0 &&
      formState.instargramId.trim().length <= 20;
    const isOpenChatUrlValid = formState.openChatUrl.startsWith('http');
    const isBioValid = formState.bio.length <= 80;
    const isPreferredpreferredGenresValid =
      formState.preferredGenres.length > 0 &&
      formState.preferredGenres.length <= 2;
    const isHistoryValid = formState.history.length <= 1000;
    const isDancerImagesValid =
      formState.dancerImages.filter((img) => img !== null).length <= 3;

    // 모든 필드가 유효하면 true
    setIsValid(
      isDancerNameValid &&
        isInstargramIdValid &&
        isOpenChatUrlValid &&
        isBioValid &&
        isPreferredpreferredGenresValid &&
        isHistoryValid &&
        isDancerImagesValid
    );
  }, [formState]);

  // 등록 폼 상태 업데이트
  const handleFormChange = (key, value) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  // 댄서 정보 등록
  const postDancer = async () => {
    try {
      const response = await api.post('/dancers', formState, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('댄서 등록 성공:', response.data);
      setIsRegistered(true);
    } catch (error) {
      console.error('댄서 등록 실패:', error.response?.data || error.message);
    }
  };

  // 수업 등록 폼 제출 핸들러
  const handleSubmit = (e) => {
    console.log(formState);
    e.preventDefault();
    if (!isValid) {
      setShowInvalidAlert(true);
      return;
    }
    postDancer();
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
          value={formState.openChatUrl}
          onChange={(e) => handleFormChange('openChatUrl', e.target.value)}
          placeholder="카카오톡 오픈채팅방 링크를 입력하세요."
          maxLength={255}
        />

        <LabelWrapper>
          <Label>한 마디 소개글</Label>
          <Notice>* 최대 60자까지 입력 가능합니다.</Notice>
        </LabelWrapper>
        <Input
          label="한 마디 소개글"
          value={formState.bio}
          onChange={(e) => handleFormChange('bio', e.target.value)}
          placeholder="한 마디 소개글을 입력하세요."
          maxLength={60}
        />

        <LabelWrapper>
          <Label>주 장르</Label>
          <Notice>* 최대 2개까지 선택 가능합니다.</Notice>
        </LabelWrapper>
        <GenreSelector
          selectedGenres={formState.preferredGenres}
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
          isFor="dancer"
          images={formState.dancerImages}
          handleFormChange={handleFormChange}
        />
      </InputContainer>

      <Notice>* 댄서 등록은 내부 운영팀의 심사를 통해 최종 승인됩니다.</Notice>
      <SubmitButton text="댄서 등록하기" />

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
  font-style: normal;
  font-weight: 600;
  line-height: 21px;
  white-space: pre-line;
`;
const ColoredText = styled.span`
  color: #a60f62;
  font-weight: bold;
`;
