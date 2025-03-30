import styled from 'styled-components';
import PictureIcon from '../../../assets/picture.svg';
import EditIcon from '../../../assets/shape/write.svg';
import DeleteIcon from '../../../assets/shape/trash.svg';

import {
  DancerFormState,
  ClassFormState
} from '../../../types/RegisterFormInterface';
import { ImagesUploaderProps } from '../../../types/RegisterFormInterface';
import useImagePresignedUrl from '../../../hooks/registration/useImagePresignedUrl';
import MainBox from './MainBox';
import useUploadToS3 from '../../../hooks/registration/useUploadToS3';

const ImagesUploader = <T extends DancerFormState | ClassFormState>({
  isFor,
  images,
  handleFormChange
}: ImagesUploaderProps<T>) => {
  const totalImages = 3;

  const config: Record<
    'dancer' | 'class',
    { label: string; fieldName: keyof T; urlParam: string }
  > = {
    dancer: {
      label: 'Profile',
      fieldName: 'dancerImages' as keyof T,
      urlParam: 'dancer'
    },
    class: {
      label: 'Thumbnail',
      fieldName: 'images' as keyof T,
      urlParam: 'dance-class'
    }
  };

  const { label, fieldName, urlParam } = config[isFor] || {};

  const { getPresignedUrl } = useImagePresignedUrl(urlParam);
  const { uploadToS3 } = useUploadToS3();

  // 이미지 업데이트 로직
  const updateImageList = (index: number, newImageUrl: string) => {
    const updatedImages = images.map((img, i) =>
      i === index ? newImageUrl : img
    );

    handleFormChange(fieldName, updatedImages as T[typeof fieldName]);
  };

  // 이미지 업로드 핸들러
  const handleUploadFile = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0]; // 파일 가져오기
    if (!file || !file.type.startsWith('image/')) return;

    const presignedUrl = await getPresignedUrl(file);
    if (!presignedUrl) return;

    const uploadedImageUrl = await uploadToS3(presignedUrl, file);
    if (uploadedImageUrl) {
      updateImageList(index, uploadedImageUrl);
    }

    e.target.value = ''; // 파일 선택 초기화
  };

  return (
    <Container>
      {Array.from({ length: totalImages }, (_, index) => (
        <ImageWrapper key={index}>
          {/* MainBox는 가장 첫번째 사진에만 있는 박스 */}
          {index === 0 && <MainBox label={label} />}
          <Image htmlFor={`image-${index}`} $isEmpty={!images[index]}>
            {images[index] ? (
              <img src={images[index]} alt={`class-${index}`} />
            ) : (
              <PictureIcon />
            )}
          </Image>

          {/* 이미지가 업로드 안 된 상태에서만 박스 클릭 가능 */}
          <HiddenInput
            type="file"
            id={`image-${index}`}
            accept="image/*"
            onChange={(e) => handleUploadFile(e, index)}
            disabled={!!images[index]}
          ></HiddenInput>

          {/* 이미지가 업로드 된 상태에서만 수정/삭제 버튼 표시 */}
          {images[index] && (
            <Tools>
              <Icon htmlFor={`edit-image-${index}`}>
                <EditIcon />
              </Icon>
              <HiddenInput
                type="file"
                id={`edit-image-${index}`}
                accept="image/*"
                onChange={(e) => handleUploadFile(e, index)}
              ></HiddenInput>

              <Icon onClick={() => updateImageList(index, '')}>
                <DeleteIcon />
              </Icon>
            </Tools>
          )}
        </ImageWrapper>
      ))}
    </Container>
  );
};

export default ImagesUploader;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 44px;
  width: 568px;
  margin-top: 32px;
  margin-bottom: 134px;
`;
const ImageWrapper = styled.div`
  position: relative;
`;
const Image = styled.label<{ $isEmpty: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 160px;
  height: 160px;
  border-radius: 7px;
  background: #d9d9d9;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover; // 비율 유지
  }

  ${({ $isEmpty }) => $isEmpty && `cursor: pointer;`}
`;
const HiddenInput = styled.input`
  display: none;
`;
const Tools = styled.div`
  position: absolute;
  left: 48px;
  display: flex;
  flex-direction: row;
`;
const Icon = styled.label`
  cursor: pointer;
  margin: 5px;
  margin-bottom: 0;
`;
