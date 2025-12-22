import React from 'react';
import styled from 'styled-components';

interface Dancer {
  dancerImages: string[];
  history: string;
}
interface IntroduceTabProps {
  dancer: Dancer | null;
}

const IntroduceTab: React.FC<IntroduceTabProps> = ({ dancer }) => {
  if (!dancer) {
    return <div>로딩 중...</div>; // dancer가 null일 때 로딩 메시지 표시
  }
  return (
    <Layout>
      <ImageContainer>
        {dancer.dancerImages?.map((imageUrl, index) => (
          <Picture
            key={index}
            src={imageUrl}
            alt={`Dancer Image ${index + 1}`}
          />
        ))}
      </ImageContainer>
      <CareerContainer>
        <Title>댄서 이력</Title>
        <List>{dancer.history}</List>
      </CareerContainer>
    </Layout>
  );
};
export default IntroduceTab;

const Layout = styled.div`
  display: flex;
  padding-top: 22.5px;
  //align-items : center;
  //justify-content : center;
  flex-direction: column;
  padding-bottom: 251px;
  padding-left: 4px;
  padding-right: 4px;
  ${({ theme }) => theme.media.tablet} {
    padding-top: 47px;
    padding-left: 237px;
    padding-right: 237px;
    margin-bottom: 388.34px;
  }
`;

const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  ${({ theme }) => theme.media.tablet} {
    gap: 40px;
  }
`;

const Picture = styled.img`
  width: 100px;
  height: 100px;
  flex-shrink: 0;
  border-radius: 7.375px;
  ${({ theme }) => theme.media.tablet} {
    width: 295px;
    height: 295px;
  }
`;

const CareerContainer = styled.div`
  margin-top: 37px;
  width: 343px;
  white-space: pre-wrap; /* 줄바꿈 처리 */
  word-break: break-word; /* 긴 단어 줄바꿈 */
  ${({ theme }) => theme.media.tablet} {
    margin-top: 50px;
    width: 965px;
  }
`;

const Title = styled.div`
  color: var(--main_white, #fff);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 178.571% */
  letter-spacing: -0.9px;
  ${({ theme }) => theme.media.tablet} {
    font-size: 22px;
    line-height: 50px; /* 178.571% */
  letter-spacing: -1.4px;
  }
`;

const List = styled.div`
  color: var(--main_white, #fff);
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 200%;
  letter-spacing: -0.6px;
  ${({ theme }) => theme.media.tablet} {
    font-size: 16px;
    line-height: 40px;
  letter-spacing: -1px;
  }
`;