import styled from 'styled-components';
import { ReactComponent as Weekly } from '../../assets/reservation/Weekly.svg';
import { ReactComponent as Calendar } from '../../assets/reservation/Calendar.svg';
import { DATE_TYPE } from '../../types/reservation';
import { useDateSelectionStore } from '../../store/dateSelectionStore';

export const DateTypeToggle = () => {
  const selectedType = useDateSelectionStore((store) => store.type);
  const setSelectedType = useDateSelectionStore((store) => store.setType);

  return (
    <ToggleWrapper>
      <ToggleButton $isActive={selectedType === DATE_TYPE.DAILY} onClick={() => setSelectedType(DATE_TYPE.DAILY)}>
        <Calendar />
        날짜
      </ToggleButton>
      <ToggleButton $isActive={selectedType === DATE_TYPE.WEEKLY} onClick={() => setSelectedType(DATE_TYPE.WEEKLY)}>
        <Weekly />
        요일
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
  gap: 4px;
  border: none;
  border-radius: 999px;
  background-color: ${({ $isActive }) => ($isActive ? 'var(--main-purple)' : 'transparent')};
  transition: all 0.2s ease-in;
  cursor: pointer;

  color: ${({ $isActive }) => ($isActive ? 'var(--main-white)' : 'var(--text-gray)')};
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.7px;
  line-height: 0.9;

  svg {
    width: 24px;
    height: 24px;
    fill: ${({ $isActive }) => ($isActive ? 'var(--main-white)' : 'var(--text-gray)')};
    transition: fill 0.2s ease-in-out;
  }

  ${({ theme }) => theme.media.tablet} {
    font-size: 18px;
    letter-spacing: -1px;
  }
`;
