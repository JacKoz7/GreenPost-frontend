import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link, NavLink } from "react-router-dom";
import Home from "./pages/home";
import CreatePost from "./pages/createpost";

function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <NavLink to="/" activeClassName="active"> Home Page </NavLink>
          <NavLink to="/createpost" activeClassName="active"> Create a Post </NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createpost" element={<CreatePost />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;