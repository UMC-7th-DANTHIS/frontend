import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import { ModalOneBtn, ModalTwoBtns } from '../../components/modals';

import getPresignedUrls, { PresignedUrlInterface } from '../../hooks/getPresignedUrls';
import useIsMobile from '../../hooks/useIsMobile';

interface EditFooterProps {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
  content: string;
  fileName: string[];
  fileObjects: File[];
  setForceReload?: React.Dispatch<React.SetStateAction<boolean>>;
  createPost: (title: string, content: string, uploadedImageUrls: string[]) => Promise<void>;
}

const EditFooter = ({ handleFileChange, content, title, fileName, fileObjects, createPost }: EditFooterProps) => {
  const navigate = useNavigate();

  const [showInvalidAlert, setShowInvalidAlert] = useState<boolean>(false);
  const [showCancelAlert, setShowCancelAlert] = useState<boolean>(false);

  const isMobile = useIsMobile();

  // presignedUrl로 아마존 서버에 이미지 올리고 url 유효하게 하기
  const uploadToS3 = async (presignedUrl: string, file: File): Promise<boolean> => {
    try {
      const response = await axios.put(presignedUrl, file, {
        headers: {
          'Content-Type': file.type || 'image/jpeg'
        }
      });
      return response.status === 200;
    } catch (error) {
      alert('S3 업로드 실패');
      return false;
    }
  };

  // 이미지 서버에 올리기
  const handleSubmit = async (): Promise<void> => {
    if (!content || !title) setShowInvalidAlert(true);
    else {
      const fileExtensions: string[] = fileName.map((name: any) => name.split('.').pop().toLowerCase());
      const presignedUrls: PresignedUrlInterface[] | void = await getPresignedUrls(fileExtensions);

      if (!presignedUrls) return;

      const uploadedImageUrls: string[] = [];

      for (let i = 0; i < fileObjects.length; i++) {
        const success = await uploadToS3(presignedUrls[i].presignedUrl, fileObjects[i]);

        if (success) {
          uploadedImageUrls.push(presignedUrls[i].fileUrl);
        }
      }

      if (uploadedImageUrls.length === fileName.length) {
        await createPost(title, content, uploadedImageUrls);
      } else {
        alert('일부 이미지 업로드 실패로 인해 게시글 작성이 중단되었습니다.');
      }
    }
  };

  const handleCancel = (): void => {
    if (content || title || fileName) setShowCancelAlert(true);
    else {
      navigate('/community');
    }
  };

  return (
    <>
      <ButtonContainer>
        {isMobile ? (
          <>
            <CatuionContainer>
              <CautionText>*사진은 최대 4장까지 등록 가능합니다.</CautionText>
              <CautionText>* 과도한 비방 및 욕설이 포함된 게시글은 신고에 의해 무통보 삭제될 수 있습니다.</CautionText>
              <CautionText>
                * 초상권, 저작권 침해 및 기타 위법한 게시글은 관리자에 의해 무통보 삭제될 수 있습니다.
              </CautionText>
            </CatuionContainer>

            <Wrapper>
              <LeftButtons>
                <ImageInput>
                  사진
                  <input type="file" multiple onChange={handleFileChange} accept="image/*" />
                </ImageInput>
              </LeftButtons>

              <RightButtons>
                <CancelButton onClick={(): void => handleCancel()}>취소</CancelButton>
                <SubmitButton onClick={(): Promise<void> => handleSubmit()}>작성</SubmitButton>
              </RightButtons>
            </Wrapper>
          </>
        ) : (
          <>
            <LeftButtons>
              <ImageInput>
                사진
                <input type="file" multiple onChange={handleFileChange} accept="image/*" />
              </ImageInput>
              <CatuionContainer>
                <CautionText>*사진은 최대 4장까지 등록 가능합니다.</CautionText>
                <CautionText>
                  * 과도한 비방 및 욕설이 포함된 게시글은 신고에 의해 무통보 삭제될 수 있습니다.
                </CautionText>
                <CautionText>
                  * 초상권, 저작권 침해 및 기타 위법한 게시글은 관리자에 의해 무통보 삭제될 수 있습니다.
                </CautionText>
              </CatuionContainer>
            </LeftButtons>
            <RightButtons>
              <CancelButton onClick={(): void => handleCancel()}>취소</CancelButton>
              <SubmitButton onClick={(): Promise<void> => handleSubmit()}>작성</SubmitButton>
            </RightButtons>
          </>
        )}
      </ButtonContainer>

      {showInvalidAlert && (
        <ModalOneBtn
          message={
            <AlertText>
              모든 항목을 {'\n'}
              <ColoredText>적절하게 </ColoredText>
              입력했는지 확인해주세요.
            </AlertText>
          }
          onClose={(): void => setShowInvalidAlert(false)}
          showButtons={true}
        />
      )}

      {showCancelAlert && (
        <ModalTwoBtns
          message={
            <AlertText>
              해당 페이지를 벗어나면{'\n'}
              작성 중인 정보가 <ColoredText> 모두 삭제</ColoredText>됩니다.
              {'\n'}
              떠나시겠습니까?
            </AlertText>
          }
          onClose={(): void => setShowCancelAlert(false)}
          onSecondaryClick={() => navigate('/community')}
          showButtons={true}
          primaryLabel="남기"
          secondaryLabel="떠나기"
        />
      )}
    </>
  );
};

const CatuionContainer = styled.div`
  color: white;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  margin-top: 30px;
  ${({ theme }) => theme.media.tablet} {
    font-size: 12px;
    margin-top: 0px;
  }
`;

const CautionText = styled.div``;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 21px;

  ${({ theme }) => theme.media.tablet} {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    justify-items: center;
    align-items: center;

    min-height: max-content;
    height: 100%;
    margin-top: 21px;
    margin-left: 10px;
    margin-right: 10px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const ImageInput = styled.label`
  display: flex;

  background-color: transparent;
  border: 2px solid #9819c3;
  color: #ffffff;
  height: 100%;

  justify-content: center;
  align-items: center;

  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-align: center;
  min-height: 36px;
  min-width: 64px;

  &:hover {
    background-color: #9819c3;
    color: #fff;
  }

  input[type='file'] {
    display: none;
  }
`;

const LeftButtons = styled.div`
  display: flex;
  gap: 30px;
`;

const RightButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const CancelButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: transparent;
  border: 2px solid #9819c3;
  color: #ffffff;
  border-radius: 10px;
  cursor: pointer;

  font-size: 16px;
  font-style: normal;
  font-weight: 600;

  line-height: normal;
  text-align: center;
  min-height: 36px;
  min-width: 64px;
  &:hover {
    background-color: #9819c3;
    color: #fff;
  }
`;

const SubmitButton = styled.button`
  background-color: #9819c3;
  border: none;
  color: #fff;
  border-radius: 10px;
  cursor: pointer;

  font-size: 16px;
  font-style: normal;

  font-weight: 600;
  line-height: normal;
  text-align: center;
  min-height: 36px;
  min-width: 64px;
  &:hover {
    background-color: #7c16a6;
  }
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

export default EditFooter;
