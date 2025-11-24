import { useCallback, useState } from 'react';
import styled from 'styled-components';
import useConfirmLeave from '../../../../hooks/useConfirmLeave';
import useValidation from '../../../../hooks/registration/useValidation';
import { DancerFormState } from '../../../../types/registration';
import usePostDancer from '../../../../hooks/registration/usePostDancer';
import { MyNewDancerContext } from './MyNewDancerContext';
import { DancerForm } from './DancerForm';
import { RegisterComplete } from '../form';

const MyNewDancer = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  const TITLE = '댄서 등록';
  const COMPLETE_MESSAGE = '댄서 등록 신청이 완료되었어요!';
  const COMPLETE_DESCRIPTION = '운영진의 검토 이후 댄서로 등록될 수 있어요. \n등록 신청에 감사드려요 :)';

  const [formState, setFormState] = useState<DancerFormState>({
    dancerName: '',
    instargramId: '',
    openChatUrl: '',
    bio: '',
    history: '',
    preferredGenres: [],
    dancerImages: ['', '', '']
  });
  const isValid = useValidation(formState, 'dancer');
  const [showInvalidAlert, setShowInvalidAlert] = useState(false);
  const [showLeaveAlert, setShowLeaveAlert] = useState(false);

  useConfirmLeave({ setAlert: setShowLeaveAlert });

  const { mutate: postDancer } = usePostDancer();

  const handleFormChange = useCallback(<K extends keyof DancerFormState>(key: K, value: DancerFormState[K]) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedFormState = {
      ...formState,
      dancerImages: formState.dancerImages.filter((img) => img) // ''  값 제거
    };

    if (!isValid) {
      setShowInvalidAlert(true);
      return;
    }

    postDancer(updatedFormState, { onSuccess: () => setIsRegistered(true) });
  };

  return (
    <MyNewDancerContext
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
        {!isRegistered ? (
          <DancerForm />
        ) : (
          <RegisterComplete message={COMPLETE_MESSAGE} description={COMPLETE_DESCRIPTION} />
        )}
      </Container>
    </MyNewDancerContext>
  );
};

export default MyNewDancer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 28px 30px 96px 30px;
`;
