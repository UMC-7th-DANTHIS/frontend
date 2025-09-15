import styled from 'styled-components';
import { ReactComponent as StarFilled } from '../../assets/buttons/starlevel_filled.svg';
import { ReactComponent as StarNonfilled } from '../../assets/buttons/starlevel_nonfilled.svg';
import useIsMobile from '../../hooks/useIsMobile';

export const Level = ({ level }: { level: number | undefined }) => {
  const totalStars = 5;
  const isMobile = useIsMobile();

  return (
    <LevelContainer>
      <h4>난이도</h4>
      <Stars>
        {level &&
          Array.from({ length: totalStars }, (_, index) =>
            index < level ? (
              <StarFilled key={index} width={isMobile ? 16 : 24} height={isMobile ? 16 : 24} />
            ) : (
              <StarNonfilled key={index} width={isMobile ? 16 : 24} height={isMobile ? 16 : 24} />
            )
          )}
      </Stars>
    </LevelContainer>
  );
};

const LevelContainer = styled.div`
  display: flex;
  flex-direction: row;

  ${({ theme }) => theme.media.tablet} {
    flex-direction: column;
  }

  h4 {
    margin: 0;
    color: var(--text-purple);
    font-size: 16px;
    font-weight: 600px;
    line-height: 30px;
    letter-spacing: -0.8px;
    white-space: preserve nowrap;

    ${({ theme }) => theme.media.tablet} {
      font-size: 22px;
      letter-spacing: -1.1px;
    }
  }
`;
const Stars = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 10px;
  gap: 3px;

  ${({ theme }) => theme.media.tablet} {
    margin-left: 0;
    margin-top: 3px;
  }
`;
