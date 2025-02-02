import axios from "axios";

// 🔹 Axios 인스턴스 생성
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// 🔹 토큰 관리 함수
const getAccessToken = () => localStorage.getItem("token");
const setAccessToken = (token) => localStorage.setItem("token", token);
const removeAccessToken = () => localStorage.removeItem("token");

// 🔹 요청 인터셉터: 항상 최신 Access Token 사용
api.interceptors.request.use(
  async (config) => {
    const latestAccessToken = await new Promise((resolve) =>
      setTimeout(() => resolve(getAccessToken()), 50) //  50ms 후 최신 토큰 반영
    );

    if (latestAccessToken) {
      config.headers.Authorization = `Bearer ${latestAccessToken}`;
    }

    console.log("🔹 API 요청 직전 최신 Access Token:", config.headers.Authorization);
    
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔹 토큰 갱신 상태 변수
let isRefreshing = false;
let refreshSubscribers = [];

// 🔹 토큰 갱신 함수
const refreshToken = async () => {
  try {
    console.log("🔄 Access Token 만료됨, 새 토큰 요청 중...");
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/auth/reissue`, {
      withCredentials: true,
    });

    const newAccessToken = response.data?.accessToken || response.data?.data?.accessToken;

    if (!newAccessToken) throw new Error("❌ 새 Access Token을 받지 못함");

    console.log("✅ 새 Access Token 발급:", newAccessToken);
    

    // 🔹 최신 토큰 저장 후 모든 요청에서 사용 보장
    setAccessToken(newAccessToken);
    api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`; // 즉시 반영

    // 🔹 대기 중이던 요청들 최신 토큰으로 실행
    refreshSubscribers.forEach((callback) => callback(newAccessToken));
    refreshSubscribers = [];

    return newAccessToken;
  } catch (error) {
    console.error("❌ 리프레시 토큰 만료됨 → 재로그인 필요");
    removeAccessToken();
    window.location.href = "/login";
    throw error;
  } finally {
    isRefreshing = false;
  }
};

// 🔹 응답 인터셉터: 401 발생 시 자동 토큰 갱신 처리
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshSubscribers.push((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(api(originalRequest)); //  최신 토큰으로 기존 요청 재시도
          });
        });
      }

      isRefreshing = true;

      try {
        const newToken = await refreshToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`; //  최신 토큰 적용
        return api(originalRequest); // 기존 요청 다시 실행
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
