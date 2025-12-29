import { ClassFormState, Weekday } from '@/types/registration';
import CustomCalendar from '../../../../components/Calendar';
import styled from 'styled-components';
import { format } from 'date-fns';

const WEEK = ['월', '화', '수', '목', '금', '토', '일'] as const;
type WeekLabel = (typeof WEEK)[number];

const WEEKDAY_MAP: Record<WeekLabel, Weekday> = {
  월: 'MON',
  화: 'TUE',
  수: 'WED',
  목: 'THU',
  금: 'FRI',
  토: 'SAT',
  일: 'SUN'
};

interface WeekdayOrDatePickerProps {
  days: Weekday[];
  dates: string[];
  handleFormChange: <K extends keyof ClassFormState>(key: K, value: ClassFormState[K]) => void;
}

export const WeekdayOrDatePicker = ({ days, dates, handleFormChange }: WeekdayOrDatePickerProps) => {
  const handleWeekClick = (w: WeekLabel) => {
    const weekday = WEEKDAY_MAP[w];
    if (days.includes(weekday)) {
      handleFormChange(
        'days',
        days.filter((d) => d !== weekday)
      );
    } else {
      handleFormChange('days', [...days, weekday]);
    }
  };

  const handleDateClick = (day: Date) => {
    const d = format(day, 'yyyy-MM-dd');

    if (dates.includes(d)) {
      handleFormChange(
        'dates',
        dates.filter((x) => x !== d)
      );
    } else {
      handleFormChange('dates', [...dates, d]);
    }
  };

  return (
    <Container>
      <WeekWrap>
        {WEEK.map((w) => {
          const weekday = WEEKDAY_MAP[w];
          return (
            <WeekButton
              type="button"
              key={w}
              className={days.includes(weekday) ? 'active' : ''}
              onClick={() => handleWeekClick(w)}
            >
              {w}
            </WeekButton>
          );
        })}
      </WeekWrap>

      <Divider>or</Divider>

      <Notice>* 특정 요일마다 진행되는 수업이 아니라면, 수업이 열리는 날짜를 모두 선택해주세요.</Notice>
      <CustomCalendar selectedDates={dates} onDateClick={handleDateClick} showSelectedDatesBelow={true} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
`;
const WeekWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;

  ${({ theme }) => theme.media.desktop} {
    gap: 26px;
  }
`;
const WeekButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  flex-shrink: 0;

  border-radius: 999px;
  border: 1px solid var(--main-purple);
  color: var(--main-white);
  background: transparent;
  cursor: pointer;

  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    color: var(--text-purple);
    transition: all 0.1s ease-in-out;
  }

  &.active {
    background: var(--main-purple);
    font-weight: 600;
  }

  ${({ theme }) => theme.media.desktop} {
    width: 48px;
    height: 48px;
    font-size: 20px;
  }
`;
const Divider = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 24px 0;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 300;
  color: var(--sub-light-gray);

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--text-gray);
  }

  &::before {
    margin-right: 10px;
  }
  &::after {
    margin-left: 10px;
  }

  ${({ theme }) => theme.media.desktop} {
    margin: 30px 0;
    font-size: 14px;
  }
`;
const Notice = styled.p`
  margin-bottom: 20px;
  text-align: center;
  white-space: normal;
  word-break: keep-all;
  overflow-wrap: break-word;

  color: var(--text-secondary-gray);
  font-family: Pretendard;
  font-size: 10px;
  font-weight: 300;

  ${({ theme }) => theme.media.desktop} {
    font-size: 14px;
  }
`;
