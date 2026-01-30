import styled from 'styled-components';
import { formatPrice } from '../../utils/format';
import { Level } from './Level';
import { DanceGenre } from '../../api/schema';
import { DanceClassDetail } from '../../types/class';
import { ClassButtons } from './ClassButtons';
import { ReactComponent as FocusedCircle } from '../../assets/shape/focusedcircle.svg';
import { useAuth } from '../../hooks/useAuth';

interface ClassSummaryProps {
  classId: string;
  classData: DanceClassDetail;
}

export const ClassSummary = ({ classId, classData }: ClassSummaryProps) => {
  const { isLoggedIn } = useAuth();

  return (
    <Container>
      <Title>
        <FocusedCircle width={24} height={24} />
        <h2>{classData?.className}</h2>
      </Title>
      <OverviewAndButtons>
        <Overview>
          <Image src={classData?.dancer.profileImage} alt={`dancer profile of class #${classData?.id}`} />
          <Info>
            <span>
              <h4>강사</h4>
              <p>{classData?.dancer?.name}</p>
            </span>
            <span>
              <h4>장르</h4>
              <p>{DanceGenre.find((g) => Number(g.id) === classData?.genre)?.Genre}</p>
            </span>
            <span>
              <h4>가격</h4>
              <p>{formatPrice(classData?.pricePerSession)}원 / 회당</p>
            </span>
            <Level level={classData?.difficulty} />
          </Info>
        </Overview>

        {isLoggedIn && <ClassButtons classId={classId} dancerId={classData.details.dancerId} />}
      </OverviewAndButtons>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 28px;
`;
const OverviewAndButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1018px;
  padding: 0 18px;
  gap: 36px;

  ${({ theme }) => theme.media.desktop} {
    flex-direction: row;
    justify-content: space-between;
  }
`;
const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  width: 100%;
  max-width: 1018px;
  padding: 0 18px;
  gap: 10px;

  h2 {
    margin: 0;
    color: var(--main-white);
    font-size: 18px;
    font-weight: 600;
    letter-spacing: -0.9px;

    ${({ theme }) => theme.media.tablet} {
      font-size: 24px;
      letter-spacing: -1.2px;
    }
  }
`;
const Overview = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 16px;

  ${({ theme }) => theme.media.tablet} {
    gap: 45px;
  }
`;
const Image = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 10px;
  object-fit: cover;

  ${({ theme }) => theme.media.tablet} {
    width: 298px;
    height: 298px;
  }
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${({ theme }) => theme.media.tablet} {
    gap: 16px;
  }

  h4 {
    margin: 0;
    color: var(--text-purple);
    font-size: 16px;
    font-weight: 600px;
    line-height: 30px;
    letter-spacing: -0.8px;

    ${({ theme }) => theme.media.tablet} {
      font-size: 22px;
      letter-spacing: -1.1px;
    }
  }

  p {
    margin: 0;
    color: var(--main-white);
    font-size: 14px;
    font-weight: 500;
    line-height: 160%;
    letter-spacing: -0.7px;

    ${({ theme }) => theme.media.tablet} {
      font-size: 18px;
      letter-spacing: -0.9px;
    }
  }
`;
