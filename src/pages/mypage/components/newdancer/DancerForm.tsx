import styled from 'styled-components';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyNewDancerContext } from './MyNewDancerContext';
import { Tabs } from './Tabs';
import { GenreSelectorDancer, ImagesUploader, LabeledBox, SubmitButton } from '../form';
import { Input, Textarea } from '../../../../components/FormInputs';
import { ModalOneBtn, ModalTwoBtns } from '../../../../components/modals';

export const DancerForm = () => {
  const navigate = useNavigate();
  const context = useContext(MyNewDancerContext);

  const {
    formState,
    handleFormChange,
    handleSubmit,
    showInvalidAlert,
    setShowInvalidAlert,
    showLeaveAlert,
    setShowLeaveAlert
  } = context!;

  return (
    <>
      <Container>
        <Tabs />
        <FormContainer onSubmit={handleSubmit}>
          <InputContainer>
            {/* 댄서 네임 */}
            <LabeledBox label="댄서 네임">
              <Input
                label="댄서 네임"
                value={formState.dancerName}
                onChange={(e) => handleFormChange('dancerName', e.target.value)}
                placeholder="댄서 네임을 입력하세요."
                maxLength={20}
              />
            </LabeledBox>

            {/* Instagram 아이디 */}
            <LabeledBox label="Instagram 아이디">
              <Input
                label="Instagram 아이디"
                value={formState.instargramId}
                onChange={(e) => handleFormChange('instargramId', e.target.value)}
                placeholder="Instagram 아이디를 입력하세요."
              />
            </LabeledBox>

            {/* 오픈채팅방 링크 */}
            <LabeledBox
              label="오픈채팅방 링크"
              notice={`*유저들과의 채팅이 이루어질 \n오픈채팅방 링크를 입력해주세요.`}
            >
              <Input
                label="오픈채팅방 링크"
                value={formState.openChatUrl}
                onChange={(e) => handleFormChange('openChatUrl', e.target.value)}
                placeholder="카카오톡 오픈채팅방 링크를 입력하세요."
              />
            </LabeledBox>

            {/* 한 마디 소개글 */}
            <LabeledBox label="한 마디 소개글" notice="*최대 60자까지 입력 가능합니다.">
              <Input
                label="한 마디 소개글"
                value={formState.bio}
                onChange={(e) => handleFormChange('bio', e.target.value)}
                placeholder="한 마디 소개글을 입력하세요."
                maxLength={60}
              />
            </LabeledBox>

            {/* 주 장르 */}
            <LabeledBox label="주 장르" notice="*최대 2개까지 선택 가능합니다.">
              <GenreSelectorDancer selectedGenres={formState.preferredGenres} handleFormChange={handleFormChange} />
            </LabeledBox>

            {/* 댄서 이력 */}
            <LabeledBox label="댄서 이력" notice="*최대 1000자까지 입력 가능합니다.">
              <Textarea
                label="댄서 이력"
                value={formState.history}
                onChange={(e) => handleFormChange('history', e.target.value)}
                placeholder="댄서 이력을 입력하세요."
              />
            </LabeledBox>

            {/* 댄서 사진 */}
            <LabeledBox
              isLong={true}
              label="댄서 사진"
              notice={`*최대 3장까지 등록 가능합니다. \n*가장 첫 번째로 등록된 사진이 프로필로 사용됩니다.`}
            >
              <ImagesUploader isFor="dancer" images={formState.dancerImages} handleFormChange={handleFormChange} />
            </LabeledBox>
          </InputContainer>

          <SubmitButton text="프로필 저장" />
        </FormContainer>
      </Container>

      {showInvalidAlert && (
        <ModalOneBtn
          message={
            <span>
              모든 항목을{'\n'}
              <ColoredText>적절하게 </ColoredText>
              입력했는지 확인해주세요.
            </span>
          }
          onClose={() => setShowInvalidAlert(false)}
          showButtons={true}
        />
      )}

      {showLeaveAlert && (
        <ModalTwoBtns
          message={
            <span>
              해당 페이지를 벗어나면{'\n'}
              작성 중인 정보가 <ColoredText> 모두 삭제</ColoredText>됩니다.
              {'\n'}
              떠나시겠습니까?
            </span>
          }
          onClose={() => setShowLeaveAlert(false)}
          onSecondaryClick={() => navigate('/')}
          showButtons={true}
          primaryLabel="남기"
          secondaryLabel="떠나기"
        />
      )}
    </>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 50px;

  ${({ theme }) => theme.media.tablet} {
    max-width: 480px;
  }

  ${({ theme }) => theme.media.desktop} {
    max-width: 100%;
  }
`;
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-items: center;
  align-items: center;
  gap: 36px;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  justify-items: center;
  width: 100%;
  gap: 36px;
  border-radius: 18px;
  border: none;

  ${({ theme }) => theme.media.tablet} {
    border: 2px solid var(--main-purple);
    padding: 30px;
  }

  ${({ theme }) => theme.media.desktop} {
    border-radius: 25px;
    padding: 64px 52px;
  }

  ${({ theme }) => theme.media.max} {
    padding: 64px 100px;
  }
`;
const ColoredText = styled.span`
  color: #a60f62;
  font-weight: bold;
`;
