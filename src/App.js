import React, { useState } from "react";
import { useNavigate } from "react-router";
import Login from "./Components/Pages/Login";
import SignUp from "./Components/Pages/Signup";
import Welcome from "./Components/to-do/Welcome";
import { Route, Routes } from "react-router";
import "./App.css";
import getUserData from "./Components/routeFunctions/getUserData";
import ToDo from "./Components/to-do/ToDo";
// import { Switch } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  function loginHandler(val, id) {
    setIsLoggedIn(val);
    if (val) {
      navigate(`/user/tasks/${id}`);
    }
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login login={loginHandler} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user/tasks/:id" element={<ToDo />} />
      </Routes>
    </>
  );
}

export default App;
