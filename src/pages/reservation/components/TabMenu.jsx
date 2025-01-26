import React, { useState } from 'react';
import styled from 'styled-components';
import DetailTab from './tabs/DetailTab';
import ReviewTab from './tabs/ReviewTab';
import RatingTab from './tabs/RatingTab';

const TabMenu = ({ data }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const menu = [
    { name: '상세정보', content: 'Tab menu ONE' },
    { name: '리뷰', content: 'Tab menu TWO' },
    { name: '별점', content: 'Tab menu THREE' }
  ];

  // 탭 메뉴 핸들러
  const handleTabChange = (index) => {
    setCurrentTab(index);
  };

  return (
    <>
      <Container>
        {menu.map((element, index) => (
          <Tab
            key={index}
            $isActive={currentTab === index}
            onClick={() => handleTabChange(index)}
          >
            {element.name}
          </Tab>
        ))}
      </Container>
      {currentTab === 0 && <DetailTab data={data} />}
      {currentTab === 1 && <ReviewTab />}
      {currentTab === 2 && <RatingTab data={data} />}
    </>
  );
};

export default TabMenu;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 1240px;
  height: 86px;
  flex-shrink: 0;
  border-radius: 20px 20px 0px 0px;
  background: var(--main_purple, #9819c3);
`;
const Tab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 410px;
  height: 83px;
  color: var(--main_white, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 28px;
  font-style: normal;
  font-weight: 600;
  line-height: 50px; /* 178.571% */
  letter-spacing: -1.4px;
  transition: all 0.3s ease;
  border-radius: 20px 20px 0px 0px;
  border-top: 3px solid var(--main_purple, #9819c3);
  border-right: 3px solid var(--main_purple, #9819c3);
  border-left: 3px solid var(--main_purple, #9819c3);
  box-shadow: 0px 8px 16px 0px var(--main_purple, #9819c3) inset;

  ${({ $isActive }) => $isActive && `background: var(--main_black, #000);`}

  &:hover {
    cursor: pointer;
  }
`;
