import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import dummyClass from '../../store/dummyClass';

const SearchClass = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(dummyClass);
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
              <TextContent>{list.Title}</TextContent>
              <TextContent>수업 강사 : {list.Dancer}</TextContent>
              <TextContent>장르 : {list.Genre}</TextContent>
              <TextContent>가격 : {list.Price} / 회당</TextContent>
              <TextContent>난이도 : {list.Level} / 5</TextContent>
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
  margin-top: 7px;
  margin-bottom: 12px;

  color: white;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 40px;
`;

const TextContent = styled.div``;

export default SearchClass;
