import styled from 'styled-components';
import { DateTypeToggle } from './DateTypeToggle';
import { DATE_TYPE, DAYS_OF_WEEK } from '../../types/reservation';
import CustomCalendar from '../../components/Calendar';
import { WeeklySelector } from './WeeklySelector';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useDateSelectionStore } from '../../store/dateSelectionStore';

export const SelectionPanel = () => {
  const selectedType = useDateSelectionStore((store) => store.type);
  const selectedDayKey = useDateSelectionStore((store) => store.day);
  const selectedDate = useDateSelectionStore((store) => store.date);
  const setSelectedDate = useDateSelectionStore((store) => store.setDate);

  const selectedDayName = DAYS_OF_WEEK.find((day) => day.key === selectedDayKey)?.ko;
  const formattedDate = format(selectedDate, 'yyyy. MM. dd (E)', {
    locale: ko
  });

  return (
    <PanelContainer>
      <PanelHeader>
        <DateTypeToggle />
        <SelectedDate>
          선택:
          <DateText>{selectedType === DATE_TYPE.DAILY ? formattedDate : selectedDayName}</DateText>
        </SelectedDate>
      </PanelHeader>

      {selectedType === DATE_TYPE.DAILY && <CustomCalendar selectedDate={selectedDate} onDateClick={setSelectedDate} />}
      {selectedType === DATE_TYPE.WEEKLY && <WeeklySelector />}
    </PanelContainer>
  );
};

const PanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  gap: 30px;
`;
const PanelHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  white-space: preserve nowrap;
`;
const SelectedDate = styled.p`
  display: flex;
  align-items: baseline;
  margin: 0;
  padding: 4px 10px;
  border-radius: 10px;
  background: rgba(152, 25, 195, 0.3);
  color: var(--text-purple);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.8px;

  ${({ theme }) => theme.media.tablet} {
    font-size: 20px;
    letter-spacing: -1px;
  }
`;
const DateText = styled.span`
  margin-left: 7px;
  color: var(--main-white);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.6px;

  ${({ theme }) => theme.media.tablet} {
    font-size: 18px;
    letter-spacing: -0.9px;
  }
`;
