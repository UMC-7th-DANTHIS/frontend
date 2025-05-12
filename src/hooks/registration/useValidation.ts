import { useEffect, useState } from 'react';
import {
  DancerFormState,
  ClassFormState
} from '../../types/RegisterFormInterface';

type FormState = DancerFormState | ClassFormState;
type FormType = 'class' | 'dancer';

const useValidation = (formState: FormState, type: FormType): boolean => {
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    let validationRules: Record<string, boolean> = {};

    if (type === 'dancer' && 'dancerName' in formState) {
      validationRules = {
        isDancerNameValid:
          formState.dancerName.trim().length > 0 &&
          formState.dancerName.trim().length <= 20,
        isInstagramIdValid:
          formState.instargramId.trim().length > 0 &&
          formState.instargramId.trim().length <= 20,
        isOpenChatUrlValid:
          formState.openChatUrl.trim().length > 0 &&
          formState.openChatUrl.trim().length <= 255,
        isBioValid: formState.bio.length <= 80,
        isPreferredGenresValid:
          formState.preferredGenres.length > 0 &&
          formState.preferredGenres.length <= 2,
        isHistoryValid: formState.history.length <= 1000,
        isDancerImagesValid:
          formState.dancerImages.filter((img) => img !== null).length <= 3
      };
    } else if (type === 'class' && 'className' in formState) {
      validationRules = {
        isClassNameValid:
          formState.className.trim().length > 0 &&
          formState.className.trim().length <= 20,
        isPricePerSessionValid:
          !isNaN(Number(formState.pricePerSession)) &&
          Number(formState.pricePerSession) >= 0,
        isDifficultyValid: formState.difficulty > -1,
        isGenreValid: formState.genre > 0,
        isDescriptionValid: formState.description.length <= 1000,
        isTargetAudienceValid: formState.targetAudience.length <= 1000,
        isHashtagsValid:
          formState.hashtags.length > 0 && formState.hashtags.length <= 3
      };
    }

    setIsValid(Object.values(validationRules).every(Boolean));
  }, [formState, type]);

  return isValid;
};

export default useValidation;
