import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Shape1 from '../../assets/shape/shape1.svg';
import Shape2 from '../../assets/shape/shape2.svg';
import Logoimg from '../../assets/logo.svg';
import Loginbtn from '../../assets/Login.svg';
import api from '../../api/api';
import StepperMobile from '../../common/Signup/StepperMobile';

const Signup4 = () => {
  const [, setUser] = useState(null);
  const [nickname, setNickname] = useState('');

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const response = await api.get('/users/me'); // API 요청 (토큰 자동 포함)
  //       console.log('유저 정보:', response.data);
  //       setUser(response.data.data);
  //       setNickname(response.data.data.nickname || ''); // 닉네임 값 설정
  //       // setEmail(response.data.data.email  || "");
  //     } catch (error) {
  //       console.error('유저 정보를 불러오는 중 오류 발생:', error);
  //     }
  //   };

  //   fetchUser();
  // }, []);
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/login');
  };

  return (
    <Layout>
      <SignupTitle> 회원가입 </SignupTitle>
      <Stepper>
        <StepperDesktop>
        <MenuItemWrapper>
          <MenuItem src={Shape2} />
          <Text2>1&#41; 이용약관 동의</Text2>
        </MenuItemWrapper>

        <MenuItemWrapper>
          <MenuItem src={Shape2} />
          <Text2>2&#41; 회원 정보 입력</Text2>
        </MenuItemWrapper>

        <MenuItemWrapper>
          <MenuItem src={Shape2} />
          <Text2>3&#41; 선호 장르 및 댄서 고르기</Text2>
        </MenuItemWrapper>

        <MenuItemWrapper>
          <MenuItem src={Shape1} />
          <Text1>4&#41; 가입 완료</Text1>
        </MenuItemWrapper>
        </StepperDesktop>
          <StepperMobile
            currentStep={4}
              titles={[
                '이용약관 동의',
                '회원 정보 입력',
                '선호 장르 및 댄서 고르기',
                '가입 완료',
                ]}/>
        
      </Stepper>
      <Content>
        <Line>
          <Text>{nickname}님, </Text>
          <Logo src={Logoimg} />
          <Text>가입을 축하드려요!</Text>
        </Line>
        <Line>
          <Logo2 src={Logoimg} />
          <Text3>에서 같이 춤으로 소통하고 성장해요 : &#41;</Text3>
        </Line>
      </Content>

      <LoginBtn onClick={handleNext}>
        {/* <Login src={Loginbtn} /> */}
        <LoginText>로그인 화면으로 이동 </LoginText>
      </LoginBtn>
    </Layout>
  );
};

export default Signup4;

const Layout = styled.div`
  background-color: black;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 169px;
  ${({ theme }) => theme.media.tablet} {
   padding-bottom: 342px;
  }
`;
const SignupTitle = styled.div`
  color: var(--main_white, #fff);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  display: flex;
  justify-content: center;
  text-align: center;
   ${({ theme }) => theme.media.tablet} {
   font-size: 32px;
   margin-top: 17px;
  }
`;
const Stepper = styled.div`
  display: flex;
  margin-top: 30px;
`
const StepperDesktop = styled.div`
  display: none;
  ${({ theme }) => theme.media.tablet} {
    display: flex;
    flex-direction: row;
  }
`
const MenuItemWrapper = styled.div`
  width: 260px;
  /* height: 64px; */
  flex-shrink: 0;
  position: relative;
  margin-left: -18px;
`;
const MenuItem = styled.img`
  width: 100%;
  height: 100%;
`;

const Text1 = styled.div`
  position: absolute; /* 부모(MenuItemWrapper)를 기준으로 위치 */
  top: 50%; /* 세로 중앙 정렬 */
  left: 50%; /* 가로 중앙 정렬 */
  transform: translate(-50%, -50%); /* 중앙 정렬을 위한 위치 보정 */
  color: var(--main_white, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  width: 160px;
`;
const Text2 = styled.div`
  position: absolute; /* 부모(MenuItemWrapper)를 기준으로 위치 */
  top: 50%; /* 세로 중앙 정렬 */
  left: 50%; /* 가로 중앙 정렬 */
  transform: translate(-50%, -50%); /* 중앙 정렬을 위한 위치 보정 */
  color: var(--text_secondary-gray, #b2b2b2);
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: 160px;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 98px;
  flex-direction: column;
`;

const Line = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 17px;
`;

const Text = styled.div`
  color: var(--main_white, #fff);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  ${({ theme }) => theme.media.tablet} {
   font-size: 40px;
  }
`;

const Text3 = styled.div`
  color: var(--main_white, #fff);
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  ${({ theme }) => theme.media.tablet} {
   font-size: 28px;
  }
`;

const Logo = styled.img`
  width: 73px;
  height: 17px;
  flex-shrink: 0;
  margin-right: 3px;
  margin-left: 6px;
    ${({ theme }) => theme.media.tablet} {
    width: 152px;
    height: 40px;
    margin-right: 11px;
    margin-left: 11px;
  }
`;

const Logo2 = styled.img`
  width: 60px;
  height: 16px;
  flex-shrink: 0;
  margin-right: 1px;
  margin-left: 10px;
  ${({ theme }) => theme.media.tablet} {
    width: 100px;
    height: 27px;
    margin-right: 11px;
    margin-left: 11px;
  }
`;

const LoginBtn = styled.button`
  background: none;
  cursor: pointer;
  position: relative;
  border: none;
  margin-top: 129px;
  width: 307px;
  height: 46px;
  border-radius: 1000px;
  border: 1.5px solid var(--main_purple, #9819C3);
  background: #000;
  box-shadow: 0 0 20px 0 #9819C3 inset;
  ${({ theme }) => theme.media.tablet} {
    width: 510px;
    height: 60px;
    margin-top: 63px
  }
`;

const LoginText = styled.div`
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  ${({ theme }) => theme.media.tablet} {
    font-size: 22px;
  }
`;
