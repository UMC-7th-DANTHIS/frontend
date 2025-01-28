import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Detail = ({ data }) => {
  return (
    <Container>
      <Video src={null} alt={`${data.dancer}의 ${data.title}> 수업 영상`} />
      <Section>
        <Title>📢 수업 소개</Title>
        <Text>{data.description}</Text>
      </Section>
      <Section>
        <Title>👍🏻 이 수업은 이런 분들에게 추천해요!</Title>
        <Text>{data.recommendedFor}</Text>
        <Tags>
          {data.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </Tags>
      </Section>
      <Section>
        <Title>수업 사진</Title>
        <Images>
          {data.images.length > 0 ? (
            data.images.map((image, index) => (
              <Image key={index}>
                {image && <img src={image} alt={`class #${index}`} />}
              </Image>
            ))
          ) : (
            <Image src={data.dancerImg} />
          )}
        </Images>
      </Section>
      <Section>
        <MoreAboutDancer to={`/dancerprofile/${data.dancerId}`}>
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
  padding: 4px 30px;
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
