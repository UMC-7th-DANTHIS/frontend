import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Detail = ({ classData }) => {
  const tags = [
    { id: 1, name: '강렬한' },
    { id: 2, name: '나른한' },
    { id: 3, name: '에너제틱' },
    { id: 4, name: '기본기' },
    { id: 5, name: '통통튀는' },
    { id: 6, name: '무거운' },
    { id: 7, name: '유산소' },
    { id: 8, name: '빡센' },
    { id: 9, name: '감성적인' },
    { id: 10, name: '아프로' },
    { id: 11, name: '뚝딱이' },
    { id: 12, name: '취미' }
  ];

  return (
    <Container>
      <Video
        src={classData.details?.videoUrl}
        alt={`${classData.dancer?.name}의 ${classData?.className}> 수업 영상`}
      />
      <Section>
        <Title>📢 수업 소개</Title>
        <Text>{classData.details?.description}</Text>
      </Section>
      <Section>
        <Title>👍🏻 이 수업은 이런 분들에게 추천해요!</Title>
        <Text>{classData.details?.targetAudience}</Text>
        <Tags>
          {classData.details?.hashtags.map((tag) => {
            const tagName = tags.find((t) => t.id === tag)?.name;
            return tagName ? <Tag key={tag}>#{tagName}</Tag> : null;
          })}
        </Tags>
      </Section>
      <Section>
        <Title>수업 사진</Title>
        <Images>
          {classData.details?.danceClassImages.length > 0 ? (
            classData.details?.danceClassImages.map(
              (image, index) =>
                image && (
                  <Image key={index} src={image} alt={`class #${index}`} />
                )
            )
          ) : (
            <Image src={classData.dancer?.profileImage} />
          )}
        </Images>
      </Section>
      <Section>
        <MoreAboutDancer to={`/dancerprofile/${1}`}>
          Parana 댄서에 대해 더 알고싶다면?
        </MoreAboutDancer>
      </Section>
    </Container>
  );
};

export default Detail;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1240px;
  padding: 77px 108px;
`;
const Video = styled.video`
  width: 1024px;
  height: 560px;
  margin-bottom: 50px;
  border-radius: 3px;
  background: url(<path-to-image>) lightgray 50% / cover no-repeat;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover; // 비율 유지
  }
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 1240px;
  padding: 50px;
  white-space: pre-line;
`;
const Title = styled.div`
  color: var(--main_white, #fff);
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 50px;
  letter-spacing: -1.6px;
`;
const Text = styled.div`
  color: var(--main_white, #fff);
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 50px;
  letter-spacing: -1.2px;
`;
const Tags = styled.div`
  margin: 18px 0;
`;
const Tag = styled.div`
  display: inline-flex;
  padding: 4px 38px;
  justify-content: center;
  align-items: center;
  margin-right: 28px;
  border-radius: 80px;
  border: 2px solid var(--text_purple, #bf00ff);

  color: var(--main_white, #fff);
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 50px; /* 208.333% */
  letter-spacing: -1.2px;
`;
const Images = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 1240px;
  margin-top: 21px;
  gap: 20px;
`;
const Image = styled.img`
  width: 400px;
  height: 400px;
  border-radius: 10px;
  background: url(<path-to-image>) lightgray 50% / cover no-repeat;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover; // 비율 유지
  }
`;
const MoreAboutDancer = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 448px;
  height: 60px;
  text-decoration-line: none;
  border-radius: 15px;
  border: 2px solid var(--main_white, #fff);
  background: var(--main_purple, #9819c3);

  color: var(--main_white, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  &:hover {
    cursor: pointer;
  }
`;
