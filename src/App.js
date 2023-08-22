import Home from "./Home";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Meet from "./Meet";
import { Auth } from "./login";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/user" element={<Home />} />
          <Route path="/:name/:room" element={<Meet />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
