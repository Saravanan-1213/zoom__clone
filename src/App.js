import Home from "./Home";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Meet from "./Meet";
import Signup from "./Signup";
import Login from "./Login";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/:name/:room" element={<Meet />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
