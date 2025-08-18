import styled from 'styled-components';
import { ReactComponent as Weekly } from '../../assets/reservation/Weekly.svg';
import { ReactComponent as Calendar } from '../../assets/reservation/Calendar.svg';
import { DATE_TYPE, DateType } from '../../types/reservation';

interface DateTypeToggleProps {
  selectedType: DateType;
  setSelectType: (type: DateType) => void;
}

export const DateTypeToggle = ({ selectedType, setSelectType }: DateTypeToggleProps) => {
  return (
    <ToggleWrapper>
      <ToggleButton $isActive={selectedType === DATE_TYPE.WEEKLY} onClick={() => setSelectType(DATE_TYPE.WEEKLY)}>
        <Weekly />
        요일
      </ToggleButton>
      <ToggleButton $isActive={selectedType === DATE_TYPE.DATE} onClick={() => setSelectType(DATE_TYPE.DATE)}>
        <Calendar />
        날짜
      </ToggleButton>
    </ToggleWrapper>
  );
};

const ToggleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 4px;
  gap: 5px;
  border: 2px solid var(--main-purple);
  border-radius: 999px;
`;
const ToggleButton = styled.button<{ $isActive: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${({ $isActive }) => ($isActive ? '6px 8px' : '4px 8px')};
  gap: 8px;
  border: none;
  border-radius: 999px;
  background-color: ${({ $isActive }) => ($isActive ? 'var(--main-purple)' : 'transparent')};
  transition: all 0.2s ease-in;
  cursor: pointer;

  color: ${({ $isActive }) => ($isActive ? 'var(--main-white)' : 'var(--text-gray)')};
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.7px;

  svg {
    width: 24px;
    height: 24px;
    fill: ${({ $isActive }) => ($isActive ? 'var(--main-white)' : 'var(--text-gray)')};
    transition: fill 0.2s ease-in-out;
    margin-top: 2px;
  }

  ${({ theme }) => theme.media.tablet} {
    font-size: 18px;
    letter-spacing: -1px;
  }
`;
