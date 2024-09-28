import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import Home from "./pages/home";
import CreatePost from "./pages/createpost";
import Post from "./pages/post";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [authState, setAuthState] = useState({
    Username: "",
    id: 0,
    status: false,
  }); // initialize authState based on localStorage

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      axios
        .get("http://localhost:3001/auth/auth", {
          headers: { accessToken: token },
        })
        .then((response) => {
          if (response.data.error) {
            setAuthState({ ...authState, status: false });
          } else {
            setAuthState({
              Username: response.data.Username,
              id: response.data.id,
              status: true,
            });
          }
        });
    }
  }, []); // render once when you open page

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ Username: "", id: 0, status: false });
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <nav>
            <NavLink to="/" activeClassName="active">
              Home Page
            </NavLink>
            <NavLink to="/createpost" activeClassName="active">
              Create a Post
            </NavLink>
            {!authState.status ? ( // if there is no accessToken in the session storage, show the login and register links
              <>
                <NavLink to="/login" activeClassName="active">
                  Login
                </NavLink>
                <NavLink to="/register" activeClassName="active">
                  Register
                </NavLink>
              </>
            ) : (
              <button onClick={logout}>Logout</button>
            )}
            <span>{authState.Username}</span>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
