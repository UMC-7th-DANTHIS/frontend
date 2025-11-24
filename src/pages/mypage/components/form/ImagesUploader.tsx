import styled from 'styled-components';

import { ReactComponent as PictureIcon } from '../../../../assets/picture.svg';
import { ReactComponent as EditIcon } from '../../../../assets/shape/write.svg';
import { ReactComponent as DeleteIcon } from '../../../../assets/shape/trash.svg';
import { MainBox } from './MainBox';

import { ClassFormState, DancerFormState, HandleFormChange } from '@/types/registration';
import usePostImagePresigned from '../../../../hooks/registration/usePostImagePresigned';
import useUploadToS3 from '../../../../hooks/registration/useUploadToS3';
import useIsMobile from '../../../../hooks/useIsMobile';

interface ImagesUploaderProps<T> {
  isFor: 'dancer' | 'class';
  images: string[];
  handleFormChange: HandleFormChange<T>;
}

export const ImagesUploader = <T extends DancerFormState | ClassFormState>({
  isFor,
  images,
  handleFormChange
}: ImagesUploaderProps<T>) => {
  const TOTAL_IMAGES = 3;

  const isMobile = useIsMobile();

  const config: Record<'dancer' | 'class', { label: string; fieldName: keyof T; urlParam: string }> = {
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

  const { mutateAsync: postImagePresignedUrl } = usePostImagePresigned();
  const { uploadToS3 } = useUploadToS3();

  // 이미지 업데이트 로직
  const updateImageList = (index: number, newImageUrl: string) => {
    const updatedImages = images.map((img, i) => (i === index ? newImageUrl : img));

    handleFormChange(fieldName, updatedImages as T[typeof fieldName]);
  };

  // 이미지 업로드 핸들러
  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0]; // 파일 가져오기
    if (!file || !file.type.startsWith('image/')) return;

    const presignedUrl = await postImagePresignedUrl({ urlParam, file });
    if (!presignedUrl) return;

    const uploadedUrl = await uploadToS3(presignedUrl, file);
    if (uploadedUrl) {
      updateImageList(index, uploadedUrl);
    }

    e.target.value = ''; // 파일 선택 초기화
  };

  return (
    <Container>
      {Array.from({ length: TOTAL_IMAGES }, (_, index) => (
        <ImageWrapper key={index}>
          {/* MainBox는 가장 첫번째 사진에만 있는 박스 */}
          {index === 0 && <MainBox label={label} />}
          <Image htmlFor={`image-${index}`} $isEmpty={!images[index]}>
            {images[index] ? (
              <img src={images[index]} alt={`class-${index}`} />
            ) : (
              <PictureIcon width={isMobile ? '30px' : '48px'} />
            )}
          </Image>

          {/* 이미지가 업로드 안 된 상태에서만 박스 클릭 가능 */}
          <HiddenInput
            type="file"
            id={`image-${index}`}
            accept="image/*"
            onChange={(e) => handleUploadImage(e, index)}
            disabled={!!images[index]}
          ></HiddenInput>

          {/* 이미지가 업로드 된 상태에서만 수정/삭제 버튼 표시 */}
          {images[index] && (
            <Tools>
              <label htmlFor={`edit-image-${index}`}>
                <EditIcon />
              </label>
              <HiddenInput
                type="file"
                id={`edit-image-${index}`}
                accept="image/*"
                onChange={(e) => handleUploadImage(e, index)}
              ></HiddenInput>

              <label onClick={() => updateImageList(index, '')}>
                <DeleteIcon />
              </label>
            </Tools>
          )}
        </ImageWrapper>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  min-width: 
  margin-top: 32px;
  margin-bottom: 80px;
  gap: 12px;

  ${({ theme }) => theme.media.desktop} {
    gap: 44px;
  }
`;
const ImageWrapper = styled.div`
  position: relative;
`;
const Image = styled.label<{ $isEmpty: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  aspect-ratio: 1 / 1;
  width: 100%;
  min-width: 90px;
  min-height: 90px;
  border-radius: 7px;
  background: #d9d9d9;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover; // 비율 유지
  }

  ${({ $isEmpty }) => $isEmpty && `cursor: pointer;`}

  ${({ theme }) => theme.media.desktop} {
    min-width: 160px;
    min-height: 160px;
  }
`;
const HiddenInput = styled.input`
  display: none;
`;
const Tools = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: row;

  label {
    cursor: pointer;
    margin: 5px;
    margin-bottom: 0;
  }
`;
