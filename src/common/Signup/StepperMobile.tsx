import styled from "styled-components";
import ColorCircle from "../../assets/Signup/color.svg"
import BlackCircle from "../../assets/Signup/black.svg"

interface StepperMobileProps {
  currentStep: number;
  steps: string[];
}

const StepperMobile = ({ currentStep, steps }: StepperMobileProps) => {
  return (
    <StepperWrapper>
  {/* 왼쪽: 지난 + 현재 */}
  <LeftWrap>
    <PastGroup>
      {steps
        .map((_, i) => i + 1)
        .filter((n) => n < currentStep)
        .map((n) => (
          <Circle key={n}>
            <img src={BlackCircle} alt={`step ${n}`} />
            <Num>{n}</Num>
          </Circle>
        ))}
    </PastGroup>

    <CurrentStep>
      <CurrentDot>
        <img src={ColorCircle} alt={`current step ${currentStep}`} />
        <NumCurrent>{currentStep}</NumCurrent>
      </CurrentDot>
      <Label>{steps[currentStep - 1]}</Label>
    </CurrentStep>
  </LeftWrap>

  {/* 오른쪽: 미래 */}
  <FutureGroup>
    {steps
      .map((_, i) => i + 1)
      .filter((n) => n > currentStep)
      .map((n) => (
        <Circle key={n}>
          <img src={BlackCircle} alt={`step ${n}`} />
          <Num>{n}</Num>
        </Circle>
      ))}
  </FutureGroup>
</StepperWrapper>
  );
};

export default StepperMobile;

const StepperWrapper = styled.div`
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

const LeftWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;     
  flex: 0 0 auto;     
`;

/* 지난/미래 그룹 */
const PastGroup = styled.div`
  display: flex;
  gap: 8px;
  flex: 0 0 auto;
`;
const FutureGroup = styled.div`
  display: flex;
  gap: 8px;
  flex: 0 0 auto;
`;

/* 나머지는 기존 그대로 */
const Circle = styled.div`
  position: relative;
  width: 28px;
  height: 28px;
  img { 
  width: 100%; 
  height: 100%; 
  display: block; }
`;
const Num = styled.span`
  position: absolute; 
  top: 50%; 
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px; 
  font-weight: 600; 
  color: #b2b2b2; 
`;
const CurrentStep = styled.div`
  display: flex; 
  align-items: center; 
  gap: 10px; 
`;
const CurrentDot = styled.div`
  position: relative; 
  width: 32px; 
  height: 32px; 
  img { 
    width: 100%; 
    height: 100%; 
    display: block; }
`;
const NumCurrent = styled.span`
  position: absolute; 
  top: 50%; 
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 16px; 
  font-weight: 600; 
  color: #fff;
`;
const Label = styled.span`
  color: white; 
  font-size: 14px; 
  font-weight: 600;
`;


