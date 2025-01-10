import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MainLayout from "./layout/MainLayout";
import MainPage from "./pages/MainPage";
import MypageLayout from "./pages/mypage/MypageLayout";
import Community from "./pages/Community";
import DummyContent from "./pages/CommunityPost";
import DancerRegistration from "./pages/add-new-dancer/DancerRegistration"; // +
import ClassRegistration from "./pages/registration/newclass/ClassRegistration";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/mypage" element={<MypageLayout />} />
          <Route path="community" element={<Community />} />
          <Route path="post" element={<DummyContent />} />
          <Route path="dancerregister" element={<DancerRegistration />} />
          <Route path="classregister" element={<ClassRegistration />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
