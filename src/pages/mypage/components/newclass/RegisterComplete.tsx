import { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Check } from '../../../../assets/check.svg';
import useIsMobile from '../../../../hooks/useIsMobile';

interface RegisterCompleteProps {
  message: string;
  description: string;
}

export const RegisterComplete = ({ message, description }: RegisterCompleteProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    window.scrollTo(0, 180);
  });

  const handleHomeClick = () => {
    navigate('/', { replace: false, state: {} });
  };

  return (
    <Container>
      <Ellipse>
        <Check width={isMobile ? '100px' : '148px'} />
      </Ellipse>
      <div>
        <Title>{message}</Title>
        <Detail>{description}</Detail>
      </div>
      <HomeBtn type="button" onClick={handleHomeClick}>
        <span>홈 화면으로 돌아가기</span>
      </HomeBtn>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
  gap: 60px;
`;
const Ellipse = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 180px;
  flex-shrink: 0;
  border-radius: 240px;
  background: var(--main-gradation);

  ${({ theme }) => theme.media.tablet} {
    width: 240px;
    height: 240px;
  }
`;
const Title = styled.div`
  margin-bottom: 24px;
  color: var(--main-white);
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 600;
  white-space: normal;
  word-break: keep-all;
  overflow-wrap: break-word;

  ${({ theme }) => theme.media.tablet} {
    font-size: 28px;
  }
`;
const Detail = styled.div`
  color: var(--text-secondary-gray);
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 500;
  white-space: pre-line;
  word-break: keep-all;
  overflow-wrap: break-word;

  ${({ theme }) => theme.media.tablet} {
    font-size: 20px;
  }
`;
const HomeBtn = styled.button`
  padding: 10px 32px;
  flex-shrink: 0;
  border: none;
  border-radius: 15px;
  background: var(--main-purple);
  cursor: pointer;

  span {
    color: var(--main-white);
    text-align: center;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 500;
    line-height: 140%;

    ${({ theme }) => theme.media.tablet} {
      font-size: 18px;
    }
  }
`;
