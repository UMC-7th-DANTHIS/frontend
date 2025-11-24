import { DancerFormState } from '@/types/registration';
import { createContext } from 'react';

interface MyNewDancerContextType {
  title: string;
  formState: DancerFormState;
  handleFormChange: <K extends keyof DancerFormState>(key: K, value: DancerFormState[K]) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  showInvalidAlert: boolean;
  setShowInvalidAlert: React.Dispatch<React.SetStateAction<boolean>>;
  showLeaveAlert: boolean;
  setShowLeaveAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MyNewDancerContext = createContext<MyNewDancerContextType | null>(null);
