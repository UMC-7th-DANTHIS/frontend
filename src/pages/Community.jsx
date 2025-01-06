import React, { useState, useEffect } from "react";
import styled from "styled-components";
import dummyList from "../store/dummyList";

const Community = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(dummyList);
  });

  return (
    <Container>
      <ContentContainer>
        <TopBorder>
          <No>No</No>
          <Title>제목</Title>
          <WriteDate>작성일</WriteDate>
          <See>조회수</See>
        </TopBorder>
        <ListsContainer>
          {data?.map((list) => (
            <ListContainer>
              <NoList>{list.No}</NoList>
              <TitleList>{list.Title}</TitleList>
              <DateList>{list.DateAt}</DateList>
              <SeeList>{list.See}</SeeList>
            </ListContainer>
          ))}
        </ListsContainer>
      </ContentContainer>
    </Container>
  );
};

const Container = styled.div`
  height: 488px;
  background-color: black;
  justify-items: center;
  padding: 73px 204px 184px 206px;
  border-top: 1px solid white;
`;

const ContentContainer = styled.div`
  background-color: black;
  height: 100%;
  width: 1030px;
`;

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

const ListsContainer = styled.div`
  margin-top: 26px;
  width: 100%;
  height: 100%;
`;

const ListContainer = styled.div`
  margin-top: 26px;
  margin-left: 37px;
  height: 20px;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: white;
`;

const NoList = styled.span`
  display: inline-block;
  width: 17px;
  text-align: center;
`;

const TitleList = styled.button`
  display: inline-block;
  margin-left: 60px;
  width: 678px;
  text-align: center;
  border: 0;
  background-color: transparent;
  color: white;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
`;

const DateList = styled.span`
  display: inline-block;
  margin-left: 58px;
  width: 60px;
  text-align: center;
`;

const SeeList = styled.span`
  display: inline-block;
  margin-left: 55px;
  width: 65px;
  text-align: center;
`;

export default Community;
