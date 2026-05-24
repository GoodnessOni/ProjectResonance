import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import TaskA from "../pages/TaskA";
import TaskB from "../pages/TaskB";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import { useAuth } from "../context/AuthContext";

function App() {
  const { user } = useAuth();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/task-a" element={user ? <TaskA /> : <Login />} />
        <Route path="/task-b" element={user ? <TaskB /> : <Login />} />
      </Routes>
    </Router>
  );
}

export default App;
