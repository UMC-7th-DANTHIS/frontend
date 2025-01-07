import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MainLayout from "./layout/MainLayout";
import MainPage from "./pages/MainPage";
import Community from "./pages/Community";
import DummyContent from "./pages/CommunityPost";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="community" element={<Community />} />
          <Route path="community/:path" element={<DummyContent />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
