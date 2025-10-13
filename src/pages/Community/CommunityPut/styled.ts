import styled from 'styled-components';

const Container = styled.div`
  width: 100dvw;
  padding: 0 2rem;

  background-color: #000000;
  padding-bottom: 100px;

  ${({ theme }) => theme.media.tablet} {
    max-width: 1000px;
  }
`;

const TopHeader = styled.div`
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  color: white;

  font-size: 20px;
  ${({ theme }) => theme.media.tablet} {
    font-size: 22px;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const InfoText = styled.div`
  color: #b2b2b2;
  font-size: 10px;

  ${({ theme }) => theme.media.tablet} {
    font-size: 14px;
  }
`;

export { Container, TopHeader, ContentContainer, InfoContainer, InfoText };
