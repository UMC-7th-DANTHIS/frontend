import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import api from '../../../../api/api';

import { ClassFormState } from '@/types/registration';
import useValidation from '../../../../hooks/registration/useValidation';
import useConfirmLeave from '../../../../hooks/useConfirmLeave';
import { MyEditClassContext } from './MyEditClassContext';
import { ClassEditForm } from './ClassEditForm';
import usePutClass from '../../../../hooks/registration/usePutClass';
import useGetClassDetailById from '../../../../hooks/reservation/useGetClassDetailById';
import { buildClassImagesWithDancerFallback, normalizeClassImageSlots } from '../../../../utils/classImages';

interface MyEditClassProps {
  classId: number;
}

const MyEditClass = ({ classId }: MyEditClassProps) => {
  const TITLE = '댄스 수업 등록';

  const [formState, setFormState] = useState<ClassFormState>({
    className: '',
    pricePerSession: 0,
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
  const [isVideoValid, setIsVideoValid] = useState(true);

  const { data } = useGetClassDetailById(String(classId));

  const { data: dancerData } = useQuery({
    queryKey: ['myDancer'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      const response = await api.get('/dancers', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.data;
    }
  });

  useEffect(() => {
    if (data)
      setFormState({
        className: data.className || '',
        pricePerSession: 0,
        difficulty: data.difficulty || 0,
        genre: data.genre || 0,
        days: data.days || [],
        dates: data.dates || [],
        description: data.details.description || '',
        targetAudience: data.details.targetAudience || 's',
        hashtags: data.details.hashtags || [],
        images: normalizeClassImageSlots(data.details.danceClassImages),
        videoUrl: data.details.videoUrl || ''
      });
  }, [data]);

  useConfirmLeave({ setAlert: setShowLeaveAlert });

  const { mutate: editClass } = usePutClass();

  const handleFormChange = useCallback(<K extends keyof ClassFormState>(key: K, value: ClassFormState[K]) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedFormState = {
      ...formState,
      pricePerSession: Number(formState.pricePerSession) || 0,
      images: buildClassImagesWithDancerFallback(formState.images, dancerData)
    };

    if (!isValid || !isVideoValid) {
      setShowInvalidAlert(true);
      return;
    }

    editClass({ classId: String(classId), body: updatedFormState });
  };

  return (
    <MyEditClassContext
      value={{
        title: TITLE,
        formState,
        handleFormChange,
        handleSubmit,
        showInvalidAlert,
        setShowInvalidAlert,
        showLeaveAlert,
        setShowLeaveAlert,
        setVideoValid: setIsVideoValid
      }}
    >
      <Container>
        <ClassEditForm />
      </Container>
    </MyEditClassContext>
  );
};

export default MyEditClass;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 28px 30px 96px 30px;
`;
