import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { SinglePostData } from '@/types/CommunityInterface';

import Close from '../../assets/buttons/CloseButton.svg';

type EditContentProps = {
  setFileName: Dispatch<SetStateAction<string[]>>;
  previews: string[];
  setPreviews: Dispatch<SetStateAction<string[]>>;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  selectedPost: Record<string, SinglePostData>;
};

const EditContent = ({
  setFileName,
  previews,
  setPreviews,
  title,
  setTitle,
  content,
  setContent
}: EditContentProps) => {
  const handleRemoveImage = (index: number): void => {
    setPreviews((prev: string[]) => prev.filter((_, i) => i !== index));
  };

  return (
    <Content>
      <TitleArea>
        <ContentTitle>제목</ContentTitle>
        <TitleInput
          placeholder="제목을 입력하세요."
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            setTitle(e.target.value)
          }
          maxLength={50}
        />
      </TitleArea>
      <ContentArea>
        <ContentMain>내용</ContentMain>
        <ContentInput
          placeholder="내용을 입력하세요."
          value={content}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void =>
            setContent(e.target.value)
          }
          maxLength={1000}
        />
      </ContentArea>

      {previews.length > 0 && (
        <ImageContainer>
          {previews.map((src, index: number) => (
            <ImageWrapper key={index}>
              <CloseButton
                src={Close}
                onClick={() => handleRemoveImage(index)}
              />
              <Image src={src} alt={`preview-${index}`} />
            </ImageWrapper>
          ))}
        </ImageContainer>
      )}
    </Content>
  );
};

const Content = styled.div`
  margin-top: 10px;
  width: 100%;
  padding: 0 2rem;

  border: 2px solid #9819c3;
  border-radius: 10px;

  height: 100%;
  max-width: 100dvw;
`;

const ContentTitle = styled.div`
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  min-width: 0;
  flex: 1 1 auto;
  min-width: 0;
  white-space: nowrap;

  ${({ theme }) => theme.media.tablet} {
    font-size: 18px;
  }
`;

const TitleArea = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;

  border-bottom: 1.5px solid #b2b2b2;

  padding-top: 21px;
  padding-bottom: 14px;
  padding-left: 9px;
`;

const TitleInput = styled.input`
  border: transparent;
  background-color: transparent;
  outline: none;

  color: white;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &::placeholder {
    color: #4d4d4d;
    font-size: 14px;
  }

  width: 92%;
  height: 100%;

  ${({ theme }) => theme.media.tablet} {
    font-size: 16px;
  }
`;

const ContentArea = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: start;

  padding-top: 15px;
  margin-bottom: 15px;
  padding-left: 9px;
`;

const ContentInput = styled.textarea`
  background-color: transparent;
  border: transparent;
  resize: none;
  outline: none;

  color: white;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &::placeholder {
    color: #4d4d4d;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  width: 92%;
  min-height: 400px;

  ${({ theme }) => theme.media.tablet} {
    font-size: 16px;
  }
`;

const ContentMain = styled.div`
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  flex: 1 1 auto;
  min-width: 0;
  white-space: nowrap;

  ${({ theme }) => theme.media.tablet} {
    font-size: 18px;
  }
`;

const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;

  margin: 16px 0 46px 0;

  ${({ theme }) => theme.media.tablet} {
    grid-template-columns: repeat(4, 1fr);
    justify-content: start;
    gap: 16px;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 7px;
  object-fit: cover;
`;

const CloseButton = styled.img`
  position: absolute;
  top: -10px;
  right: -10px;
  border: none;
  width: 27px;
  height: 27px;
  cursor: pointer;
`;

export default EditContent;
