import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as Check } from '../../../assets/check.svg';
import { useNavigate } from 'react-router-dom';

const Complete = ({ title, detail }) => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 180);
  }, []);

  return (
    <Container>
      <Ellipse>
        <Check alt="Check Icon" />
      </Ellipse>
      <Title>{title}</Title>
      <Detail>{detail}</Detail>
      <HomeBtn
        type="button"
        onClick={() =>
          navigate('/', {
            replace: false,
            state: {}
          })
        }
      >
        <HomeBtnText>홈 화면으로 돌아가기</HomeBtnText>
      </HomeBtn>
    </Container>
  );
};

export default Complete;

const Container = styled.div`
  justify-items: center;
  padding-bottom: 182px;
`;
const Ellipse = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 320px;
  height: 320px;
  flex-shrink: 0;
  border-radius: 320px;
  background: var(
    --main-gradation,
    linear-gradient(90deg, #b30505 0%, #9819c3 100%)
  );
`;
const Title = styled.div`
  color: var(--main_white, #fff);
  font-family: Pretendard;
  font-size: 30px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: 70px;
  margin-bottom: 40px;
`;
const Detail = styled.div`
  color: var(--text_secondary-gray, #b2b2b2);
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  white-space: pre-line;
`;
const HomeBtn = styled.button`
  width: 300px;
  height: 52px;
  flex-shrink: 0;
  border: none;
  border-radius: 15px;
  background: var(--main_purple, #9819c3);
  margin-top: 60px;

  &:hover {
    cursor: pointer;
  }
`;
const HomeBtnText = styled.div`
  color: var(--main_white, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
