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
  width: 100%;

  gap: 20px;
  margin: 2rem 0;
  flex-wrap: nowrap;
`;

const circleBase = `
  flex-shrink: 0;
  border-radius: 50%;
  transition: opacity .25s ease, transform .25s ease;
`;

const Circle1 = styled.div`
  ${circleBase}
  border: 3px solid #b30505;
  width: 16px;
  height: 16px;
  display: none;

  ${({ theme }) => theme.media.tablet} {
    display: block;
  }
`;

const Circle2 = styled.div`
  ${circleBase}
  border: 3px solid #b30505;
  width: 26px;
  height: 26px;
  display: none;

  ${({ theme }) => theme.media.tablet} {
    display: block;
  }
`;

const Circle3 = styled.div`
  ${circleBase}
  border: 3px solid #b30505;
  width: 38px;
  height: 38px;
  display: none;

  ${({ theme }) => theme.media.tablet} {
    display: block;
  }
`;

const Circle6 = styled.div`
  ${circleBase}
  border: 3px solid #9819c3;
  width: 16px;
  height: 16px;
  display: none;

  ${({ theme }) => theme.media.tablet} {
    display: block;
  }
`;

const Circle5 = styled.div`
  ${circleBase}
  border: 3px solid #9819c3;
  width: 26px;
  height: 26px;
  display: none;

  ${({ theme }) => theme.media.tablet} {
    display: block;
  }
`;

const Circle4 = styled.div`
  ${circleBase}
  border: 3px solid #9819c3;
  width: 38px;
  height: 38px;
  display: none;

  ${({ theme }) => theme.media.tablet} {
    display: block;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  box-sizing: border-box;

  width: 100%;
  max-width: 250px;
  height: 40px;
  border-radius: 73px;
  background: linear-gradient(to right, #b30505, #9819c3);
  padding: 3px;

  ${({ theme }) => theme.media.tablet} {
    width: 100%;
    max-width: 480px;
    height: 46px;
  }
`;

const TitleText = styled.div`
  width: 100%;
  height: 100%;
  background: black;
  border-radius: 78px;

  display: flex;
  align-items: center;
  justify-content: center;

  ${({ theme }) => theme?.media?.tablet} {
    font-size: 28px;
  }

  color: white;
  font-size: 20px;
  font-weight: 700;
  line-height: normal;
`;

const Text = styled.div`
  padding-top: 3px;
  background: linear-gradient(to right, #b30505, #9819c3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export default ForUserBanner;
