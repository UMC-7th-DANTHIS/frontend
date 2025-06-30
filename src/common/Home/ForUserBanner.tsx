import styled from 'styled-components';

const ForUserBanner = () => {
  return (
    <HeadContainer>
      <Circle1 />
      <Circle2 />
      <Circle3 />
      <Title>
        <TitleText>
          <Text>나를 위한 맞춤형 추천</Text>
        </TitleText>
      </Title>
      <Circle4 />
      <Circle5 />
      <Circle6 />
    </HeadContainer>
  );
};

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

const TitleText = styled.div`
  width: 100%;
  height: 100%;

  text-align: center;
  justify-content: center;
  align-items: center;
  background: black;
  border-radius: 78px;

  color: white;

  font-size: 44px;
  font-weight: 700;
  line-height: normal;
`;

const Text = styled.div`
  padding-top: 15px;

  background: linear-gradient(to right, #b30505, #9819c3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Title = styled.div`
  width: 520px;
  height: 90px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  border-radius: 73px;

  background: linear-gradient(to right, #b30505, #9819c3);
  padding: 3px;

  box-sizing: border-box;
`;

export default ForUserBanner;
