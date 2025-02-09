import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../api/api';

const KakaoRedirectHandler = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false); // 🔹 중복 요청 방지

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code'); // 🔹 인가 코드 추출
    if (!code || isProcessing) return;

    setIsProcessing(true);

    // axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/login/kakao?code=${code}`, {}, { withCredentials: true }) // ✅ 쿼리 스트링 방식 유지

    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URI}/auth/login/kakao?code=${code}`,
        {},
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' } // 🔥 `Authorization`을 추가하지 않음!
        }
      )
      .then((response) => {
        console.log('카카오 로그인 응답:', response.data); // 🔹 전체 응답 확인

        if (response.data.data.accessToken) {
          console.log('Access Token:', response.data.data.accessToken); // 🔹 accessToken 확인
          localStorage.setItem('token', response.data.data.accessToken);
        } else {
          console.warn('Access Token이 응답에 없음', response.data);
        }
        navigate('/signup1');
      })
      .catch((error) => {
        console.error('로그인 실패', error.response?.data || error);
        navigate('/login');
      });
  }, [navigate, isProcessing]);
  return <div>로그인 처리 중...</div>;
};

export default KakaoRedirectHandler;
