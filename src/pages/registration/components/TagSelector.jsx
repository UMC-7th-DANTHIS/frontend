import React from 'react';
import styled from 'styled-components';
import { hashTagID as tags } from '../../../api/schema';

const TagSelector = ({ selectedTags, handleFormChange }) => {
  const maxTagsLength = 3;

  // 장르 선택 핸들러
  const handleSelect = (tagId) => {
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
        <TagBtn
          key={tag.id}
          type="button"
          selected={selectedTags?.includes(tag.id)}
          onClick={() => handleSelect(tag.id)}
        >
          #{tag.hashTag}
        </TagBtn>
      ))}
    </TagWrapper>
  );
};

export default TagSelector;

const TagWrapper = styled.div`
  width: 514px;
  padding: 18px 37px 69px 37px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 21px;
  column-gap: 14px;
`;
const TagBtn = styled.button`
  display: flex;
  width: 154px;
  padding: 0px 30px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 80px;
  border: 2px solid var(--text_purple, #bf00ff);
  background-color: ${(props) => (props.selected ? 'white' : 'transparent')};

  color: ${(props) =>
    props.selected
      ? 'var(--text_purple, #BF00FF)'
      : 'var(--text_secondary-gray, #b2b2b2)'};
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 50px; /* 250% */
  letter-spacing: -1px;

  &:hover {
    cursor: pointer;
    color: var(--text_purple, #bf00ff);
  }
`;
