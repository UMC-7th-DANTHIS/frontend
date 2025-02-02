import React from 'react';
import styled from 'styled-components';

const ListTopBar = () => {
  return (
    <TopBorder>
      <No>No</No>
      <Title>제목</Title>
      <WriteDate>작성일</WriteDate>
      <See>조회수</See>
    </TopBorder>
  );
};

const TopBorder = styled.div`
  height: 37px;
  border-bottom: 7px solid #9819c3;
  background-color: #000;
  font-size: 22px;
  font-style: normal;
  font-weight: 660;
  line-height: normal;
  color: white;
`;

const No = styled.span`
  width: 30px;
  height: 26px;
  padding-left: 34px;
`;

const Title = styled.span`
  margin-left: 380px;
`;

const WriteDate = styled.span`
  margin-left: 370px;
`;

const See = styled.span`
  margin-left: 54px;
`;

export default ListTopBar;
