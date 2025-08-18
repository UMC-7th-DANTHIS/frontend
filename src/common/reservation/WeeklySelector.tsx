import styled from 'styled-components';

export const DAYS_OF_WEEK = [
  { key: 'MON', ko: '월' },
  { key: 'TUE', ko: '화' },
  { key: 'WED', ko: '수' },
  { key: 'THU', ko: '목' },
  { key: 'FRI', ko: '금' },
  { key: 'SAT', ko: '토' },
  { key: 'SUN', ko: '일' }
];

const firstRowDays = DAYS_OF_WEEK.slice(0, 4); // 월, 화, 수, 목
const secondRowDays = DAYS_OF_WEEK.slice(4); // 금, 토, 일

interface WeeklySelectorProps {
  dayKey: string;
  setDayKey: (value: string) => void;
}

export const WeeklySelector = ({ dayKey, setDayKey }: WeeklySelectorProps) => {
  const handleSelectWeek = (dayKey: string) => setDayKey(dayKey);

  return (
    <DayButtonsWrapper>
      {/* 월, 화, 수, 목 */}
      <DayButtonRow>
        {firstRowDays.map((day) => (
          <DayButton key={day.key} $isActive={dayKey === day.key} onClick={() => handleSelectWeek(day.key)}>
            <DaySpan>{day.key}</DaySpan>
            <DaySpan>{day.ko}</DaySpan>
          </DayButton>
        ))}
      </DayButtonRow>
      {/* 금, 토, 일 */}
      <DayButtonRow>
        {secondRowDays.map((day) => (
          <DayButton key={day.key} $isActive={dayKey === day.key} onClick={() => handleSelectWeek(day.key)}>
            <DaySpan>{day.key}</DaySpan>
            <DaySpan>{day.ko}</DaySpan>
          </DayButton>
        ))}
      </DayButtonRow>
    </DayButtonsWrapper>
  );
};

const DayButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px 0;

  ${({ theme }) => theme.media.tablet} {
    flex-direction: row;
    gap: 20px;
  }

  ${({ theme }) => theme.media.desktop} {
    flex-direction: column;
  }
`;
const DayButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
`;
const DayButton = styled.button<{ $isActive: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 65px;
  gap: 30px;
  padding: 24px 14px;
  border: none;
  border-radius: 10px;
  background-color: ${({ $isActive }) => ($isActive ? 'var(--main-purple)' : 'rgba(152, 25, 195, 0.4)')};
  backdrop-filter: blur(2px);
  transition: all 0.2s ease-in;
  cursor: pointer;

  ${({ theme }) => theme.media.tablet} {
    min-width: 82px;
    padding: 32px 20px;
    gap: 15px;
  }
`;
const DaySpan = styled.span`
  color: var(--main-white);
  font-size: 14px;
  font-weight: 600;

  ${({ theme }) => theme.media.tablet} {
    font-size: 18px;
  }
`;
