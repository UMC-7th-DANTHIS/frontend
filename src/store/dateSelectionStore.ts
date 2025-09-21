import { DATE_TYPE, DateType, Day, DAYS_OF_WEEK } from '../types/reservation';
import { create } from 'zustand';

interface DateSelectionState {
  type: DateType;
  day: Day;
  date: Date;
  setType: (type: DateType) => void;
  setDay: (day: Day) => void;
  setDate: (date: Date) => void;
}

export const useDateSelectionStore = create<DateSelectionState>((set) => ({
  type: DATE_TYPE.DAILY,
  day: DAYS_OF_WEEK[0].key,
  date: new Date(),
  setType: (newType) => set({ type: newType }),
  setDay: (newDay) => set({ day: newDay }),
  setDate: (newDate) => set({ date: newDate })
}));
