import axios from "axios";

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: "https://api.danthis.site",
  withCredentials: true, //쿠키 포함 (RefreshToken 서버에서 관리)
  headers: { "Content-Type": "application/json" },
});

//요청 인터셉터 설정 (모든 요청에 Access Token 추가)
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

//응답 인터셉터 설정 (401 오류 발생 시 토큰 갱신)
api.interceptors.response.use(
  (response) => response, // 정상 응답은 그대로 반환
  async (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.warn("Access Token 만료됨, 새 토큰 요청 중...");

      try {
        //새로운 토큰 요청
        const refreshResponse = await axios.get("https://api.danthis.site/auth/reissue", {
          withCredentials: true, // 🔹 리프레시 토큰은 쿠키에서 관리
        });

        const newAccessToken = refreshResponse.data.accessToken;
        console.log(" 새 Access Token 발급:", newAccessToken);

        //새 토큰을 localStorage에 저장
        localStorage.setItem("token", newAccessToken);

        //원래 요청을 새로운 토큰으로 다시 실행
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(error.config);
      } catch (reissueError) {
        console.error(" 리프레시 토큰 만료됨, 재로그인 필요");
        localStorage.removeItem("token"); // 🔹 토큰 삭제
        window.location.href = "/"; // 🔹 로그인 페이지로 이동
      }
    }

    return Promise.reject(error);
  }
);

export default api; // 🔹 다른 파일에서 사용할 수 있도록 내보내기
