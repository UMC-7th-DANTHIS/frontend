import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import dummyDancer from '../../store/dummyDancer';

const SearchDancer = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(dummyDancer);
  });

  return (
    <Container>
      <ClassLists>
        {data?.map((list) => (
          <ClassList>
            <ImgContainer
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkpq_VnExTApuWh7iJNkdXdqeZciuAVoZF8A&s"
              alt="프로필 이미지"
            />
            <TextContainer>
              <TextContent>{list.Dancer}</TextContent>
              <TextContent>Instagram : {list.Instagram}</TextContent>
              <TextContent>주 장르 : {list.Genre}</TextContent>
            </TextContainer>
          </ClassList>
        ))}
      </ClassLists>
    </Container>
  );
};

const Container = styled.div`
  background-color: black;
`;

const ClassLists = styled.div`
  border-top: 2px solid #ddd;
  border-bottom: 2px solid #ddd;
`;

const ClassList = styled.div`
  display: flex;
  padding-top: 41px;
  padding-bottom: 41px;
  padding-left: 43px;

  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }
`;

const ImgContainer = styled.img`
  border-radius: 10px;
`;

const TextContainer = styled.div`
  flex-direction: column;
  margin-left: 38px;
  margin-top: 41px;
  margin-bottom: 12px;

  color: white;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 40px;
`;

const TextContent = styled.div``;

export default SearchDancer;
