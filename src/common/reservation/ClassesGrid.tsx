import styled from 'styled-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import useGetClasses from '../../hooks/reservation/useGetClasses';
import { ClassesGridSkeleton } from './ClassesGridSkeleton';
import { useDateSelectionStore } from '../../store/dateSelectionStore';
import { DATE_TYPE } from '../../types/reservation';
import { format } from 'date-fns';

interface ClassesGridProps {
  selectedGenre: string;
}

export const ClassesGrid = ({ selectedGenre }: ClassesGridProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const SIZE = 6;

  const selectedType = useDateSelectionStore((store) => store.type);
  const selectedDay = useDateSelectionStore((store) => store.day);
  const selectedDate = useDateSelectionStore((store) => store.date);

  const params =
    selectedType === DATE_TYPE.WEEKLY ? { day: selectedDay } : { date: format(selectedDate, 'yyyy-MM-dd') };

  const { data: classes, isLoading } = useGetClasses({
    genre: Number(selectedGenre),
    page: currentPage,
    size: SIZE,
    ...params
  });

  if (isLoading || !classes) return <ClassesGridSkeleton />;

  return (
    <GridContainer>
      {classes.danceClasses.length > 0 ? (
        <Classes>
          {classes.danceClasses?.map((cls) => (
            <Class to={`/classes/${cls.id}`} key={cls.id}>
              <Image src={cls.thumbnailImage} />
              <TextContainer>
                <Title>{cls.className}</Title>
                <Dancer>{cls.dancerName}</Dancer>
              </TextContainer>
            </Class>
          ))}

          {Array.from({ length: SIZE - classes.danceClasses.length }).map((_, i) => (
            <ClassPlaceholder key={`placeholder-${i}`} />
          ))}
        </Classes>
      ) : (
        <NoClass>등록된 수업이 없습니다.</NoClass>
      )}

      <PaginationWrapper>
        <Pagination
          dataLength={classes.totalElements}
          perData={SIZE}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </PaginationWrapper>
    </GridContainer>
  );
};

const GridContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  min-height: 578px;

  ${({ theme }) => theme.media.desktop} {
    padding-top: 24px;
  }
`;
const Classes = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 46px 28px;

  ${({ theme }) => theme.media.tablet} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 50px 65px;
  }
`;
const Class = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  text-decoration-line: none;
  cursor: pointer;
`;
const Image = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 10px;
  object-fit: cover;
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 6px;
  overflow: hidden;
`;
const Title = styled.div`
  width: 100%;
  text-align: center;
  color: var(--main-white);
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Dancer = styled.div`
  width: 100%;
  text-align: center;
  color: var(--text-secondary-gray);
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const PaginationWrapper = styled.div`
  margin-top: 60px;
`;
const NoClass = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 208px 0;
  text-align: center;
  color: var(--text-secondary-gray);
`;
const ClassPlaceholder = styled.div`
  width: 100%;
  padding: 97px 0;
  aspect-ratio: 1 / 1;
  border-radius: 10px;
  background: transparent;
  pointer-events: none;
`;
