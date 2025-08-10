import { useState } from 'react';
import styled from 'styled-components';
import { DateTypeToggle } from './DateTypeToggle';
import { DATE_TYPE, DateType } from '../../types/reservation';
import CustomCalendar from '../../components/Calendar';
import { DAYS_OF_WEEK, WeeklySelector } from './WeeklySelector';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export const SelectionPanel = () => {
  const [selectedType, setSelectedType] = useState<DateType>(DATE_TYPE.WEEKLY);
  const [selectedDayKey, setSelectedDayKey] = useState<string>('MON');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const selectedDayName = DAYS_OF_WEEK.find((day) => day.key === selectedDayKey)?.ko;
  const formattedDate = format(selectedDate, 'yyyy. MM. dd (E)', {
    locale: ko
  });

  return (
    <PanelContainer>
      <PanelHeader>
        <DateTypeToggle selectedType={selectedType} setSelectType={setSelectedType} />
        <SelectedDate>
          선택: <DateText>{selectedType === DATE_TYPE.WEEKLY ? selectedDayName : formattedDate}</DateText>
        </SelectedDate>
      </PanelHeader>

      {selectedType === DATE_TYPE.WEEKLY && <WeeklySelector dayKey={selectedDayKey} setDayKey={setSelectedDayKey} />}
      {selectedType === DATE_TYPE.DATE && <CustomCalendar selectedDate={selectedDate} onDateClick={setSelectedDate} />}
    </PanelContainer>
  );
};

const PanelContainer = styled.div`
  width: 420px;
  height: 100%;
  align-items: center;
  gap: 80px;
`;
const PanelHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  white-space: preserve nowrap;
`;
const SelectedDate = styled.p`
  padding: 4px 10px;
  border-radius: 10px;
  background: rgba(152, 25, 195, 0.3);
  color: var(--text-purple);
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -1px;
`;
const DateText = styled.span`
  margin-left: 7px;
  color: var(--main-white);
  font-size: 18px;
  font-weight: 500;
  letter-spacing: -0.9px;
`;
