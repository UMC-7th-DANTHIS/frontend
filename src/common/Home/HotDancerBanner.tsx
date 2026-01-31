import styled from 'styled-components';

const HotDancerBanner = () => {
  return (
    <TitleContainer>
      <Circle1 className="c-outer" />
      <Circle2 className="c-mid" />
      <Circle3 className="c-inner" />
      <Title>요즘 뜨고 있는 댄서를 찾아보세요!</Title>
      <Circle4 className="c-inner" />
      <Circle5 className="c-mid" />
      <Circle6 className="c-outer" />
    </TitleContainer>
  );
};

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  overflow: hidden; /* 영역을 벗어나면 숨김 */
  margin-top: 20px;

  ${({ theme }) => theme.media.tablet} {
    margin-top: 36.5px;
  }
`;

/* 공통 원 스타일 (반응형 우선순위 적용) */
const BaseCircle = styled.div`
  border-radius: 50%;
  flex-shrink: 0; /* 원이 타원이 되지 않도록 보호 */

  /* 768px 미만(모바일 기본)에서는 가장 안쪽 원 1개씩만 표시 */
  &.c-mid,
  &.c-outer {
    display: none;
  }

  /* 화면이 조금씩 커짐에 따라 하나씩 등장 */
  @media (min-width: 1024px) {
    &.c-mid {
      display: block;
    }
  }
  @media (min-width: 1280px) {
    &.c-outer {
      display: block;
    }
  }
`;

const Circle1 = styled(BaseCircle)`
  background: var(--main_red, #b30505);
  width: 18px;
  height: 18px;
  margin-right: 25px;
`;

const Circle2 = styled(BaseCircle)`
  background: var(--main_red, #b30505);
  width: 26px;
  height: 26px;
  margin-right: 25px;
`;

const Circle3 = styled(BaseCircle)`
  background: var(--main_red, #b30505);
  width: 14px;
  height: 14px;
  margin-right: 14px;

  ${({ theme }) => theme.media.tablet} {
    width: 40px;
    height: 40px;
    margin-right: 20px;
  }
`;

const Circle4 = styled(BaseCircle)`
  background: var(--main_purple, #9819c3);
  width: 14px;
  height: 14px;
  margin-left: 14px;

  ${({ theme }) => theme.media.tablet} {
    width: 40px;
    height: 40px;
    margin-left: 20px;
  }

  &.c-inner {
    display: block;
  } /* 모바일에서도 무조건 보임 */
`;

const Circle5 = styled(BaseCircle)`
  background: var(--main_purple, #9819c3);
  width: 26px;
  height: 26px;
  margin-left: 25px;
`;

const Circle6 = styled(BaseCircle)`
  background: var(--main_purple, #9819c3);
  width: 18px;
  height: 18px;
  margin-left: 25px;
`;

const Title = styled.div`
  padding: 8px 1.5rem;
  flex-shrink: 1; /* 화면이 아주 작아지면 글자 영역도 줄어들 수 있게 허용 */
  min-width: fit-content;
  border-radius: 91px;
  background: linear-gradient(90deg, #b30505 0%, #9819c3 100%);
  color: var(--main_white, #fff);

  font-size: 16px;
  font-weight: 600;
  white-space: nowrap; /* 글자가 줄바꿈되지 않게 고정 */

  display: flex;
  align-items: center;
  justify-content: center;

  ${({ theme }) => theme.media.tablet} {
    padding: 0.8rem 4rem;
    font-size: 28px;
  }

  /* 데스크톱 사이즈 */
  @media (min-width: 1200px) {
    padding: 1rem 5.5rem;
    font-size: 32px;
  }
`;

export default HotDancerBanner;
