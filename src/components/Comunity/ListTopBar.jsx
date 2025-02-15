import React from 'react';
import styled from 'styled-components';

const ListTopBar = () => {
  return (
    <TopBorder>
      <No>No</No>
      <Title>제목</Title>
      <WriteDate>작성일</WriteDate>
    </TopBorder>
  );
};

const TopBorder = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 50px;
  border-bottom: 7px solid #9819c3;
  background-color: #000;
  font-size: 22px;
  font-weight: bold;
  color: white;
`;

const No = styled.span`
  flex: 1;
  text-align: left;
  padding-left: 40px;
`;

const Title = styled.span`
  flex: 3;
  text-align: center;
`;

const WriteDate = styled.span`
  flex: 1;
  text-align: right;
  padding-right: 40px;
`;

export default ListTopBar;
