import React, { useState } from "react";
import { useNavigate } from "react-router";
import Login from "./Components/Pages/Login";
import SignUp from "./Components/Pages/Signup";
import Welcome from "./Components/to-do/Welcome";
import { Route, Routes } from "react-router";
import "./App.css";
import ToDo from "./Components/to-do/ToDo";

function App() {
  const navigate = useNavigate();
  const [token, settoken] = useState();
  const [isOnSession, setIsOnSession] = useState(false);
  function sessionHandler(val, token) {
    setIsOnSession(val);
    settoken(token);
    if (val) {
      navigate(`/user/${token}`);
    }
  }
  function sessionLogoutHandler() {
    setIsOnSession(false);
    navigate("/");
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Welcome
              onsession={isOnSession}
              t={token}
              session={sessionHandler}
            />
          }
        />
        {/* <Route path="/login" element={<Login session={sessionHandler} />} /> */}
        <Route path="/signup" element={<SignUp session={sessionHandler} />} />
        <Route
          path="/user/:token"
          element={<ToDo logout={sessionLogoutHandler} />}
        />
      </Routes>
    </>
  );
}

export default App;
