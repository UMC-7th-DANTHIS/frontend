import styled from 'styled-components';

const MainBox = ({ label }) => {
  // label에 따라 left 값 다르게 계산
  const calLeftPosition = (label) => {
    switch (label) {
      case 'Profile':
        return '61px';
      case 'Thumbnail':
        return '48.5px';
      default:
        return '0px';
    }
  };
  return (
    <Container>
      <Outline></Outline>
      <Label $left={calLeftPosition(label)}>{label}</Label>
    </Container>
  );
};

export default MainBox;

const Container = styled.div`
  position: absolute;
  top: -10px;
  left: -10px;
  pointer-events: none;
`;
const Outline = styled.div`
  width: 177px;
  height: 232px;
  border-radius: 7px;
  border: 2px solid var(--main_magenta, #a60f62);
`;
const Label = styled.div`
  position: absolute;
  top: 213px;
  left: ${({ $left }) => $left};
  padding: 2px 8px;
  border-radius: 7px 7px 0px 0px;
  background: var(--main_magenta, #a60f62);
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 600;
`;
