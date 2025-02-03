import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import dummyClass from '../../store/reservation/dummyClass';
import { ReactComponent as FocusedCircle } from '../../assets/shape/focusedcircle.svg';
import Level from './components/Level';
import TabMenu from './components/TabMenu';

const ClassReservation = () => {
  // const { classId- } = useParams();
  const classId = 1; // 임시
  const data = dummyClass.find((cls) => cls.id === Number(classId));

  const [isLiked, setIsLiked] = useState(false);

  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const initialTab = tabParam ? Number(tabParam) : 0;
  const navigate = useNavigate();

  useEffect(() => {
    if (!tabParam) {
      navigate(`/classreservation/${classId}?tab=detail`);
    }
  }, [tabParam, navigate, classId]);

  // 수업 찜 버튼 핸들러
  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  return (
    <Container>
      <TitleWrapper>
        <FocusedCircle />
        <Title>{data.title}</Title>
      </TitleWrapper>
      <Summary>
        <Image src={data.dancerImg} alt={`dancer #${data.id}`} />
        <InfoContainer>
          <Text>강사 : {data.dancer}</Text>
          <Text>장르 : {data.genre}</Text>
          <Text>가격 : {data.price}원 / 회당</Text>
          <Level level={data.level} />
        </InfoContainer>
        <BtnContainer>
          <ChatBtn type="button">
            <BtnText>댄서와 1:1 채팅하기</BtnText>
          </ChatBtn>
          <LikeBtn type="button" onClick={() => handleLikeClick()}>
            {isLiked ? (
              <BtnText>찜한 수업 취소하기</BtnText>
            ) : (
              <BtnText>수업 찜해놓기</BtnText>
            )}
          </LikeBtn>
        </BtnContainer>
      </Summary>
      <TabMenu data={data} initialTab={initialTab} />
    </Container>
  );
};

export default ClassReservation;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
  background-color: black;
`;
const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 1200px;
`;
const Title = styled.div`
  margin-left: 10px;
  color: var(--main_white, #fff);
  font-family: Pretendard;
  font-size: 30px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -1.5px;
`;
const Summary = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 38px;
  padding-bottom: 53px;
`;
const Image = styled.img`
  width: 298px;
  height: 298px;
  border-radius: 10px;
  background: url(<path-to-image>) lightgray 50% / cover no-repeat;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover; // 비율 유지
  }
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 298px;
  margin-left: 53px;
  margin-right: 120px;
`;
const Text = styled.div`
  margin: 3px 0;
  color: var(--main_white, #fff);
  font-family: Pretendard;
  font-size: 28px;
  font-style: normal;
  font-weight: 600;
  line-height: 50px; /* 178.571% */
  letter-spacing: -1.4px;
`;
const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ChatBtn = styled.button`
  display: flex;
  width: 420px;
  padding: 10px 43px;
  margin-bottom: 23px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 68px;
  border: none;
  background: var(
    --main-gradation,
    linear-gradient(90deg, #b30505 0%, #9819c3 100%)
  );

  &:hover {
    cursor: pointer;
  }
`;
const LikeBtn = styled.button`
  display: flex;
  width: 420px;
  padding: 10px 87px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 54px;
  border: 4px solid var(--main_purple, #9819c3);
  background: transparent;

  &:hover {
    cursor: pointer;
  }
`;
const BtnText = styled.span`
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 50px; /* 208.333% */
  letter-spacing: -1.2px;
`;
