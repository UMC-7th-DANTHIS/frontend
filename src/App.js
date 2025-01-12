import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MainLayout from "./layout/MainLayout";
import MainPage from "./pages/MainPage";
import MypageLayout from "./pages/mypage/MypageLayout";
import Community from "./pages/Community";
import DancerRegistration from "./pages/add-new-dancer/DancerRegistration"; // +
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage";
import SignupPage1 from "./pages/Signup1"
import SignupPage2 from "./pages/Signup2"
import SignupPage3 from "./pages/Signup3"
import SignupPage4 from "./pages/Signup4"



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/mypage" element={<MypageLayout />} />
          <Route path="community" element={<Community />} />
          <Route path="dancer-registration" element={<DancerRegistration />} /> {/* + */}
          <Route path="/login" element={<LoginPage />} /> 
          <Route path="/signup1" element={<SignupPage1 />} /> 
          <Route path="/signup2" element={<SignupPage2 />} /> 
          <Route path="/signup3" element={<SignupPage3 />} /> 
          <Route path="/signup4" element={<SignupPage4 />} /> 

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
