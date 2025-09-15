import React from 'react';
import styled from 'styled-components';
import Logoimg from '../assets/logo.svg';
import Instagram from '../assets/buttons/instagram.svg';

const Footer = () => {
  return (
    <Layout>
      <TopContainer>
        <TextContainer>
          <h4>고객센터 문의</h4>
          <p>tel. 010-2729-2538</p>
          <p>email. tuyu000@naver.com</p>
        </TextContainer>
        <Logo>
          <img src={Logoimg} alt="Logo" />
        </Logo>
      </TopContainer>

      <BottomContainer>
        <InstagramBtn
          href="https://www.instagram.com/danthis_dtm/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={Instagram} alt="danthis instagram" />
        </InstagramBtn>

        <TermsOfService>
          <p>서비스 이용약관</p>
          <p>개인정보 처리방침</p>
        </TermsOfService>
      </BottomContainer>
    </Layout>
  );
};

export default Footer;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 15px 27px 15px;
  gap: 12px;
  border-top: 2px solid #d9d9d9;

  ${({ theme }) => theme.media.tablet} {
    padding: 30px 60px;
    gap: 20px;
  }
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
`;

const TextContainer = styled.div`
  color: var(--main-white);

  h4 {
    font-size: 12px;
    font-weight: 500;
    margin: 0;
    margin-bottom: 10px;

    ${({ theme }) => theme.media.tablet} {
      font-size: 16px;
      margin-bottom: 16px;
    }
  }

  p {
    color: var(--main-white);
    font-size: 8px;
    font-weight: 400;
    margin: 0;

    ${({ theme }) => theme.media.tablet} {
      font-size: 12px;
      line-height: 16px;
    }
  }
`;

const Logo = styled.div`
  flex-shrink: 0;

  img {
    width: 88px;
    height: 23px;

    ${({ theme }) => theme.media.tablet} {
      width: 138px;
      height: 36px;
    }
  }
`;

const BottomContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: end;
  color: var(--main-white);
`;
const InstagramBtn = styled.a`
  img {
    width: 20px;
    height: 20px;

    ${({ theme }) => theme.media.tablet} {
      width: 35px;
      height: 35px;
    }
  }
`;
const TermsOfService = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
  gap: 10px;

  ${({ theme }) => theme.media.tablet} {
    gap: 24px;
  }

  p {
    font-size: 8px;
    font-weight: 400;

    ${({ theme }) => theme.media.tablet} {
      font-size: 12px;
    }
  }
`;
