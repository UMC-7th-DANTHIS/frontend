import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Shape1 from '../../assets/shape/shape1.svg';
import Shape2 from '../../assets/shape/shape2.svg';
import AgreeAlert from '../../components/AgreeAlert';

interface AgreementItemType {
  id: number;
  title: string;
  required: boolean;
  checked: boolean;
}
const Signup1: React.FC = () => {
  const [showAgreeAlert, setShowAgreeAlert] = useState(false);
  const [showPersonalAlert, setShowPersonalAlert] = useState(false);
  // const handleAgreeAlert = () => {
  //   setShowAgreeAlert(true);
  // };

  // const hideAgreeAlert = () => {
  //   setShowAgreeAlert(false);
  // };

  const navigate = useNavigate();
  const handleNext = () => {
    navigate('/signup2'); // "/next" 경로로 이동
  };

  const [agreements, setAgreements] = useState<AgreementItemType[]>([
    { id: 1, title: '이용약관 전체 동의', required: false, checked: false },
    { id: 2, title: '서비스 이용약관 동의', required: true, checked: false },
    { id: 3, title: '개인정보 처리방침 동의', required: true, checked: false }
  ]);

  // 전체 동의 체크박스 변경 핸들러
  const handleAllCheck = () => {
    const isAllChecked = !agreements[0].checked; // 현재 전체 동의 상태 반전
    const updatedAgreements = agreements.map((item) => ({
      ...item,
      checked: isAllChecked
    }));
    setAgreements(updatedAgreements);
  };

  // 개별 체크박스 변경 핸들러
  const handleSingleCheck = (id: number) => {
    const updatedAgreements = agreements.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );

    // 개별 동의 항목이 모두 체크되었는지 확인
    const allChecked = updatedAgreements.slice(1).every((item) => item.checked);

    // 전체 동의 상태도 함께 업데이트
    updatedAgreements[0].checked = allChecked;

    setAgreements(updatedAgreements);
  };

  // 필수 동의 항목(2,3번째)이 모두 체크되었는지 확인
  const isNextDisabled = !(agreements[1].checked && agreements[2].checked);

  // "자세히 보기" 클릭 시 특정 Alert 열기
  const handleDetailClick = (id: number) => {
    if (id === 2) {
      setShowAgreeAlert(true);
    } else if (id === 3) {
      setShowPersonalAlert(true);
    }
  };

  return (
    <Layout>
      <SignupTitle> 회원가입 </SignupTitle>
      <MenuContainer>
        <MenuItemWrapper>
          <MenuItem src={Shape1} />
          <Text1>1&#41; 이용약관 동의</Text1>
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
          <MenuItem src={Shape2} />
          <Text2>4&#41; 가입 완료</Text2>
        </MenuItemWrapper>
      </MenuContainer>
      <CheckForm>
        {agreements.map((item, index) => (
          <>
            <AgreementItem key={item.id}>
              <TextContainer>
                <Title>
                  {item.title}{' '}
                  {item.required && <RequiredTag>(필수)</RequiredTag>}
                </Title>
                {index !== 0 && (
                  <Detail onClick={() => handleDetailClick(item.id)}>
                    자세히 보기 &gt;
                  </Detail>
                )}
              </TextContainer>
              <CheckboxWrapper>
                <Checkbox
                  id={`checkbox-${item.id}`}
                  type="checkbox"
                  checked={item.checked}
                  onChange={() =>
                    index === 0 ? handleAllCheck() : handleSingleCheck(item.id)
                  }
                />
                <CustomCircle htmlFor={`checkbox-${item.id}`} />
              </CheckboxWrapper>
            </AgreementItem>
            {index < agreements.length - 1 && <Line />}
          </>
        ))}
      </CheckForm>
      <NextButton onClick={handleNext} disabled={isNextDisabled}>
        <Next>다음으로</Next>
      </NextButton>
      {showAgreeAlert && (
        <AgreeAlert
          onClose={() => setShowAgreeAlert(false)}
          title="서비스 이용약관"
          message="서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구 서비스 이용약관 어쩌구 저쩌구"
        />
      )}

      {showPersonalAlert && (
        <AgreeAlert
          onClose={() => setShowPersonalAlert(false)}
          title="개인정보 처리방침"
          message="개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침 개인정보 처리방침"
        />
      )}
    </Layout>
  );
};

export default Signup1;

const Layout = styled.div`
  background-color: black;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 132px;
`;
const SignupTitle = styled.div`
  color: var(--main_white, #fff);
  font-family: Pretendard;
  font-size: 48px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: 15.72px;
  display: flex;
  justify-content: center;
  text-align: center;
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 35px;
`;
const MenuItemWrapper = styled.div`
  width: 320px;
  height: 64px;
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
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const Text2 = styled.div`
  position: absolute; /* 부모(MenuItemWrapper)를 기준으로 위치 */
  top: 50%; /* 세로 중앙 정렬 */
  left: 50%; /* 가로 중앙 정렬 */
  transform: translate(-50%, -50%); /* 중앙 정렬을 위한 위치 보정 */
  color: var(--text_secondary-gray, #b2b2b2);
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
const CheckForm = styled.div`
  width: 1000px;
  height: 364px;
  flex-shrink: 0;
  border-radius: 25px;
  border: 2px solid var(--main_purple, #9819c3);
  margin-top: 47px;
  display: flex;
  flex-direction: column;
`;
const AgreementItem = styled.div`
  display: flex;
  justify-content: space-between; /* 텍스트와 체크박스를 양 끝으로 */
  align-items: center;
  //justify-content : center;
  padding-left: 324px;
  padding-right: 340px;
  padding-top: 36px;
  padding-bottom: 30px;
  //border-bottom: 1px solid #4D4D4D;

  /* &:last-child {
    border-bottom: none;
  } */
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column; /* 제목과 자세히 보기를 세로로 정렬 */
  //margin-top : 10px;
`;

const Title = styled.div`
  color: var(--main_white, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const Detail = styled.div`
  color: var(--text_gray, #4d4d4d);
  //text-align: center;
  margin-top: 8px;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  cursor: pointer;
`;

const RequiredTag = styled.span`
  color: var(--main_white, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-left: 5px;
`;

const Line = styled.div`
  height: 1px;

  margin: 0 auto; /* 중앙 정렬 */
  background-color: #ddd; /* 두 번째 항목만 다른 배경색 */
  width: 352px;
  &:nth-of-type(2) {
    background-color: #4d4d4d;
    width: 436px; /* 선 길이 */
  }
`;
const CheckboxWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto; /* 필요시 추가 */
  height: auto; /* 필요시 추가 */
`;

const Checkbox = styled.input`
  position: absolute;
  opacity: 0; /* 기본 체크박스 숨기기 */
  //z-index: -1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CustomCircle = styled.label`
  width: 24px;
  height: 24px;
  border: 1.2px solid #a60f62;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  cursor: pointer;
  position: relative;
  aspect-ratio: 1/1; /* 비율 유지 */
  &:after {
    content: '';
    width: 16.8px;
    height: 16.8px;
    background-color: #a60f62;
    border-radius: 50%;
    aspect-ratio: 1/1;
    opacity: 0;
    transition: opacity 0.2s ease;
    position: absolute;
    top: 50%; /* 부모의 50% */
    left: 50%; /* 부모의 50% */
    transform: translate(-50%, -50%); /* 중심으로 이동 */
  }

  //체크박스가 체크되었을 때
  input:checked + &::after {
    opacity: 1;
    position: absolute;
  }
`;

const NextButton = styled.button`
  width: 300px;
  height: 52px;
  flex-shrink: 0;
  border-radius: 15px;
  background: var(--main_purple, #9819c3);
  margin-top: 30px;
  cursor: pointer;
`;

const Next = styled.div`
  color: var(--main_white, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
