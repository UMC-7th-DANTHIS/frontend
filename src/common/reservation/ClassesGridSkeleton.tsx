import Skeleton from '../../components/Skeleton';
import styled from 'styled-components';

export const ClassSkeleton = () => {
  return (
    <SkeletonCard>
      <ImageSkeleton>
        <Skeleton width="100%" height="100%" radius={10} />
      </ImageSkeleton>
      <TextSkeletonContainer>
        <Skeleton width="90%" height={20} radius={7} />
        <Skeleton width="60%" height={20} radius={7} />
      </TextSkeletonContainer>
    </SkeletonCard>
  );
};

export const ClassesGridSkeleton = () => {
  const skeleton = Array.from({ length: 6 });

  return (
    <GridContainer>
      <Classes>
        {skeleton.map((_, i) => (
          <ClassSkeleton key={i} />
        ))}
      </Classes>
      <PaginationWrapper>
        <Skeleton width="300px" height={32} radius={10} />
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

  ${({ theme }) => theme.media.desktop} {
    padding-top: 24px;
    min-height: 578px;
  }
`;
const Classes = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 46px 28px;

  ${({ theme }) => theme.media.tablet} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 46px 65px;
  }
`;
const PaginationWrapper = styled.div`
  margin-top: 60px;
`;
const SkeletonCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
`;
const ImageSkeleton = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
`;

const TextSkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
`;
