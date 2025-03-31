import styled from 'styled-components';

interface PictureBoxProps {
  label: 'Profile' | 'Thumbnail' | string;
}

interface LabelProps {
  $left: string;
}

const PictureBox = ({ label }: PictureBoxProps) => {
  const calLeftPosition = (label: string): string => {
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
      <Outline />
      <Label $left={calLeftPosition(label)}>{label}</Label>
    </Container>
  );
};

export default PictureBox;

const Container = styled.div`
  position: absolute;
  top: -10px;
  pointer-events: none;
`;

const Outline = styled.div`
  width: 180px;
  height: 232px;
  border-radius: 7px;
  border: 2px solid var(--main_magenta, #a60f62);
`;

const Label = styled.div<LabelProps>`
  position: absolute;
  top: 214px;
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
