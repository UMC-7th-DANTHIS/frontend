import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  margin-top: 2rem;
  border-bottom: 2px solid #4d4d4d;

  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.media.tablet} {
    justify-content: start;
    align-items: start;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 2rem;
  margin-left: 0;

  ${({ theme }) => theme.media.tablet} {
    justify-content: start;
    font-size: 28px;

    margin-left: 220px;
  }

  color: white;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export { Container, Header };
