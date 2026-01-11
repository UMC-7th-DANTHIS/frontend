import { useContext } from 'react';
import styled from 'styled-components';
import { MyNewClassContext } from './MyNewClassContext';
import { Input, Textarea } from '../../../../components/FormInputs';
import { ModalOneBtn, ModalTwoBtns } from '../../../../components/modals';
import { useNavigate } from 'react-router-dom';
import {
  GenreSelectorClass,
  ImagesUploader,
  LabeledBox,
  StarRating,
  SubmitButton,
  TagSelector,
  VideoUploader
} from '../form';
import { WeekdayOrDatePicker } from './WeekdayOrDatePicker';

export const ClassForm = () => {
  const navigate = useNavigate();
  const context = useContext(MyNewClassContext);

  const {
    title,
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
        <Title>{title}</Title>
        <FormContainer onSubmit={handleSubmit}>
          <InputContainer>
            {/* 수업 이릅 */}
            <LabeledBox label="수업 이름">
              <Input
                label="수업 이름"
                value={formState.className}
                onChange={(e) => handleFormChange('className', e.target.value)}
                placeholder="수업 이름을 입력하세요."
                maxLength={20}
              />
            </LabeledBox>

            {/* 회당 가격 */}
            <LabeledBox label="회당 가격">
              <Input
                label="회당 가격"
                value={formState.pricePerSession === 0 ? '' : String(formState.pricePerSession)}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (!isNaN(val)) {
                    handleFormChange('pricePerSession', val);
                  }
                }}
                placeholder="회당 가격을 입력하세요."
                type="number"
              />
            </LabeledBox>

            {/* 난이도 */}
            <LabeledBox label="난이도">
              <StarRating value={formState.difficulty} handleFormChange={handleFormChange} />
            </LabeledBox>

            {/* 장르 */}
            <LabeledBox label="장르" notice="*최대 1개까지 선택 가능합니다.">
              <GenreSelectorClass selectedGenre={formState.genre} handleFormChange={handleFormChange} />
            </LabeledBox>

            {/* 날짜 */}
            <LabeledBox label="날짜" notice="*수업을 진행하는 모든 날짜를 선택해주세요.">
              <WeekdayOrDatePicker days={formState.days} dates={formState.dates} handleFormChange={handleFormChange} />
            </LabeledBox>

            {/* 수업 소개 */}
            <LabeledBox label="수업 소개" notice="*최대 1000자까지 입력 가능합니다.">
              <Textarea
                label="수업 소개"
                value={formState.description}
                onChange={(e) => handleFormChange('description', e.target.value)}
                placeholder="시간, 장소, 가격 등 수업에 대한 자세한 소개를 입력하세요."
              />
            </LabeledBox>

            {/* 수업 추천 대상 */}
            <LabeledBox label="수업 추천 대상" notice="*최대 1000자까지 입력 가능합니다.">
              <Textarea
                label="수업 추천 대상"
                value={formState.targetAudience}
                onChange={(e) => handleFormChange('targetAudience', e.target.value)}
                placeholder="이 수업은 누구에게 추천하며, 그 이유를 입력하세요."
              />
            </LabeledBox>

            {/* 해시태그 */}
            <LabeledBox label="해시태그" notice="*최대 3개까지 선택 가능합니다.">
              <TagSelector selectedTags={formState.hashtags} handleFormChange={handleFormChange} />
            </LabeledBox>

            {/* 수업 사진 */}
            <LabeledBox
              isLong={true}
              label="수업 사진"
              notice={`*최대 3장까지 등록 가능합니다. \n*가장 첫 번째로 등록된 사진이 썸네일로 사용됩니다. \n*등록된 사진이 없는 경우, 댄서 등록 시 사용한 사진으로 자동 등록됩니다.`}
            >
              <ImagesUploader isFor="class" images={formState.images} handleFormChange={handleFormChange} />
            </LabeledBox>

            {/* 수업 영상 */}
            <LabeledBox
              isLong={true}
              label="수업 영상"
              notice={`*영상 파일 혹은 url 중 하나의 형식을 선택해 업로드 해주세요. \n*수업 영상이 없는 경우, 댄서 영상을 업로드 해주세요.`}
            >
              <VideoUploader video={formState.videoUrl} handleFormChange={handleFormChange} />
            </LabeledBox>
          </InputContainer>

          <Notice>*댄스 수업 등록은 내부 운영팀의 심사를 통해 최종 승인됩니다.</Notice>
          <SubmitButton text="댄스 수업 등록하기" />
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
const Title = styled.h1`
  color: var(--main-white);
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  white-space: normal;
  word-break: keep-all;
  overflow-wrap: break-word;

  ${({ theme }) => theme.media.tablet} {
    font-size: 28px;
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
const Notice = styled.div`
  margin-top: 36px;
  color: var(--main-white);
  text-align: center;
  white-space: normal;
  word-break: keep-all;
  overflow-wrap: break-word;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 300;

  ${({ theme }) => theme.media.tablet} {
    margin-top: 0;
    font-size: 16px;
  }
`;
const ColoredText = styled.span`
  color: #a60f62;
  font-weight: bold;
`;
