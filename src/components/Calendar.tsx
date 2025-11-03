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
  isSameDay,
  isToday
} from 'date-fns';
import { ReactComponent as ChevronRight } from '../assets/reservation/ChevronRight.svg';
import { ReactComponent as ChevronLeft } from '../assets/reservation/ChevronLeft.svg';
import styled from 'styled-components';

const WEEK = ['일', '월', '화', '수', '목', '금', '토'];

interface CalendarProps {
  selectedDate: Date;
  onDateClick: (day: Date) => void;
}

const CustomCalendar = ({ selectedDate, onDateClick }: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate); // 이번 달의 시작일
  const monthEnd = endOfMonth(currentDate); // 이번 달의 마지막일
  const calendarStart = startOfWeek(monthStart); // 달력의 시작일
  const calendarEnd = endOfWeek(monthEnd); // 달력의 마지막일

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const goToPrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const goToNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const handleDateClick = (day: Date) => {
    if (isSameMonth(day, currentDate)) {
      onDateClick(day);
    }
  };

  return (
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
            $isSelected={isSameDay(day, selectedDate)} // 선택된 날짜인지 확인
            onClick={() => handleDateClick(day)}
          >
            {format(day, 'd')}
          </DayCell>
        ))}
      </DaysGrid>
    </CalendarContainer>
  );
};

export default CustomCalendar;

const CalendarContainer = styled.div`
  width: 100%;
  max-width: 360px;
  padding: 20px 10px;
  border-radius: 10px;
  box-shadow: 0 0 15px 0 #9819c3;
  color: var(--main-white);
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
  color: ${({ $dayOfWeek }) => {
    if ($dayOfWeek === 0) return 'var(--highlight-red)';
    if ($dayOfWeek === 6) return 'var(--highlight-blue)';
    return 'var(--main-white)';
  }};
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
  color: ${({ $isCurrentMonth }) => !$isCurrentMonth && 'transparent'};
  font-size: 16px;
  font-weight: 400;
  line-height: 140%;
  transition: all 0.1s ease-in;
  cursor: pointer;

  ${({ $isSelected }) =>
    $isSelected &&
    `background-color: var(--main-purple);
    font-size: 18px;
    font-weight: 600;`}

  ${({ $isToday }) => $isToday && `border: 1px solid var(--main-purple)`}
`;
