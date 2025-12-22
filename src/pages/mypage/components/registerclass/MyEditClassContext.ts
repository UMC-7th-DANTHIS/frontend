import { createContext } from 'react';
import { ClassFormState } from '@/types/registration';

interface MyEditClassContextType {
  title: string;
  formState: ClassFormState;
  handleFormChange: <K extends keyof ClassFormState>(key: K, value: ClassFormState[K]) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  showInvalidAlert: boolean;
  setShowInvalidAlert: React.Dispatch<React.SetStateAction<boolean>>;
  showLeaveAlert: boolean;
  setShowLeaveAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MyEditClassContext = createContext<MyEditClassContextType | null>(null);
