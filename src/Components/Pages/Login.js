// import React from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import classes from "./Login.module.css";
import Card from "../UI/Card";
const Login = (props) => {
  const enteredUserId = useRef();
  const passwordRef = useRef();

  async function postLoginData(e) {
    const response = await fetch("http://localhost:8000/login", {
      method: "POST",
      body: JSON.stringify(e),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const h = await response.json();
    if (h && h.token) {
      props.session(true, h.token);
    }
  }
  const submitHandler = (event) => {
    event.preventDefault();
    const data = {
      email: enteredUserId.current.value,
      password: passwordRef.current.value,
    };

    postLoginData(data);
  };
  return (
    <div>
      <div>
        <nav className="navbar navbar-expand-lg bg-light">
          <div className="container-fluid ">
            <div>
              <Link to="/" className="navbar-brand" href="#">
                TODO
              </Link>
            </div>

            <div className="row">
              <div className="col-sm-12 text-center">
                <button
                  className="btn btn-outline-success center-block"
                  type="submit"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>

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
    </div>
  );
};

export default Login;
