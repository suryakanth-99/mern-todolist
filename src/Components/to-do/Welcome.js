import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { v4 as uuidv4 } from "uuid";
import Card from "../UI/Card";
async function getData() {
  const res = await fetch("http://localhost:8000/players");
  const data = await res.json();
  console.log(data.data);
}
const Welcome = () => {
  return (
    <div>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/signup">
        <button>SignUp</button>
      </Link>
      <button onClick={getData}>get</button>
    </div>
  );
};

export default Welcome;
