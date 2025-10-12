import { useEffect, useState } from 'react';

/**
 * 사용자의 로그인 상태를 로컬 스토리지의
 * 'token' 존재 여부로 판단하여 반환합니다.
 */
export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => !!localStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
    };

    // 스토리지 변경 이벤트 감지하여 isLoggedIn 상태 동기화
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return { isLoggedIn };
};
