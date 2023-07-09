import NavTabs from "./components/NavTabs";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import TaskBoard from "./pages/TaskBoard";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <>
        <NavTabs />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<TaskBoard />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
