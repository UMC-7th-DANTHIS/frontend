import styled from 'styled-components';

const ListTopBar = () => {
  return (
    <TopBorder>
      <No>No</No>
      <Title>제목</Title>
      <WriteDate>작성일</WriteDate>
    </TopBorder>
  );
};

const TopBorder = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  height: 50px;
  border-bottom: 7px solid #9819c3;
  background-color: #000;
  font-size: 14px;

  ${({ theme }) => theme.media.tablet} {
    font-size: 18px;
  }

  font-weight: bold;
  color: white;
`;

const No = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
`;

const Title = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75%;
`;

const WriteDate = styled.span`
  display: flex;
  white-space: nowrap;

  justify-content: center;
  align-items: center;
  width: 15%;
`;

export default ListTopBar;
