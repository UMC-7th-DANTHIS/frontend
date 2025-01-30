import styled from 'styled-components';

const ProfileBox = () => {
  return (
    <Container>
      <Outline></Outline>
      <ProfileLabel>Profile</ProfileLabel>
    </Container>
  );
};

export default ProfileBox;

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
const ProfileLabel = styled.div`
  position: absolute;
  top: 213px;
  left: 61px;
  padding: 2px 8px;
  border-radius: 7px 7px 0px 0px;
  background: var(--main_magenta, #a60f62);
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 600;
`;
