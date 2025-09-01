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
  padding-top: 47px;
  //align-items : center;
  //justify-content : center;
  flex-direction: column;
  margin-bottom: 388.34px;
  padding-left: 237px;
  padding-right: 237px;
`;

const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
`;

const Picture = styled.img`
  width: 295px;
  height: 295px;
  flex-shrink: 0;
  border-radius: 7.375px;
`;

const CareerContainer = styled.div`
  margin-top: 50px;
`;

const Title = styled.div`
  color: var(--main_white, #fff);
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: 50px; /* 178.571% */
  letter-spacing: -1.4px;
`;

const List = styled.div`
  color: var(--main_white, #fff);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 40px;
  letter-spacing: -1px;
`;
