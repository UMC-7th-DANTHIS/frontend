import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import MainLayout from './layout/MainLayout';
import MypageLayout from './pages/mypage/MypageLayout';
import CommunityLayout from './layout/CommunityLayout';
import Community from './pages/CommunityPage';
import CommunityPostPage from './pages/Community/CommunityPostPage';
import CommunityPut from './pages/Community/CommunityPut';
import CommunityEdit from './pages/Community/CommunityEdit';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage1 from './pages/Signup/Signup1';
import SignupPage2 from './pages/Signup/Signup2';
import SignupPage3 from './pages/Signup/Signup3';
import SignupPage4 from './pages/Signup/Signup4';
import ProfileList from './pages/profile/ProfileList';
import DancerProfile from './pages/profile/DancerProfile';
import ReviewDetail from './pages/mypage/components/review/ReviewDetail';
import KakaoRedirectHandler from './pages/KakaoRedirectHandler';
import SearchLayout from './layout/SearchLayout';
import SearchWrapper from './layout/SearchWrapper';
import MyRegisterDetail from './pages/mypage/components/registerclass/MyRegisterDetail';

import DancerRegistrationPage from './pages/registration/DancerRegistrationPage';
import ClassRegistrationPage from './pages/registration/ClassRegistrationPage';
import ClassRegisterEditPage from './pages/registration/ClassRegisterEditPage';
import ClassesPage from './pages/reservation/ClassesPage';
import ReservationPage from './pages/reservation/ReservationPage';
import ReviewDetailPage from './pages/reservation/ReviewDetailPage';

function App(): React.JSX.Element {
  return (
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
          <Route path="/search/:select" element={<SearchLayout />}>
            <Route index element={<SearchWrapper />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/oauth/kakao/callback" element={<KakaoRedirectHandler />} />
          <Route path="/signup1" element={<SignupPage1 />} />
          <Route path="/signup2" element={<SignupPage2 />} />
          <Route path="/signup3" element={<SignupPage3 />} />
          <Route path="/signup4" element={<SignupPage4 />} />

          <Route path="/dancerregister" element={<DancerRegistrationPage />} />
          <Route path="/classregister" element={<ClassRegistrationPage />} />
          <Route path="/classregister/:classId" element={<ClassRegisterEditPage />} />
          <Route path="/classreservation" element={<ClassesPage />} />
          <Route path="/classreservation/:classId" element={<ReservationPage />} />
          <Route path="/classreservation/review/:reviewId" element={<ReviewDetailPage />} />
          <Route path="/dancerprofile" element={<ProfileList />} />
          <Route path="/dancerprofile/:dancerId" element={<DancerProfile />} />
          <Route path="/review/:id" element={<ReviewDetail />} />
          <Route path="/detail/:classId" element={<MyRegisterDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
