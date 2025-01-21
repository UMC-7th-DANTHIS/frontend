import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import dummyList from '../../store/community/dummyList';

import Pagination from '../../components/Pagination';

const Community = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const perData = 10;
  const filteredList = dummyList.slice(
    perData * (currentPage - 1),
    perData * currentPage
  );

  const navigate = useNavigate();

  useEffect(() => {});

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
          {filteredList?.map((list) => (
            <ListContainer>
              <NoList>{list.No}</NoList>
              <TitleList
                onClick={() =>
                  navigate(`/community/${list.No}`, {
                    replace: false,
                    state: { list }
                  })
                }
              >
                {list.Title}
              </TitleList>
              <DateList>{list.DateAt}</DateList>
              <SeeList>{list.See}</SeeList>
            </ListContainer>
          ))}
          <Pagination
            dataLength={dummyList.length}
            perData={perData}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <WriteButton onClick={() => navigate('/edit')}>글쓰기</WriteButton>
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
  margin-top: 16px;
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

const PageContainer = styled.div`
  display: inline-block;
  width: 514px;
  margin-left: 250px;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin-top: 56px;
`;

const PageCursor = styled.div`
  display: inline-block;
  font-size: 20px;
  font-weight: bold;
  color: #9819c3;
  cursor: pointer;
  margin: 0 20px;
`;

const PageNumber = styled.div`
  display: inline-block;
  font-size: 18px;
  color: white;
  margin: 5px;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
  border-radius: 50%;

  &:hover {
    color: #9819c3;
  }

  &.active {
    background-color: #9819c3;
    color: white;
  }
`;

const WriteButton = styled.button`
  display: inline-block;
  margin-left: 186px;
  width: 80px;
  height: 40px;
  background-color: #9819c3;
  color: white;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #b327d1;
  }

  &:active {
    background-color: #6e0f88;
  }
`;

export default Community;
