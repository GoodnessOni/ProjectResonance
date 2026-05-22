import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import TaskA from "../pages/TaskA";
import TaskB from "../pages/TaskB";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task-a" element={<TaskA />} />
        <Route path="/task-b" element={<TaskB />} />
      </Routes>
    </Router>
  );
}

export default App;
