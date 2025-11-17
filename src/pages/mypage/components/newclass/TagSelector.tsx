import styled from 'styled-components';
import { hashTagID as tags } from '../../../../api/schema';
import { ClassFormState, HandleFormChange } from '@/types/registration';

interface TagSelectorProps {
  selectedTags: number[];
  handleFormChange: HandleFormChange<ClassFormState>;
}

export const TagSelector = ({ selectedTags, handleFormChange }: TagSelectorProps) => {
  const maxTagsLength = 3;

  // 장르 선택 핸들러
  const handleSelect = (tagId: number) => {
    let updatedTags;

    if (selectedTags.includes(tagId)) {
      updatedTags = selectedTags.filter((id) => id !== tagId);
    } else if (selectedTags.length < maxTagsLength) {
      updatedTags = [...selectedTags, tagId];
    } else {
      return;
    }

    handleFormChange('hashtags', updatedTags);
  };

  return (
    <TagWrapper>
      {tags.map((tag) => (
        <Tag
          key={tag.id}
          type="button"
          selected={selectedTags?.includes(Number(tag.id))}
          onClick={() => handleSelect(Number(tag.id))}
        >
          #{tag.hashTag}
        </Tag>
      ))}
    </TagWrapper>
  );
};

const TagWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 16px;
  column-gap: 14px;

  ${({ theme }) => theme.media.tablet} {
    padding: 10px 36px 0 36px;
    grid-template-columns: repeat(3, 1fr);
  }
`;
const Tag = styled.button<{ selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 10px;
  gap: 8px;
  border-radius: 80px;
  border: 1px solid var(--text-purple);
  background-color: ${(props) => (props.selected ? 'white' : 'transparent')};
  transition: all 0.2s ease-in-out;

  color: ${(props) => (props.selected ? 'var(--text-purple)' : 'var(--text-secondary-gray)')};
  font-family: Pretendard;
  font-size: 10px;
  font-weight: 500;
  line-height: 140%;
  letter-spacing: -1px;

  &:hover {
    cursor: pointer;
    color: var(--text-purple);
  }

  ${({ theme }) => theme.media.tablet} {
    padding: 10px 16px;
    font-size: 14px;
  }

  ${({ theme }) => theme.media.desktop} {
    padding: 12px 30px;
    border: 2px solid var(--text-purple);
    font-size: 16px;
  }
`;
