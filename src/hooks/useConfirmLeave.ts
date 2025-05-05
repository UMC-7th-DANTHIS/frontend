import { useEffect, useCallback } from 'react';

interface UseConfirmLeaveProps {
  setAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

// 뒤로가기 시 팝업 창을 띄우기 위한 훅
const useConfirmLeave = ({ setAlert }: UseConfirmLeaveProps) => {
  //  팝업 창을 띄우는 뒤로 가기 방지 함수 (메모이제이션)
  const preventLeave = useCallback(
    (e: PopStateEvent) => {
      e.preventDefault();
      // 현재 상태(작성 중인 폼)를 세션 히스토리 스택에 push한다.
      window.history.pushState(null, '', window.location.href);
      setAlert(true); // 팝업 창을 띄운다.
    },
    [setAlert]
  );

  useEffect(() => {
    if (typeof setAlert !== 'function') {
      console.error('useConfirmLeave: setAlert is not a function');
      return;
    }

    // 'popstate' 이벤트를 감지하면 preventLeave 함수를 실행한다.
    window.addEventListener('popstate', preventLeave);
    // 현재 상태(작성 중인 폼)를 세션 히스토리 스택에 push한다.
    window.history.pushState(null, '', window.location.href);

    return () => {
      // 렌더링이 끝나면 'popstate'에 대한 이벤트 리스너를 삭제
      window.removeEventListener('popstate', preventLeave);
    };
  }, [preventLeave, setAlert]);

  return null;
};

export default useConfirmLeave;
