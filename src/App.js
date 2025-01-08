import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MainLayout from "./layout/MainLayout";
import MainPage from "./pages/MainPage";
import Community from "./pages/Community";
import DancerRegistration from "./pages/add-new-dancer/DancerRegistration"; // +

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="community" element={<Community />} />
          <Route path="dancer-registration" element={<DancerRegistration />} /> {/* + */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
