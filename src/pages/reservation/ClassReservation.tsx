import { useEffect, useState, useMemo, useRef } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import FocusedCircle from '../../assets/shape/focusedcircle.svg';
import Level from './_components/Level';
import DetailTab from './_components/tabs/detail/DetailTab';
import ReviewTab from './_components/tabs/review/ReviewTab';
import RatingTab from './_components/tabs/rating/RatingTab';
import { DanceGenre } from '../../api/schema';
import { DanceClass, LikedDanceClass } from '../../types/ClassInterface';
import { formatPrice } from '@/utils/format';
import useFetchData from '../../hooks/useFetchData';
import axiosInstance from '../../api/axios-instance';

const ClassReservation = () => {
  const navigate = useNavigate();
  const { classId } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const { data: classData, fetchData: fetchClass } = useFetchData<DanceClass>();
  const { fetchData: fetchLiked } = useFetchData();

  const [searchParams] = useSearchParams();
  const urlTabQuery = searchParams.get('tab');
  const tabRef = useRef<HTMLDivElement | null>(null);
  const tab = useMemo(
    () => [
      { name: '상세정보', query: 'detail' },
      { name: '리뷰', query: 'reviews' },
      { name: '별점', query: 'rating' }
    ],
    []
  );

  useEffect(() => {
    const fetchClassData = async () => {
      await fetchClass(`/dance-classes/${classId}`);
    };

    const fetchLikedData = async () => {
      const response = await fetchLiked(`/users/wishlists`);
      response.data.data?.danceClasses.find(
        (cls: LikedDanceClass) => cls.id === Number(classId) && setIsLiked(true)
      );
    };

    fetchClassData();
    fetchLikedData();
  }, [classId, fetchClass, fetchLiked]);

  // URL의 tab 쿼리에 맞추어 currentTab을 변경
  // 돌아오기 버튼으로 돌아오는 상황을 위해 setCurrentTab을 여기서 핸들링
  useEffect(() => {
    const curTabIndex = tab.findIndex((t) => t.query === urlTabQuery);
    setCurrentTab(curTabIndex);

    if (!urlTabQuery) {
      navigate(`/classreservation/${classId}?tab=detail`);
    } else {
      navigate(`/classreservation/${classId}?tab=${urlTabQuery}`);
    }
  }, [classId, urlTabQuery, navigate, tab]);

  const handleChatClick = () => {
    const startChat = async () => {
      try {
        const response = await axiosInstance.post(
          `/chats/${classData?.details.dancerId}/start`
        );
        window.open(response.data.data?.openChatUrl);
      } catch (error) {
        console.error('❌ 1:1 채팅 신청 중 오류 발생:', error);
      }
    };
    startChat();
  };

  const handleLikeClick = () => {
    const postLiked = async () => {
      try {
        await axiosInstance.post(`/dance-classes/${classId}/favorite`);
        setIsLiked(true);
      } catch (error) {
        console.error('❌ 수업 찜 등록 중 오류 발생:', error);
      }
    };

    const deleteLiked = async () => {
      try {
        await axiosInstance.delete(`/dance-classes/${classId}/favorite`);
        setIsLiked(false);
      } catch (error) {
        console.error('❌ 수업 찜 해제 중 오류 발생:', error);
      }
    };

    if (isLiked === false) postLiked();
    else deleteLiked();
  };

  const handleTabChange = (index: number) => {
    navigate(`/classreservation/${classId}?tab=${tab[index].query}`);
  };

  return (
    <Container>
      <TitleWrapper>
        <FocusedCircle />
        <Title>{classData?.className}</Title>
      </TitleWrapper>
      <Summary>
        <Image
          src={classData?.dancer?.profileImage}
          alt={`dancer profile of class #${classData?.id}`}
        />
        <InfoContainer>
          <Text>강사 : {classData?.dancer?.name}</Text>
          <Text>
            장르 :{' '}
            {DanceGenre.find((g) => Number(g.id) === classData?.genre)?.Genre}
          </Text>
          <Text>가격 : {formatPrice(classData?.pricePerSession)}원 / 회당</Text>
          <Level level={classData?.difficulty} />
        </InfoContainer>
        <BtnContainer>
          <ChatBtn type="button" onClick={() => handleChatClick()}>
            댄서와 1:1 채팅하기
          </ChatBtn>
          <LikeBtn
            type="button"
            onClick={() => handleLikeClick()}
            $isLiked={isLiked}
          >
            {isLiked ? '찜한 수업 취소하기' : '수업 찜해놓기'}
          </LikeBtn>
        </BtnContainer>
      </Summary>
      <Tabs ref={tabRef}>
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
      {currentTab === 0 && <DetailTab classData={classData} />}
      {currentTab === 1 && <ReviewTab tabRef={tabRef} />}
      {currentTab === 2 && <RatingTab tabRef={tabRef} />}
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
  object-fit: cover;
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

  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 50px; /* 208.333% */
  letter-spacing: -1.2px;

  &:hover {
    cursor: pointer;
  }
`;
const LikeBtn = styled.button<{ $isLiked: boolean }>`
  display: flex;
  width: 420px;
  padding: 10px 87px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 54px;
  border: 4px solid var(--main_purple, #9819c3);
  background: ${({ $isLiked }) => ($isLiked === true ? '#FFF' : 'transparent')};

  color: ${({ $isLiked }) =>
    $isLiked === true ? 'var(--text_purple, #BF00FF)' : '#FFF'};
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 50px; /* 208.333% */
  letter-spacing: -1.2px;

  &:hover {
    cursor: pointer;
    background: rgba(152, 25, 195, 0.4);
  }
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
const Tab = styled.div<{ $isActive: boolean }>`
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
