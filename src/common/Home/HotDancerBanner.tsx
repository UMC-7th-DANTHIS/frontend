import styled from 'styled-components';

const HotDancerBanner = () => {
  return (
    <TitleContainer>
      <Circle1 />
      <Circle2 />
      <Circle3 />
      <Title>요즘 뜨고 있는 댄서를 찾아보세요!</Title>
      <Circle4 />
      <Circle5 />
      <Circle6 />
    </TitleContainer>
  );
};

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  ${({ theme }) => theme.media.tablet} {
    margin-top: 36.5px;
  }
`;

const Circle1 = styled.div`
  background: var(--main_red, #b30505);
  width: 18px;
  height: 20px;
  border-radius: 50%;
  margin-right: 30px;
  display: none;

  ${({ theme }) => theme.media.tablet} {
    display: block;
  }
`;

const Circle2 = styled.div`
  background: var(--main_red, #b30505);
  width: 26px;
  height: 26px;
  flex-shrink: 0;
  border-radius: 50%;
  margin-right: 30px;
  display: none;

  ${({ theme }) => theme.media.tablet} {
    display: block;
  }
`;

const Circle3 = styled.div`
  background: var(--main_red, #b30505);
  ${({ theme }) => theme.media.tablet} {
    width: 40px;
    height: 40px;
    margin-right: 31.35px;
  }

  width: 14px;
  height: 14px;
  flex-shrink: 0;
  border-radius: 50%;
  margin-right: 14px;
`;

const Circle4 = styled.div`
  background: var(--main_purple, #9819c3);
  ${({ theme }) => theme.media.tablet} {
    width: 40px;
    height: 40px;
    margin-left: 31.35px;
  }

  width: 14px;
  height: 14px;

  flex-shrink: 0;
  border-radius: 50%;
  margin-left: 14px;
`;

const Circle5 = styled.div`
  background: var(--main_purple, #9819c3);
  width: 26px;
  height: 26px;
  flex-shrink: 0;
  border-radius: 50%;
  margin-left: 30px;
  display: none;

  ${({ theme }) => theme.media.tablet} {
    display: block;
  }
`;

const Circle6 = styled.div`
  background: var(--main_purple, #9819c3);
  width: 18px;
  height: 20px;
  flex-shrink: 0;
  border-radius: 50%;
  margin-left: 30px;
  display: none;

  ${({ theme }) => theme.media.tablet} {
    display: block;
  }
`;

const Title = styled.div`
  padding: 5px 1rem;

  flex-shrink: 0;
  border-radius: 91px;
  background: linear-gradient(90deg, #b30505 0%, #9819c3 100%);
  color: var(--main_white, #fff);
  text-align: center;

  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.media.tablet} {
    padding: 0.8rem 5.5rem;
    font-size: 32px;
  }
`;

export default HotDancerBanner;
