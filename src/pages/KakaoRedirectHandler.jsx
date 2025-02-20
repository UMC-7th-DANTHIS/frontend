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

    //axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/login/kakao?code=${code}`, {}, { withCredentials: true }) // ✅ 쿼리 스트링 방식 유지
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
      console.log('✅ 사용자 정보:', userResponse.data);
      const email = userResponse.data.data?.email;
  
      if (!email) {
        console.warn('⚠️ 이메일 정보가 없습니다. 회원가입 페이지로 이동합니다.');
        navigate('/signup1');
        return;
      }
  
      return axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/check-phone-by-email?email=${encodeURIComponent(email)}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
    })
    .then((checkResponse) => {
      console.log('✅ 회원 여부 확인 응답:', checkResponse.data);
  
      if (checkResponse.data.data === true) {
        console.log('✅ 회원입니다. 홈으로 이동합니다.');
        navigate('/');
      } else {
        console.log('⚠️ 회원이 아닙니다. 회원가입 페이지로 이동합니다.');
        navigate('/signup1');
      }
    })
    .catch((error) => {
      console.error('❌ 로그인 처리 중 오류 발생:', error.response?.status, error.response?.data || error);
      navigate('/login');
    })
    .finally(() => {
      setIsProcessing(false);
    });
  }, [navigate, isProcessing]);

  return <div>로그인 처리 중...</div>;
};

export default KakaoRedirectHandler;