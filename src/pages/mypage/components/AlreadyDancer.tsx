import styled from 'styled-components';

const AlreadyDancer = () => {
  return (
    <Alreadydancer>
      <Text> 이미 댄서로 등록되었습니다. </Text>
    </Alreadydancer>
  );
};

export default AlreadyDancer;

const Alreadydancer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 249px;
`;

const Text = styled.div`
  color: #fff;
  text-align: center;
  font-size: 32px;
  font-weight: 500;
`;
