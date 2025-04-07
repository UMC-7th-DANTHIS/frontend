import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const KakaoRedirectHandler = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');

    if (!code || isProcessing) return;

    setIsProcessing(true);

    const BASE_URL = process.env.REACT_APP_API_BASE_URL;
    if (!BASE_URL) {
      console.error('⛔ 환경변수 누락: REACT_APP_API_BASE_URL');
      navigate('/login');
      return;
    }

    console.log("🚀 REACT_APP_API_BASE_URL:", process.env.REACT_APP_API_BASE_URL);
    console.log("🚀 Kakao auth request:", `${process.env.REACT_APP_API_BASE_URL}/auth/login/kakao?code=${code}`);

    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/auth/login/kakao?code=${code}`, {}, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' }
      })
      .then((response) => {
        console.log('✅ 카카오 로그인 성공:', response.data);
        const accessToken = response.data.data?.accessToken;

        if (!accessToken) {
          console.warn('⚠️ Access Token이 없습니다. 로그인 페이지로 이동합니다.');
          navigate('/login');
          return;
        }

        localStorage.setItem('token', accessToken);

        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/me`, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${accessToken}` },
        });
      })
      .then((userResponse) => {
        if (!userResponse) return; 
        console.log('✅ 사용자 정보:', userResponse.data);
        const email = userResponse.data.data?.email;

        if (!email) {
          console.warn('⚠️ 이메일 정보가 없습니다. 회원가입 페이지로 이동합니다.');
          navigate('/signup1');
          window.location.reload(); // 🔹 회원가입 페이지로 이동 후 새로고침
          return;
        }

        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/check-phone-by-email?email=${encodeURIComponent(email)}`, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
      })
      .then((checkResponse) => {
        if (!checkResponse) return;
        console.log('✅ 회원 여부 확인 응답:', checkResponse.data);

        if (checkResponse.data.data === true) {
          console.log('✅ 회원입니다. 홈으로 이동합니다.');
          navigate('/');
          window.location.reload(); // 🔹 홈으로 이동 후 새로고침
        } else {
          console.log('⚠️ 회원이 아닙니다. 회원가입 페이지로 이동합니다.');
          navigate('/signup1');
          window.location.reload(); // 🔹 회원가입 페이지로 이동 후 새로고침
        }
      })
      .catch((error : unknown) => {
      //   console.error('❌ 로그인 처리 중 오류 발생:', error.response?.status, error.response?.data || error);
      //   navigate('/login');
      if (axios.isAxiosError(error)) {
        console.error('❌ Axios 오류:', error.response?.status, error.response?.data);
      } else {
        console.error('❌ 예기치 못한 오류:', error);
      }
      navigate('/login');
      })
      .finally(() => {
        setIsProcessing(false);
      });
  
  }, [navigate, isProcessing]);

  return <div>로그인 처리 중...</div>;
};

export default KakaoRedirectHandler;
