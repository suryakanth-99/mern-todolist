import "./App.css";
import Login from "./Components/Pages/Login";
import SignUp from "./Components/Pages/Signup";
import Welcome from "./Components/to-do/Welcome";
import { Route, Routes } from "react-router";
// import { Switch } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
