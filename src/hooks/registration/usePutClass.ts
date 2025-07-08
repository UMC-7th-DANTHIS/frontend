import { editClass } from '../../api/registration';
import { ClassFormSubmitState } from '../../types/registration';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

interface PutClassArgs {
  classId: string;
  body: ClassFormSubmitState;
}

export default function usePutClass() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ classId, body }: PutClassArgs) => editClass(classId, body),
    onSuccess: (data) => {
      if (data) navigate(`/mypage?menu=registeredclasses`);
    },
    onError: (error) => {
      console.error('❌ 수업 수정 실패:', error);
    }
  });
}
