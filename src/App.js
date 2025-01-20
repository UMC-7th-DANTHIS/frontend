import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MainLayout from './layout/MainLayout';
import MainPage from './pages/MainPage';
import MypageLayout from './pages/mypage/MypageLayout';
import Community from './pages/Community/Community';
import CommunityPost from './pages/Community/CommunityPost';
import DancerRegistration from './pages/registration/newdancer/DancerRegistration';
import ClassRegistration from './pages/registration/newclass/ClassRegistration';
import CommunityEdit from './pages/Community/CommunityEdit';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SearchPage from './pages/SearchPage';
import ClassBoard from './pages/reservation/ClassBoard';
import ClassReservation from './pages/reservation/ClassReservation';
import SignupPage1 from './pages/Signup/Signup1';
import SignupPage2 from './pages/Signup/Signup2';
import SignupPage3 from './pages/Signup/Signup3';
import SignupPage4 from './pages/Signup/Signup4';
import ProfileList from './pages/profile/ProfileList';
import DancerProfile from './pages/profile/DancerProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/mypage" element={<MypageLayout />} />
          <Route path="community" element={<Community />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup1" element={<SignupPage1 />} />
          <Route path="/signup2" element={<SignupPage2 />} />
          <Route path="/signup3" element={<SignupPage3 />} />
          <Route path="/signup4" element={<SignupPage4 />} />
          <Route path="post" element={<CommunityPost />} />
          <Route path="dancerregister" element={<DancerRegistration />} />
          <Route path="classregister" element={<ClassRegistration />} />
          <Route path="edit" element={<CommunityEdit />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="classreservation" element={<ClassBoard />} />
          <Route
            path="classreservation/:classId"
            element={<ClassReservation />}
          />
          <Route path="/dancerprofile" element={<ProfileList />} />
          <Route path="/dancerprofile/:dancerId" element={<DancerProfile />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
