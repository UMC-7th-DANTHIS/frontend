import { useState } from 'react';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  parseISO
} from 'date-fns';
import { ReactComponent as ChevronRight } from '../assets/reservation/ChevronRight.svg';
import { ReactComponent as ChevronLeft } from '../assets/reservation/ChevronLeft.svg';
import styled from 'styled-components';
import { ko } from 'date-fns/locale';

const WEEK = ['일', '월', '화', '수', '목', '금', '토'];

interface CalendarProps {
  selectedDates?: string[]; // multiple
  selectedDate?: string; // single
  onDateClick: (day: Date) => void;
  showSelectedDatesBelow?: boolean;
}

const CustomCalendar = ({
  selectedDates,
  selectedDate,
  onDateClick,
  showSelectedDatesBelow = false
}: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const goToPrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const goToNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const isSelected = (day: Date) => {
    const dayStr = format(day, 'yyyy-MM-dd');
    if (selectedDates) return selectedDates.includes(dayStr);
    if (selectedDate) return selectedDate === dayStr;
    return false;
  };

  const handleDeleteDate = (dateStr: string) => {
    if (!selectedDates) return;
    const newDates = selectedDates.filter((d) => d !== dateStr);
    newDates.forEach((d) => onDateClick(parseISO(d)));
  };

  return (
    <Container>
      <CalendarContainer>
        <Header>
          <button onClick={goToPrevMonth}>
            <ChevronLeft />
          </button>
          <span>{format(currentDate, 'yyyy. MM')}</span>
          <button onClick={goToNextMonth}>
            <ChevronRight />
          </button>
        </Header>

        <WeekDays>
          {WEEK.map((day, idx) => (
            <WeekDay key={day} $dayOfWeek={idx}>
              {day}
            </WeekDay>
          ))}
        </WeekDays>

        <DaysGrid>
          {days.map((day) => (
            <DayCell
              key={day.toString()}
              $isCurrentMonth={isSameMonth(day, currentDate)}
              $isToday={isToday(day)}
              $isSelected={isSelected(day)}
              onClick={() => {
                if (!isSameMonth(day, currentDate)) return;
                onDateClick(day);
              }}
            >
              {format(day, 'd')}
            </DayCell>
          ))}
        </DaysGrid>
      </CalendarContainer>

      {showSelectedDatesBelow && (selectedDates?.length || selectedDate) && (
        <SelectedDatesContainer>
          {selectedDates
            ? selectedDates
                .slice()
                .sort((a, b) => {
                  const dateA = parseISO(a);
                  const dateB = parseISO(b);
                  return dateA.getTime() - dateB.getTime();
                })
                .map((d) => {
                  const dateObj = parseISO(d);
                  const formatted = format(dateObj, 'yyyy. MM. dd (EEE)', { locale: ko });
                  return (
                    <SelectedDate key={d}>
                      <Circle />
                      <span>{formatted}</span>
                      <button onClick={() => handleDeleteDate(d)}>삭제</button>
                    </SelectedDate>
                  );
                })
            : selectedDate &&
              (() => {
                const dateObj = parseISO(selectedDate);
                const formatted = format(dateObj, 'yyyy. MM. dd (EEE)', { locale: ko });
                return (
                  <SelectedDate>
                    <span>{formatted}</span>
                  </SelectedDate>
                );
              })()}
        </SelectedDatesContainer>
      )}
    </Container>
  );
};

export default CustomCalendar;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const CalendarContainer = styled.div`
  width: 100%;
  max-width: 360px;
  padding: 20px 10px;
  border-radius: 10px;
  box-shadow: 0 0 15px 0 #9819c3;
  color: var(--main-white);
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 30px;
  margin-bottom: 20px;
  span {
    font-size: 20px;
    font-weight: 700;
    line-height: 140%;
  }
  button {
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
`;
const WeekDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  padding-bottom: 16px;
  margin-bottom: 16px;
  border-bottom: 1px solid var(--main-white);
`;
const WeekDay = styled.div<{ $dayOfWeek: number }>`
  font-size: 16px;
  font-weight: 400;
  line-height: 140%;
  color: ${({ $dayOfWeek }) =>
    $dayOfWeek === 0 ? 'var(--highlight-red)' : $dayOfWeek === 6 ? 'var(--highlight-blue)' : 'var(--main-white)'};
`;
const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  justify-items: center;
  gap: 16px 0;
`;
const DayCell = styled.div<{ $isCurrentMonth: boolean; $isToday: boolean; $isSelected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 38px;
  height: 38px;
  border-radius: 10px;

  font-size: 16px;
  font-weight: 400;
  line-height: 140%;
  transition: all 0.1s ease-in;

  color: ${({ $isCurrentMonth }) => (!$isCurrentMonth ? 'transparent' : 'inherit')};
  cursor: ${({ $isCurrentMonth }) => ($isCurrentMonth ? 'pointer' : 'default')};
  pointer-events: ${({ $isCurrentMonth }) => ($isCurrentMonth ? 'auto' : 'none')};

  ${({ $isSelected }) =>
    $isSelected &&
    `
    background-color: var(--main-purple);
    font-size: 18px;
    font-weight: 600;
  `}

  ${({ $isToday }) => $isToday && `border: 1px solid var(--main-purple)`}
`;
const SelectedDatesContainer = styled.div`
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 25px;
  gap: 6px;
`;
const SelectedDate = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 18px;
  padding: 4px 8px;
  border-radius: 6px;
  color: var(--main-white);

  span {
    flex: 1;
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 300;

    ${({ theme }) => theme.media.tablet} {
      font-size: 16px;
    }
  }

  button {
    background: transparent;
    border: none;
    color: var(--main-white);
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 600;
    text-decoration-line: underline;
    text-decoration-style: solid;
    text-underline-position: from-font;
    cursor: pointer;

    ${({ theme }) => theme.media.tablet} {
      font-size: 16px;
    }
  }
`;

const Circle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--main-purple);
`;
