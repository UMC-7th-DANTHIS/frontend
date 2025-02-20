import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../api/api';

const KakaoRedirectHandler = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false); // 🔹 중복 요청 방지
  const env = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code'); // 🔹 인가 코드 추출
    
    if (!code || isProcessing) return;

    setIsProcessing(true);
    console.log(env);

    //axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/login/kakao?code=${code}`, {}, { withCredentials: true }) // ✅ 쿼리 스트링 방식 유지
    console.log("🚀 REACT_APP_API_BASE_URL:", process.env.REACT_APP_API_BASE_URL);
    console.log("🚀 Kakao auth request:", `${process.env.REACT_APP_API_BASE_URL}/auth/login/kakao?code=${code}`);
    
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/auth/login/kakao?code=${code}`,
        {},
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' } // 🔥 `Authorization`을 추가하지 않음!
        }
      )
      .then((response) => {
        console.log('카카오 로그인 응답:', response.data); // 🔹 전체 응답 확인

        const accessToken = response.data.data?.accessToken; // Access Token 추출
        if (accessToken) {
          console.log('Access Token:', accessToken); // 🔹 accessToken 확인
          localStorage.setItem('token', accessToken);
          // Step 2: 사용자 정보 조회 (users/me)
          axios
            .get(`${process.env.REACT_APP_API_BASE_URL}/users/me`, {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${accessToken}` // 인증 헤더 추가
              }
            })
            .then((userResponse) => {
              console.log('사용자 정보:', userResponse.data);

              const email = userResponse.data.data?.email; // 이메일 추출
              if (email) {
                console.log('사용자 이메일:', email);

                // Step 3: 이메일로 회원 여부 확인
                axios
                  .get(
                    `${process.env.REACT_APP_API_BASE_URL}/users/check-email?email=${encodeURIComponent(
                      email
                    )}`,
                    {
                      withCredentials: true,
                      headers: {
                        Authorization: `Bearer ${accessToken}`
                      }
                    }
                  )
                  .then((checkResponse) => {
                    console.log('회원 여부 확인 응답:', checkResponse.data);

                    if (checkResponse.data.data === true) {
                      console.log('회원입니다. 홈으로 이동합니다.');
                      navigate('/');
                    } else {
                      console.log(
                        '회원이 아닙니다. 회원가입 페이지로 이동합니다.'
                      );
                      navigate('/signup1');
                    }
                  })
                  .catch((error) => {
                    console.error(
                      '회원 여부 확인 중 오류 발생:',
                      error.response?.data || error
                    );
                    navigate('/login'); // 실패 시 로그인 페이지로 이동
                  });
              } else {
                console.warn(
                  '사용자 이메일이 없습니다. 회원가입 페이지로 이동합니다.'
                );
                navigate('/signup1'); // 이메일 없으면 회원가입 페이지로 이동
              }
            })
            .catch((error) => {
              console.error(
                '사용자 정보 조회 실패:',
                error.response?.data || error
              );
              navigate('/login'); // 사용자 정보 조회 실패 시 로그인 페이지로 이동
            });
        } else {
          console.warn('Access Token이 응답에 없습니다.');
          navigate('/login'); // 토큰이 없으면 회원가입 페이지로 이동
        }
      })
      .catch((error) => {
        console.error('카카오 로그인 실패:', error.response?.data || error);
        navigate('/login'); // 로그인 실패 시 로그인 페이지로 이동
      })
      .finally(() => {
        setIsProcessing(false); // 처리 완료
      });
  }, [navigate, isProcessing]);

  return <div>로그인 처리 중...</div>;
};

export default KakaoRedirectHandler;
