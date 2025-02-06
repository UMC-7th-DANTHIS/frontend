import React from 'react';
import styled from 'styled-components';

const TagSelector = ({ selectedTags, handleFormChange }) => {
  const tags = [
    { id: 1, name: '강렬한' },
    { id: 2, name: '나른한' },
    { id: 3, name: '에너제틱' },
    { id: 4, name: '기본기' },
    { id: 5, name: '통통튀는' },
    { id: 6, name: '무거운' },
    { id: 7, name: '유산소' },
    { id: 8, name: '빡센' },
    { id: 9, name: '감성적인' },
    { id: 10, name: '아프로' },
    { id: 11, name: '뚝딱이' },
    { id: 12, name: '취미' }
  ];
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
          #{tag.name}
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
