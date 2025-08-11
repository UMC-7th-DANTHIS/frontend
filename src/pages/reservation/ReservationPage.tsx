import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import useGetClassDetailById from '../../hooks/reservation/useGetClassDetailById';
import { ReactComponent as FocusedCircle } from '../../assets/shape/focusedcircle.svg';
import LoadingSpinner from '../../components/LoadingSpinner';
import { ClassSummary, DetailTab, RatingTab, ReviewTab } from '../../common/reservation';

export default function ReservationPage() {
  const navigate = useNavigate();
  const { classId } = useParams();
  const [currentTab, setCurrentTab] = useState(0);

  const { data: classData, isLoading } = useGetClassDetailById(classId ?? '');

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

  const handleTabChange = (index: number) => {
    navigate(`/classreservation/${classId}?tab=${tab[index].query}`);
  };

  // currentTab 변경: 돌아오기 버튼으로 돌아오는 상황을 위해 setCurrentTab을 여기서 핸들링
  useEffect(() => {
    const curTabIndex = tab.findIndex((t) => t.query === urlTabQuery);
    setCurrentTab(curTabIndex);

    if (!urlTabQuery) navigate(`/classreservation/${classId}?tab=detail`);
    else navigate(`/classreservation/${classId}?tab=${urlTabQuery}`);
  }, [classId, urlTabQuery, navigate, tab]);

  return (
    <Container>
      <TitleWrapper>
        <FocusedCircle />
        <Title>{classData?.className}</Title>
      </TitleWrapper>

      {classId && !isLoading ? (
        <ClassSummary classId={classId!} classData={classData!} />
      ) : (
        <LoadingSpinner isLoading={isLoading} marginTop="180px" marginBottom="180px" />
      )}

      <Tabs ref={tabRef}>
        {tab.map((element, index) => (
          <Tab key={index} $isActive={currentTab === index} onClick={() => handleTabChange(index)}>
            {element.name}
          </Tab>
        ))}
      </Tabs>
      {currentTab === 0 &&
        (isLoading ? (
          <LoadingSpinner isLoading={isLoading} marginTop="200px" marginBottom="200px" />
        ) : (
          <DetailTab classData={classData!} />
        ))}
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
