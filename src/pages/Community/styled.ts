import styled from 'styled-components';

const Container = styled.div`
  background-color: black;
  justify-items: center;
  min-height: 600px;
  width: 100%;
`;

const ContentContainer = styled.div`
  background-color: black;
  height: 100%;
  width: 100dvw;

  padding: 0 2rem;

  ${({ theme }) => theme.media.tablet} {
    width: 100dvw;
    max-width: 1000px;
    padding: 0 2rem;
  }

  margin: 0 auto;
`;

export { Container, ContentContainer };
