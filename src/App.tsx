import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import './App.css';

import MainLayout from './layout/MainLayout';
import MypageLayout from './pages/mypage/MypageLayout';
import CommunityLayout from './layout/CommunityLayout';

import { Community } from './pages/Community';
import { CommunityPostPage } from './pages/Community/CommunityPostPage';
import { CommunityPut } from './pages/Community/CommunityPut';
import { CommunityEdit } from './pages/Community/CommunityEdit';

import { HomePage } from './pages/Home';
import LoginPage from './pages/Login/LoginPage';
import SignupPage1 from './pages/Signup/Signup1';
import SignupPage2 from './pages/Signup/Signup2';
import SignupPage3 from './pages/Signup/Signup3';
import SignupPage4 from './pages/Signup/Signup4';
import ProfileList from './pages/DancerProfile/ProfileList';
import DancerProfile from './pages/DancerProfile/DancerProfile';
import ReviewDetail from './pages/mypage/components/review/ReviewDetail';
import KakaoRedirectHandler from './pages/Login/KakaoRedirectHandler';
import SearchLayout from './layout/SearchLayout';
import SearchWrapper from './layout/SearchWrapper';
import MyRegisterDetail from './pages/mypage/components/registerclass/MyRegisterDetail';
import MyEditClass from './pages/mypage/components/registerclass/MyEditClass';
import RegisterClassDetailLayout from './pages/mypage/RegisterClassDetailLayout';
import ClassesPage from './pages/reservation/ClassesPage';
import ReservationPage from './pages/reservation/ReservationPage';
import ReviewDetailPage from './pages/reservation/ReviewDetailPage';
import Practice from './pages/Practice/Practice';
import Battle from './pages/Battle/Battle';
import GlobalStyle from './utils/globalstyle';

/** `/detail/:classId/edit` — URL에서 classId를 넘겨 수정 폼 렌더 */
const RegisterClassEditPage = (): React.JSX.Element | null => {
  const { classId } = useParams<{ classId: string }>();
  if (!classId) return null;
  const id = Number(classId);
  if (Number.isNaN(id)) return null;
  return <MyEditClass classId={id} />;
};

function App(): React.JSX.Element {
  return (
    <>
      {/* 모바일 흰색 여백 삭제 */}
      <GlobalStyle />

      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/mypage" element={<MypageLayout />} />
            <Route path="/community" element={<CommunityLayout />}>
              <Route path="" element={<Community />} />
              <Route path=":id" element={<CommunityPostPage />} />
              <Route path="edit" element={<CommunityEdit />} />
              <Route path="edit/:id" element={<CommunityPut />} />
            </Route>
            <Route path="/search/:select?" element={<SearchLayout />}>
              <Route index element={<SearchWrapper />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/oauth/kakao/callback" element={<KakaoRedirectHandler />} />
            <Route path="/signup1" element={<SignupPage1 />} />
            <Route path="/signup2" element={<SignupPage2 />} />
            <Route path="/signup3" element={<SignupPage3 />} />
            <Route path="/signup4" element={<SignupPage4 />} />
            <Route path="/classes" element={<ClassesPage />} />
            <Route path="/classes/:classId/reviews/:reviewId" element={<ReviewDetailPage />} />
            <Route path="/classes/:classId" element={<ReservationPage />} />
            <Route path="/dancerprofile" element={<ProfileList />} />
            <Route path="/dancerprofile/:dancerId" element={<DancerProfile />} />
            <Route path="/review/:id" element={<ReviewDetail />} />
            <Route path="/detail/:classId" element={<RegisterClassDetailLayout />}>
              <Route index element={<MyRegisterDetail />} />
              <Route path="edit" element={<RegisterClassEditPage />} />
            </Route>
            <Route path="/practice" element={<Practice />} />
            <Route path="/battle" element={<Battle />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
