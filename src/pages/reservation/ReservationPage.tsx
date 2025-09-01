import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import useGetClassDetailById from '../../hooks/reservation/useGetClassDetailById';
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
      <LoadingSpinner isLoading={isLoading} marginTop="180px" marginBottom="180px">
        <ClassSummary classId={classId!} classData={classData!} />
      </LoadingSpinner>

      <TabSection>
        <Tabs ref={tabRef}>
          {tab.map((element, index) => (
            <Tab key={index} $isActive={currentTab === index} onClick={() => handleTabChange(index)}>
              <span>{element.name}</span>
            </Tab>
          ))}
        </Tabs>

        {currentTab === 0 && (
          <LoadingSpinner isLoading={isLoading} marginTop="200px" marginBottom="200px">
            <DetailTab classData={classData!} />
          </LoadingSpinner>
        )}
        {currentTab === 1 && <ReviewTab tabRef={tabRef} />}
        {currentTab === 2 && <RatingTab tabRef={tabRef} />}
      </TabSection>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 12px;
  gap: 56px;

  ${({ theme }) => theme.media.desktop} {
    gap: 78px;
  }
`;
const TabSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 981px;
`;
const Tabs = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 30px;
  flex-shrink: 0;
  border-radius: 15px 15px 0px 0px;
  background: var(--main-purple);

  ${({ theme }) => theme.media.tablet} {
    height: 50px;
    border-radius: 20px 20px 0px 0px;
  }
`;
const Tab = styled.div<{ $isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30px;
  border-radius: 15px 15px 0px 0px;
  border-top: 3px solid var(--main-purple);
  border-right: 3px solid var(--main-purple);
  border-left: 3px solid var(--main-purple);
  box-shadow: 0px 8px 16px -5px var(--main-purple) inset;
  transition: all 0.3s ease;
  cursor: pointer;

  ${({ $isActive }) => $isActive && `background: var(--main-black);`}

  ${({ theme }) => theme.media.tablet} {
    height: 50px;
    border-radius: 20px 20px 0px 0px;
  }

  span {
    color: var(--main-white);
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    line-height: 100%;
    letter-spacing: -0.7px;

    ${({ theme }) => theme.media.tablet} {
      font-size: 20px;
      line-height: 50px;
      letter-spacing: -1px;
    }
  }
`;
