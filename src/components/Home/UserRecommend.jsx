import React, { useState } from 'react';
import styled from 'styled-components';

const UserRecommend = ({ dummyUserDancer, dummyUserClass }) => {
  return (
    <Container>
      <HeadContainer>
        <Circle1 />
        <Circle2 />
        <Circle3 />
        <Title>나를 위한 맞춤형 추천</Title>
        <Circle4 />
        <Circle5 />
        <Circle6 />
      </HeadContainer>
      <Header>00 님의 스타일에 맞는 댄서를 소개할게요</Header>
      <DancerContainer>
        {dummyUserDancer?.map((Dancer) => (
          <DancerContent>
            <DancerImage src={Dancer.Image} alt={'프로필 이미지'} />
            <DancerName>{Dancer.Dancer}</DancerName>
            <DancerGenre>{Dancer.Genre}</DancerGenre>
          </DancerContent>
        ))}
      </DancerContainer>
      <Header>오로지 00 님을 위한 맞춤형 수업이에요</Header>
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
    </Container>
  );
};

export default UserRecommend;

const Container = styled.div`
  margin-left: 100px;
  margin-right: 100px;

  padding-bottom: 60px;
`;

const HeadContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 79px;
  margin-bottom: 79px;
`;

const Circle1 = styled.div`
  border: 5px solid #b30505;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 20px;
`;

const Circle2 = styled.div`
  border: 5px solid #b30505;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 50%;
  margin-right: 20px;
`;

const Circle3 = styled.div`
  border: 5px solid #b30505;
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  border-radius: 50%;
  margin-right: 70px;
`;

const Circle4 = styled.div`
  border: 5px solid #9819c3;
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  border-radius: 50%;
  margin-left: 70px;
`;

const Circle5 = styled.div`
  border: 5px solid #9819c3;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 50%;
  margin-left: 20px;
`;

const Circle6 = styled.div`
  border: 5px solid #9819c3;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  border-radius: 50%;
  margin-left: 20px;
`;

const Title = styled.div`
  width: 520px;
  height: 90px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  background: linear-gradient(to right, #b30505, #9819c3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 3px solid transparent;
    border-radius: 73px;
    background: linear-gradient(to right, #b30505, #9819c3);
    z-index: -1;
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask-composite: exclude;
    -webkit-mask-composite: destination-out;
  }

  font-size: 44px;
  font-weight: 700;
  line-height: normal;
`;

const Header = styled.div`
  margin-bottom: 62px;
  position: relative;
  z-index: 1;

  color: white;
  font-size: 36px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const DancerContainer = styled.div`
  display: flex;
  gap: 39px;
  padding-bottom: 87px;
  border-bottom: 2px solid #4d4d4d;
  margin-bottom: 87px;
`;

const DancerContent = styled.div`
  text-align: center;
`;

const DancerImage = styled.img`
  width: 280px;
  height: 380px;
  flex-shrink: 0;

  border-radius: 380px;
  margin-bottom: 27px;
`;

const DancerName = styled.div`
  color: white;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const DancerGenre = styled.div`
  color: #b2b2b2;
  font-size: 20px;
  font-weight: 600;
`;

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
