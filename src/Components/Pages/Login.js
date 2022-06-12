// import React from "react";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import classes from "./Login.module.css";
import Card from "../UI/Card";
const Login = () => {
  const enteredUserId = useRef();
  const passwordRef = useRef();

  async function postdata(e) {
    const response = await fetch("http://localhost:8000/login", {
      method: "POST",
      // mode: "cors",
      body: JSON.stringify(e),
      headers: {
        "Content-Type": "application/json",
      },
      // referrerPolicy: "no-referrer",
    });
    const h = await response.json();
    console.log(h);
  }
  const submitHandler = (event) => {
    event.preventDefault();
    const data = {
      email: enteredUserId.current.value,
      password: passwordRef.current.value,
    };
    console.log(data);
    console.log(JSON.stringify(data));
    postdata(data);
  };
  return (
    <Card className={classes.main}>
      <h1 className={classes.heading}>Login</h1>
      <form onSubmit={submitHandler} className={classes.form}>
        <div className={classes.username}>
          <label htmlFor="username">UserName</label>
          <br />
          <input
            type="text"
            name="username"
            id={classes.username}
            ref={enteredUserId}
          ></input>
        </div>
        <div className={classes.password}>
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            name="password"
            id={classes.password}
            ref={passwordRef}
          ></input>
        </div>
        <div>
          <button className={classes.btn}>Login</button>
          <p>
            Not Subscribed? <Link to="/Signup">Subscribe Now</Link>
          </p>
        </div>
      </form>
    </Card>
  );
};

export default Login;
