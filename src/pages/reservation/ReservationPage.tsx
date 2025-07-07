import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { ReactComponent as FocusedCircle } from '../../assets/shape/focusedcircle.svg';
import LoadingSpinner from '../../components/LoadingSpinner';
import { DetailTab, Level, RatingTab, ReviewTab } from '../../common/reservation';

import { DanceGenre } from '../../api/schema';
import useGetClassDetailById from '../../hooks/reservation/useGetClassDetailById';
import { formatPrice } from '../../utils/format';
import usePostChat from '../../hooks/reservation/usePostChat';
import usePostLiked from '../../hooks/reservation/usePostLiked';
import useGetMyLiked from '../../hooks/reservation/useGetMyLiked';
import { LikedClass } from '../../types/class';
import useDeleteLiked from '../../hooks/reservation/useDeleteLiked';

export default function ReservationPage() {
  const navigate = useNavigate();
  const { classId } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);

  const { data: classData, isLoading } = useGetClassDetailById(classId ?? '');
  const { data: myLiked } = useGetMyLiked();
  const { mutate: postChat } = usePostChat();
  const { mutate: postLiked } = usePostLiked();
  const { mutate: deleteLiked } = useDeleteLiked();

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

  // currentTab 변경
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

  // 유저의 수업 찜 여부
  useEffect(() => {
    if (!myLiked || !classId) return;

    const matched = myLiked.danceClasses?.some((cls: LikedClass) => cls.id === Number(classId));
    setIsLiked(!!matched);
  }, [myLiked, classId]);

  const handleTabChange = (index: number) => {
    navigate(`/classreservation/${classId}?tab=${tab[index].query}`);
  };

  const handleChatClick = (dancerId: number) => postChat(dancerId);
  const handleLikeClick = () => {
    if (!isLiked) postLiked(classId ?? '');
    else deleteLiked(classId ?? '');
  };

  if (!classData)
    return (
      <Container>
        <LoadingSpinner isLoading={isLoading} />
      </Container>
    );

  return (
    <Container>
      <TitleWrapper>
        <FocusedCircle />
        <Title>{classData?.className}</Title>
      </TitleWrapper>
      <Summary>
        <Image src={classData?.dancer.profileImage} alt={`dancer profile of class #${classData?.id}`} />
        <InfoContainer>
          <Text>강사 : {classData?.dancer?.name}</Text>
          <Text>장르 : {DanceGenre.find((g) => Number(g.id) === classData?.genre)?.Genre}</Text>
          <Text>가격 : {formatPrice(classData?.pricePerSession)}원 / 회당</Text>
          <Level level={classData?.difficulty} />
        </InfoContainer>
        <BtnContainer>
          <ChatBtn type="button" onClick={() => handleChatClick(classData.details.dancerId)}>
            댄서와 1:1 채팅하기
          </ChatBtn>
          <LikeBtn type="button" onClick={() => handleLikeClick()} $isLiked={isLiked}>
            {isLiked ? '찜한 수업 취소하기' : '수업 찜해놓기'}
          </LikeBtn>
        </BtnContainer>
      </Summary>
      <Tabs ref={tabRef}>
        {tab.map((element, index) => (
          <Tab key={index} $isActive={currentTab === index} onClick={() => handleTabChange(index)}>
            {element.name}
          </Tab>
        ))}
      </Tabs>
      {currentTab === 0 && <DetailTab classData={classData} />}
      {currentTab === 1 && <ReviewTab tabRef={tabRef} />}
      {currentTab === 2 && <RatingTab tabRef={tabRef} />}
    </Container>
  );
}

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
  background: var(--main-gradation, linear-gradient(90deg, #b30505 0%, #9819c3 100%));

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

  color: ${({ $isLiked }) => ($isLiked === true ? 'var(--text_purple, #BF00FF)' : '#FFF')};
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
