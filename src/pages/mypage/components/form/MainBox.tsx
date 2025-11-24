import styled from 'styled-components';

export const MainBox = ({ label }: { label: string }) => {
  return (
    <Container>
      <Outline></Outline>
      <Label>{label}</Label>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: -6px;
  left: -6px;
  pointer-events: none;
  width: calc(100% + 12px);
  height: calc(100% + 12px);

  ${({ theme }) => theme.media.desktop} {
    top: -10px;
    left: -10px;
    width: calc(100% + 20px);
    height: calc(100% + 16px);
  }
`;
const Outline = styled.div`
  width: 100%;
  height: calc(100% + 55px);
  border-radius: 7px;
  border: 2px solid var(--main-magenta);

  ${({ theme }) => theme.media.desktop} {
    height: calc(100% + 70px);
  }
`;
const Label = styled.div`
  position: absolute;
  bottom: -55px;
  left: 50%;
  transform: translateX(-50%);
  padding: 2px 8px;
  border-radius: 7px 7px 0px 0px;
  background: var(--main-magenta);
  color: var(--main-white);
  text-align: center;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 600;

  ${({ theme }) => theme.media.desktop} {
    bottom: -70px;
    font-size: 14px;
  }
`;
