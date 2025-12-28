import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import useGetClassDetailById from '../../hooks/reservation/useGetClassDetailById';
import LoadingSpinner from '../../components/LoadingSpinner';
import {
  ClassSummary,
  DetailTab,
  RatingTab,
  ReviewTab
} from '../../common/reservation';
import { ScrollToTop } from '../../components/ScrollToTop';

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
    navigate(`/classes/${classId}?tab=${tab[index].query}`);
  };

  // currentTab 변경: 돌아오기 버튼으로 돌아오는 상황을 위해 setCurrentTab을 여기서 핸들링
  useEffect(() => {
    const curTabIndex = tab.findIndex((t) => t.query === urlTabQuery);
    setCurrentTab(curTabIndex);

    if (!urlTabQuery) navigate(`/classes/${classId}?tab=detail`);
    else navigate(`/classes/${classId}?tab=${urlTabQuery}`);
  }, [classId, urlTabQuery, navigate, tab]);

  return (
    <Container>
      <ScrollToTop />

      <LoadingSpinner
        isLoading={isLoading}
        marginTop="180px"
        marginBottom="180px"
      >
        <ClassSummary classId={classId!} classData={classData!} />
      </LoadingSpinner>

      <TabSection>
        <Tabs ref={tabRef}>
          <TabSlider $currentTab={currentTab} />
          {tab.map((element, index) => (
            <Tab
              key={index}
              $isActive={currentTab === index}
              onClick={() => handleTabChange(index)}
            >
              <span>{element.name}</span>
            </Tab>
          ))}
        </Tabs>

        {currentTab === 0 && (
          <LoadingSpinner
            isLoading={isLoading}
            marginTop="200px"
            marginBottom="200px"
          >
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
  height: 38px;
  flex-shrink: 0;
  background: var(--kakaotalk_label);
  ${({ theme }) => theme.media.tablet} {
    height: 58px;
  }
`;

const TabSlider = styled.div<{ $currentTab: number }>`
  position: absolute;
  bottom: 0;
  left: ${({ $currentTab }) => $currentTab * 33.333}%;
  width: 33.333%;
  height: 3px;
  background-color: var(--main-purple);
  transition: left 0.3s ease-in-out;

  ${({ theme }) => theme.media.tablet} {
    height: 6px;
  }
`;

const Tab = styled.div<{ $isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 30px;
  transition: all 0.3s ease;
  cursor: pointer;

  ${({ theme }) => theme.media.tablet} {
    height: 58px;
    //border-radius: 20px 20px 0px 0px;

    ${({ $isActive }) =>
      $isActive && `border-bottom: 6px solid var(--main-purple);`}
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
