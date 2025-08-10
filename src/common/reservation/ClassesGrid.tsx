import styled from 'styled-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import Pagination from '../../components/Pagination';
import useGetClasses from '../../hooks/reservation/useGetClasses';

interface ClassesGridProps {
  selectedGenre: string;
}

export const ClassesGrid = ({ selectedGenre }: ClassesGridProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const perData = 6;

  const { data: classes, isLoading } = useGetClasses({
    genre: Number(selectedGenre),
    page: currentPage,
    size: perData
  });

  return (
    <LoadingSpinner isLoading={isLoading} marginTop="0px" wrapperWidth="520px">
      <GridContainer>
        <Classes>
          {classes?.danceClasses?.map((cls) => (
            <Class to={`/classreservation/${cls.id}`} key={cls.id}>
              <Image src={cls.thumbnailImage} alt={`class #${cls.id} thumbnail`} />
              <Title>{cls.className}</Title>
              <Dancer>{cls.dancerName}</Dancer>
            </Class>
          ))}
        </Classes>
        <PaginationWrapper>
          {classes && (
            <Pagination
              dataLength={classes.totalElements}
              perData={perData}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </PaginationWrapper>
      </GridContainer>
    </LoadingSpinner>
  );
};

const GridContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 520px;
  height: 100%;
`;
const Classes = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 50px 65px;
`;
const Class = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 140px;
  text-decoration-line: none;
  cursor: pointer;
`;
const Image = styled.img`
  width: 140px;
  height: 140px;
  border-radius: 10px;
  object-fit: cover;
`;
const Title = styled.div`
  margin-top: 20px;
  color: var(--main-white);
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.8px;
  white-space: preserve nowrap;
`;
const Dancer = styled.div`
  margin-top: 6px;
  color: var(--text-secondary-gray);
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.8px;
`;
const PaginationWrapper = styled.div`
  position: absolute;
  bottom: 0;
`;
