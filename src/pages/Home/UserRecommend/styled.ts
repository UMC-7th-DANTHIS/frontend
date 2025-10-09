import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  padding-bottom: 60px;

  ${({ theme }) => theme.media.tablet} {
    width: 100%;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  margin: 0 auto;
  max-width: 1030px;
`;

const AlignCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
`;

const Border = styled.div`
  border-bottom: 2px solid #4d4d4d;

  margin-top: 43px;
  x ${({ theme }) => theme.media.tablet} {
    margin-top: 87px;
  }
  margin-bottom: 87px;
`;

const Header = styled.div`
  margin-bottom: 62px;

  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0px 0px 62px 0px;

  ${({ theme }) => theme.media.tablet} {
    justify-content: start;
    align-items: start;
    font-size: 28px;

    margin: 0px 0px 62px 32px;
    min-width: max-content;
  }

  color: white;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export { Container, Wrapper, AlignCenter, Border, Header };
