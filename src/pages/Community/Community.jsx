import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ImageDescript from '../../assets/Search/imageDescript.svg';
import CommentPhoto from '../../assets/Community/CommentPhoto.svg';
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
              {!list.Image ? (
                <ImageYes src={ImageDescript} alt={'그림있으요'} />
              ) : (
                <ImageNo />
              )}
              <TitleList
                onClick={() =>
                  navigate(`/community/${list.No}`, {
                    replace: false,
                    state: { list }
                  })
                }
              >
                {list.Title}
                {list.See ? (
                  <>
                    <ViewDescript src={CommentPhoto} alt={'댓글있으요'} />
                    <ViewPeople>{list.See}</ViewPeople>
                  </>
                ) : (
                  ''
                )}
              </TitleList>
              <DateList>{list.DateAt}</DateList>
              <SeeList>{list.See}</SeeList>
            </ListContainer>
          ))}
          <PaginationContainer>
            <Pagination
              dataLength={dummyList.length}
              perData={perData}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
            <WriteButton onClick={() => navigate('/edit')}>글쓰기</WriteButton>
          </PaginationContainer>
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

const ImageYes = styled.img`
  display: inline-block;
  margin-left: 50px;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
`;

const ImageNo = styled.div`
  display: inline-block;
  margin-left: 50px;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  background-color: transparent;
`;

const TitleList = styled.button`
  display: inline-flex;
  margin-left: 5px;
  width: 667px;
  text-align: start;
  border: 0;
  background-color: transparent;
  color: white;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
`;

const ViewDescript = styled.img`
  display: inline-flex;
  justify-content: center;
  margin-left: 10px;
  width: 16px;
  height: 16px;
`;

const ViewPeople = styled.div`
  display: inline-flex;
  color: #ddd;
  margin-left: 5px;

  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

const DateList = styled.span`
  display: inline-block;
  margin-left: 58px;
  width: 60px;
  text-align: center;
`;

const SeeList = styled.span`
  display: inline-block;
  margin-left: 48px;
  width: 65px;
  text-align: center;
`;

const PaginationContainer = styled.div`
  margin-top: 56px;
  margin-left: 250px;
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
