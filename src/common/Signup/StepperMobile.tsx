import React from 'react'
import styled from 'styled-components';
import ColorDot from "../../assets/Signup/color.svg"
import BlackDot from "../../assets/Signup/black.svg"

type StepperMobileProps = {
  currentStep: 1 | 2 | 3 | 4;                 // 현재 단계
  titles: [string, string, string, string];    // 각 스텝 제목
};

const StepperMobile = ({ currentStep, titles }: StepperMobileProps) => {
  return (
    <Wrap aria-label="가입 단계">
      <Left>
        <Dot>
          <img src={ColorDot} alt={`${currentStep}단계`} />
          <Num aria-hidden="true">{currentStep}</Num>
        </Dot>
        <Title>{titles[currentStep - 1]}</Title>
      </Left>

      <Right>
        {[2, 3, 4].map((n) => (
          <SmallDot key={n} aria-label={`${n}단계`}>
            <img src={BlackDot} alt="" />
            <SmallNum aria-hidden="true">{n}</SmallNum>
          </SmallDot>
        ))}
      </Right>
    </Wrap>
  );
};

export default StepperMobile;

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  padding-left: 40px;
  padding-right: 40px;
  ${({ theme }) => theme.media.tablet} {
    display: none;             
  }
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;                     
`;

/* 큰 원(활성) */
const Dot = styled.div`
  position: relative;
  width: 28px;
  height: 28px;
  flex: 0 0 28px;

  img {
    width: 100%;
    height: 100%;
    display: block;
  }
`;

const Num = styled.span`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
`;

/* 작은 원(비활성) */
const SmallDot = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
  flex: 0 0 24px;

  img {
    width: 100%;
    height: 100%;
    display: block;
  }
`;

const SmallNum = styled.span`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  color: #b2b2b2;               /* 피그마와 유사한 회색 */
  //color: var(--main_white, #FFF);
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;

`;

const Title = styled.span`
  color: #fff;
  font-size: 16px;
  font-weight: 600;
`;
