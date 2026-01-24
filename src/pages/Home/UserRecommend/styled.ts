import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 60px;

  ${({ theme }) => theme.media.tablet} {
    width: 100%;
  }
`;

const Content = styled.div<{ $isBlur: boolean }>`
  width: 100%;
  filter: ${({ $isBlur }) => ($isBlur ? 'blur(8px)' : 'none')};
  pointer-events: ${({ $isBlur }) => ($isBlur ? 'none' : 'auto')};
`;

const NoLoginWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;

  z-index: 10;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  margin: 0 auto;
  max-width: 1030px;
`;

const ClassWrapper = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  white-space: nowrap;
  text-overflow: ellipsis;

  margin: 0 auto;
  padding: 0;
  max-width: 350px;

  ${({ theme }) => theme.media.tablet} {
    justify-content: start;
    align-items: center;

    max-width: 1440px;
    padding: 0 50px;
  }
`;

const AlignCenter = styled.div`
  display: flex;
  justify-content: start;

  width: 100%;
  height: 100%;
`;

const Border = styled.div`
  border-bottom: 2px solid #4d4d4d;

  margin-top: 3rem;

  ${({ theme }) => theme.media.tablet} {
    margin-top: 4rem;
  }
  margin-bottom: 3rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0px 0px 2rem 0px;

  ${({ theme }) => theme.media.tablet} {
    justify-content: start;
    align-items: start;
    font-size: 28px;

    margin: 0px 0px 3rem 2rem;
    min-width: max-content;
  }

  color: white;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export {
  Container,
  Content,
  NoLoginWrapper,
  Wrapper,
  ClassWrapper,
  AlignCenter,
  Border,
  Header
};
