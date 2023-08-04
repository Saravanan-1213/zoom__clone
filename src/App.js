import Home from "./Home";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Meet from "./Meet";
import Login from "./login";
import Signup from "./signup";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/user" element={<Home />}></Route>
          <Route path="/:name/:room" element={<Meet />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
