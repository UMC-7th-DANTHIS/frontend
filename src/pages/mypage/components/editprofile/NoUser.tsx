import styled from 'styled-components';

const NoUser = () => {
  return (
    <Nodancer>
      <Text> 댄서로 등록된 사용자에게 열리는 서비스입니다. </Text>
    </Nodancer>
  );
};

export default NoUser;

const Nodancer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  margin-left: 200px;
`;

const Text = styled.div`
  color: #fff;
  text-align: center;
  font-size: 32px;
  font-weight: 500;
`;
