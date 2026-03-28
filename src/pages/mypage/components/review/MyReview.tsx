import { useMemo, useState } from 'react';
import styled from 'styled-components';
import Pagination from '../../../../components/Pagination';
import { useNavigate } from 'react-router-dom';
import api from '../../../../api/api';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';
import {
  DanceClassProps,
  FetchTakeClassResponse
} from '@/types/mypage/ReviewType';
import useIsMobile from '../../../../hooks/useIsMobile';

const fetchTakeClass = async (
  currentPage: number,
  perData: number
): Promise<FetchTakeClassResponse> => {
  const token = localStorage.getItem('token');
  const response = await api.get('/users/dance-classes', {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {
      page: currentPage,
      size: perData
    }
  });

  const raw = response.data.data.danceClasses || [];

  return {
    classlist: raw.map((c: DanceClassProps & { hasReview?: boolean; reviewWritten?: boolean }) => ({
      id: c.id,
      className: c.className,
      dancerName: c.dancerName,
      thumbnailImage: c.thumbnailImage,
      hasReview: c.hasReview ?? c.reviewWritten
    })),
    totalElements: response.data.data.totalElements || 0
  };
};

const fetchReviewedClassIds = async (): Promise<number[]> => {
  const token = localStorage.getItem('token');
  const ids = new Set<number>();
  let page = 1;
  const size = 100;

  for (;;) {
    const response = await api.get('/users/reviews', {
      headers: { Authorization: `Bearer ${token}` },
      params: { page, size }
    });
    const data = response.data?.data;
    const raw = data?.reviews ?? [];
    const totalElements = Number(data?.totalElements ?? 0);

    for (const r of raw) {
      const cid = r.classId ?? r.danceClassId;
      if (typeof cid === 'number' && !Number.isNaN(cid)) ids.add(cid);
    }

    if (raw.length === 0 || page * size >= totalElements) break;
    page += 1;
  }

  return Array.from(ids);
};

const MyReview = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const perData = 9;
  const isMobile = useIsMobile();

  const { data, isLoading, isError, error } = useQuery<FetchTakeClassResponse>({
    queryKey: ['usertakeclass', currentPage, perData],
    queryFn: () => fetchTakeClass(currentPage, perData)
  });

  const { data: reviewedClassIds = [], isLoading: isReviewIdsLoading } = useQuery({
    queryKey: ['userReviewClassIds'],
    queryFn: fetchReviewedClassIds,
    staleTime: 1000 * 60
  });

  const reviewedSet = useMemo(() => new Set(reviewedClassIds), [reviewedClassIds]);

  if (isLoading || isReviewIdsLoading) {
    return <LoadingSpinner isLoading={true} />;
  }

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }

  const handleImageClick = (danceClass: DanceClassProps) => {
    const done = reviewedSet.has(danceClass.id) || danceClass.hasReview === true;
    if (done) return;
    navigate(`/review/${danceClass.id}`, {
      state: { className: danceClass.className }
    });
  };

  const classList = Array.isArray(data?.classlist) ? data?.classlist : [];

  return (
    <>
      {classList?.length === 0 ? (
        <NoClassMessage>수강한 수업이 없습니다.</NoClassMessage>
      ) : (
        <>
          <ClassContainer>
            {classList?.map((danceClass) => {
              const isCompleted =
                reviewedSet.has(danceClass.id) || danceClass.hasReview === true;

              return (
                <ClassList key={danceClass.id} $completed={isCompleted}>
                  <ThumbWrap
                    $isMobile={isMobile}
                    $completed={isCompleted}
                    onClick={() => handleImageClick(danceClass)}
                    role="button"
                    tabIndex={isCompleted ? -1 : 0}
                    onKeyDown={(e) => {
                      if (isCompleted) return;
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleImageClick(danceClass);
                      }
                    }}
                    aria-disabled={isCompleted}
                  >
                    <ThumbImage
                      src={danceClass.thumbnailImage}
                      alt=""
                      $completed={isCompleted}
                    />
                    {isCompleted && (
                      <ThumbOverlay>
                        <OverlayText>리뷰 작성 완료</OverlayText>
                      </ThumbOverlay>
                    )}
                  </ThumbWrap>
                  <Title $completed={isCompleted}>{danceClass.className}</Title>
                  <Singer $completed={isCompleted}>{danceClass.dancerName}</Singer>
                </ClassList>
              );
            })}
          </ClassContainer>
          <PaginationContainer>
            <Pagination
              dataLength={data?.totalElements ?? 0}
              perData={perData}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </PaginationContainer>
        </>
      )}
    </>
  );
};

export default MyReview;

const ClassContainer = styled.div`
  display: grid;
  margin-top: 40px;
  justify-content: center;
  align-items: center;
  justify-items: center;
  grid-template-columns: repeat(3, 220px);
  column-gap: 103px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 200px);
    column-gap: 40px;
    row-gap: 40px;
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 140px);
    column-gap: 28px;
    row-gap: 28px;
    margin-top: 40px;
    margin-left: 0;
    margin-right: 0;
    justify-content: center;
    justify-items: center;
  }
`;

const ClassList = styled.div<{ $completed: boolean }>`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: ${({ $completed }) => ($completed ? 'none' : 'auto')};
  opacity: ${({ $completed }) => ($completed ? 0.92 : 1)};
`;

const Title = styled.div<{ $completed: boolean }>`
  color: ${({ $completed }) => ($completed ? '#6d6d6d' : '#fff')};
  font-size: 24px;
  font-weight: 600;
  margin-top: 9px;
  letter-spacing: -1.2px;
  text-align: center;
  word-break: keep-all;

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const Singer = styled.div<{ $completed: boolean }>`
  color: ${({ $completed }) => ($completed ? '#4a4a4a' : '#b2b2b2')};
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 53px;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const ThumbWrap = styled.div<{ $isMobile: boolean; $completed: boolean }>`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
  cursor: ${({ $completed }) => ($completed ? 'default' : 'pointer')};

  ${({ $isMobile }) =>
    $isMobile
      ? `
    width: 140px;
    height: 140px;
  `
      : `
    width: 220px;
    height: 220px;
  `}
`;

const ThumbImage = styled.img<{ $completed: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 10px;

  ${({ $completed }) =>
    $completed &&
    `
    filter: blur(6px) brightness(0.42);
    transform: scale(1.06);
  `}
`;

const ThumbOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.38);
  border-radius: 10px;
  pointer-events: none;
`;

const OverlayText = styled.span`
  color: #DDDDDD;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  line-height: 1.35;
  padding: 0 10px;

  @media (max-width: 600px) {
    font-size: 13px;
    padding: 0 6px;
  }
`;

const PaginationContainer = styled.div`
  margin-bottom: 205px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const NoClassMessage = styled.div`
  color: #fff;
  text-align: center;
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 100px;
  margin-top: 219px;
`;
