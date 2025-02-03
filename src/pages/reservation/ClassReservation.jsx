import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import dummyClass from '../../store/reservation/dummyClass';
import { ReactComponent as FocusedCircle } from '../../assets/shape/focusedcircle.svg';
import Level from './components/Level';
import DetailTab from './components/tabs/detail/DetailTab';
import ReviewTab from './components/tabs/review/ReviewTab';
import RatingTab from './components/tabs/rating/RatingTab';

const ClassReservation = () => {
  const classId = 1; // 임시
  const data = dummyClass.find((cls) => cls.id === Number(classId));

  const [isLiked, setIsLiked] = useState(false);

  const [currentTab, setCurrentTab] = useState(1);
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const navigate = useNavigate();

  const tab = [
    { id: 1, name: '상세정보', query: 'detail' },
    { id: 2, name: '리뷰', query: 'reviews' },
    { id: 3, name: '별점', query: 'rating' }
  ];

  useEffect(() => {
    const curTabIndex = tab.findIndex((t) => t.query === tabParam);
    setCurrentTab(curTabIndex);

    if (!tabParam) {
      navigate(`/classreservation/${classId}?tab=detail`);
    } else {
      navigate(`/classreservation/${classId}?tab=${tabParam}`);
    }
  }, [tabParam]);

  // 수업 찜 버튼 핸들러
  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  // 탭 메뉴 핸들러
  const handleTabChange = (index) => {
    setCurrentTab(index);
    navigate(`/classreservation/${classId}?tab=${tab[index].query}`);
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
      <Tabs>
        {tab.map((element, index) => (
          <Tab
            key={index}
            $isActive={currentTab === index}
            onClick={() => handleTabChange(index)}
          >
            {element.name}
          </Tab>
        ))}
      </Tabs>
      {currentTab === 0 && <DetailTab data={data} />}
      {currentTab === 1 && <ReviewTab />}
      {currentTab === 2 && <RatingTab data={data} />}
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
const Tabs = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 1240px;
  height: 86px;
  flex-shrink: 0;
  border-radius: 20px 20px 0px 0px;
  background: var(--main_purple, #9819c3);
`;
const Tab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 410px;
  height: 83px;
  color: var(--main_white, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 28px;
  font-style: normal;
  font-weight: 600;
  line-height: 50px; /* 178.571% */
  letter-spacing: -1.4px;
  transition: all 0.3s ease;
  border-radius: 20px 20px 0px 0px;
  border-top: 3px solid var(--main_purple, #9819c3);
  border-right: 3px solid var(--main_purple, #9819c3);
  border-left: 3px solid var(--main_purple, #9819c3);
  box-shadow: 0px 8px 16px 0px var(--main_purple, #9819c3) inset;

  ${({ $isActive }) => $isActive && `background: var(--main_black, #000);`}

  &:hover {
    cursor: pointer;
  }
`;
