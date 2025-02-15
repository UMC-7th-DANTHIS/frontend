import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import SingleBtnAlert from '../SingleBtnAlert';
import ConfirmLeaveAlert from '../ConfirmLeaveAlert';

import axiosInstance from '../../api/axios-instance';
import getPresignedUrls from '../../hooks/getPresignedUrls';

const EditFooter = ({
  handleFileChange,
  content,
  title,
  fileName,
  fileObjects
}) => {
  const navigate = useNavigate();
  const [showInvalidAlert, setShowInvalidAlert] = useState(false);
  const [showCancelAlert, setShowCancelAlert] = useState(false);

  const handleSubmit = async () => {
    if (!content || !title) setShowInvalidAlert(true);
    else {
      const fileExtensions = fileName.map((name) =>
        name.split('.').pop().toLowerCase()
      );
      const presignedUrls = await getPresignedUrls(fileExtensions);

      if (!presignedUrls) return;

      const uploadedImageUrls = [];

      for (let i = 0; i < fileObjects.length; i++) {
        const success = await uploadToS3(
          presignedUrls[i].presignedUrl,
          fileObjects[i]
        );

        if (success) {
          uploadedImageUrls.push(presignedUrls[i].fileUrl);
        }
      }

      if (uploadedImageUrls.length === fileName.length) {
        await createPost(title, content, uploadedImageUrls);
      } else {
        alert(
          '🚨 일부 이미지 업로드 실패로 인해 게시글 작성이 중단되었습니다.'
        );
      }
    }
  };

  const uploadToS3 = async (presignedUrl, file) => {
    try {
      const response = await axios.put(presignedUrl, file, {
        headers: {
          'Content-Type': file.type || 'image/jpeg'
        }
      });
      return response.status === 200;
    } catch (error) {
      console.error('S3 업로드 실패:', error);
      return false;
    }
  };

  const createPost = async (title, content, uploadedImageUrls) => {
    const postData = {
      title,
      content,
      images: uploadedImageUrls
    };

    try {
      await axiosInstance.post(`/community/posts`, postData);
      navigate('/community');
    } catch (error) {
      console.error('게시글 작성 실패:', error);
    }
  };

  const handleCancel = () => {
    if (content || title || fileName) setShowCancelAlert(true);
    else {
      navigate('/community');
    }
  };

  return (
    <>
      <ButtonContainer>
        <LeftButtons>
          <ImageInput>
            사진
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              accept="image/*"
            />
          </ImageInput>
          <CatuionContainer>
            <CautionText>*사진은 최대 4장까지 등록 가능합니다.</CautionText>
            <CautionText>
              * 과도한 비방 및 욕설이 포함된 게시글은 신고에 의해 무통보 삭제될
              수 있습니다.
            </CautionText>
            <CautionText>
              * 초상권, 저작권 침해 및 기타 위법한 게시글은 관리자에 의해 무통보
              삭제될 수 있습니다.
            </CautionText>
          </CatuionContainer>
        </LeftButtons>
        <RightButtons>
          <CancelButton onClick={() => handleCancel()}>취소</CancelButton>
          <SubmitButton onClick={() => handleSubmit()}>작성</SubmitButton>
        </RightButtons>
      </ButtonContainer>

      {showInvalidAlert && (
        <SingleBtnAlert
          message={
            <AlertText>
              모든 항목을 {'\n'}
              <ColoredText>적절하게 </ColoredText>
              입력했는지 확인해주세요.
            </AlertText>
          }
          onClose={() => setShowInvalidAlert(false)}
          mariginsize="33px"
          showButtons={true}
        />
      )}

      {showCancelAlert && (
        <ConfirmLeaveAlert
          message={
            <AlertText>
              해당 페이지를 벗어나면{'\n'}
              작성 중인 정보가 <ColoredText> 모두 삭제</ColoredText>됩니다.
              {'\n'}
              떠나시겠습니까?
            </AlertText>
          }
          onClose={() => setShowCancelAlert(false)}
          showButtons={true}
        />
      )}
    </>
  );
};

const CatuionContainer = styled.div`
  color: white;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const CautionText = styled.div``;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 21px;
  margin-left: 40px;
  margin-right: 14px;
`;

const ImageInput = styled.label`
  display: inline-flex;
  background-color: transparent;
  border: 2px solid #9819c3;
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-align: center;

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
  background-color: transparent;
  border: 2px solid #9819c3;
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;

  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  &:hover {
    background-color: #9819c3;
    color: #fff;
  }
`;

const SubmitButton = styled.button`
  background-color: #9819c3;
  border: none;
  color: #fff;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;

  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

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
