import React from 'react';
import styled from 'styled-components';

const TagSelector = ({ selectedTags, handleFormChange }) => {
  const tags = [
    '강렬한',
    '나른한',
    '에너제틱',
    '기본기',
    '통통튀는',
    '무거운',
    '유산소',
    '빡센',
    '감성적인',
    '아프로',
    '뚝딱이',
    '취미'
  ];
  const maxTagsLength = 3;

  // 장르 선택 핸들러
  const handleSelect = (tag) => {
    let updatedTags;

    if (selectedTags.includes(tag)) {
      updatedTags = selectedTags.filter((t) => t !== tag);
    } else if (selectedTags.length < maxTagsLength) {
      updatedTags = [...selectedTags, tag];
    } else {
      return;
    }

    handleFormChange('tags', updatedTags);
  };

  return (
    <TagWrapper>
      {tags.map((tag) => (
        <TagBtn
          key={tag}
          type="button"
          selected={selectedTags.includes(tag)}
          onClick={() => handleSelect(tag)}
        >
          #{tag}
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
  background-color: ${(props) =>
    props.selected ? 'var(--text_purple, #BF00FF)' : 'transparent'};

  color: ${(props) =>
    props.selected ? 'white' : 'var(--text_secondary-gray, #b2b2b2)'};
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 50px; /* 250% */
  letter-spacing: -1px;

  &:hover {
    cursor: pointer;
    color: white;
  }
`;
