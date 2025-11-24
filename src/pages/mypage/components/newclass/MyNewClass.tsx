import { useCallback, useState } from 'react';
import styled from 'styled-components';

import { RegisterComplete } from '../form';
import { ClassFormState } from '@/types/registration';
import useValidation from '../../../../hooks/registration/useValidation';
import { ClassForm } from './ClassForm';
import { MyNewClassContext } from './MyNewClassContext';
import usePostClass from '../../../../hooks/registration/usePostClass';
import useConfirmLeave from '../../../../hooks/useConfirmLeave';

const MyNewClass = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  const TITLE = '댄스 수업 등록';
  const COMPLETE_MESSAGE = '댄스 수업 등록 신청이 완료되었어요!';
  const COMPLETE_DESCRIPTION =
    '운영진의 검토 이후, \n정식 댄스 수업으로 등록될 수 있어요. \n등록 신청에 감사드려요 :)';

  const [formState, setFormState] = useState<ClassFormState>({
    className: '',
    pricePerSession: '',
    difficulty: 0,
    genre: 0,
    days: [],
    dates: [],
    description: '',
    targetAudience: '',
    hashtags: [],
    images: ['', '', ''],
    videoUrl: ''
  });
  const isValid = useValidation(formState, 'class');
  const [showInvalidAlert, setShowInvalidAlert] = useState(false);
  const [showLeaveAlert, setShowLeaveAlert] = useState(false);

  useConfirmLeave({ setAlert: setShowLeaveAlert });

  const { mutate: postClass } = usePostClass();

  const handleFormChange = useCallback(
    <K extends keyof ClassFormState>(key: K, value: ClassFormState[K]) => {
      setFormState((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedFormState = {
      ...formState,
      pricePerSession: Number(formState.pricePerSession) || 0, // 빈 값이면 0 처리
      images: formState.images.filter((img) => img) // ''  값 제거
    };

    if (!isValid) {
      setShowInvalidAlert(true);
      return;
    }

    postClass(updatedFormState, { onSuccess: () => setIsRegistered(true) });
  };

  return (
    <MyNewClassContext
      value={{
        title: TITLE,
        formState,
        handleFormChange,
        handleSubmit,
        showInvalidAlert,
        setShowInvalidAlert,
        showLeaveAlert,
        setShowLeaveAlert
      }}
    >
      <Container>
        <ClassForm />
        {!isRegistered ? (
          <div />
        ) : (
          <RegisterComplete
            message={COMPLETE_MESSAGE}
            description={COMPLETE_DESCRIPTION}
          />
        )}
      </Container>
    </MyNewClassContext>
  );
};

export default MyNewClass;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 28px 30px 96px 30px;
`;
