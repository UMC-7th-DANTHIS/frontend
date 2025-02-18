import React from 'react';
import styled from 'styled-components';

const ForClass = ({ dummyUserClass }) => {
  return (
    <ClassContainer>
      {dummyUserClass?.map((Class) => (
        <ClassContent>
          <ClassImage src={Class.Image} alt={'프로필 이미지'} />
          <TextContainer>
            <ClassName>{Class.Title}</ClassName>
            <ClassDancer>{Class.Dancer}</ClassDancer>
            <ClassDancer>{Class.Genre}</ClassDancer>
            <ClassHashContainer>
              {Class?.Hashtag.map((Hashtag) => (
                <ClassHashtag># {Hashtag}</ClassHashtag>
              ))}
            </ClassHashContainer>
          </TextContainer>
        </ClassContent>
      ))}
    </ClassContainer>
  );
};

const ClassContainer = styled.div``;

const ClassContent = styled.div`
  display: inline-flex;
  flex-direction: row;
  width: 620px;
  height: 200px;

  margin-bottom: 113px;
`;

const ClassImage = styled.img`
  display: inline-block;
  width: 200px;
  height: 200px;
  background-color: white;

  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
`;

const TextContainer = styled.div`
  display: inline-block;
  flex-direction: column;
  padding-left: 30px;
  align-content: center;

  height: 200px;
`;

const ClassName = styled.div`
  color: #fff;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 15px;
`;

const ClassDancer = styled.div`
  color: #b2b2b2;
  font-size: 22px;
  font-weight: 600;
  line-height: 28px;
`;

const ClassHashContainer = styled.div`
  padding-top: 5px;

  color: #bf00ff;
  font-size: 22px;
  font-weight: 500;
  line-height: 32px;
`;

const ClassHashtag = styled.div`
  display: inline-block;
  padding-right: 10px;
`;

export default ForClass;
