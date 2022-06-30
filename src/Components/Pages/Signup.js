import { useRef } from "react";
import Card from "../UI/Card";
import classes from "./SignUp.module.css";
const SignUp = (props) => {
  const enteredFirstName = useRef();
  const enteredLastName = useRef();
  const enteredEmail = useRef();
  const enteredPassword = useRef();

  async function postSignupData(signupdata) {
    const response = await fetch("http://localhost:8000/signup", {
      method: "POST",
      body: JSON.stringify(signupdata),
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
      firstname: enteredFirstName.current.value,
      lastname: enteredLastName.current.value,
      email: enteredEmail.current.value,
      password: enteredPassword.current.value,
    };
    postSignupData(data);
  };

  return (
    <Card className={classes.main}>
      <h1 className={classes.heading}>SignUp</h1>
      <form onSubmit={submitHandler} className={classes.form}>
        <div className={classes.firstname}>
          <label htmlFor="firstname">FirstName</label>
          <br />
          <input
            name="firstname"
            type="text"
            id={classes.fname}
            ref={enteredFirstName}
          ></input>
        </div>
        <div className={classes.lastname}>
          <label htmlFor="lastname">LastName</label>
          <br />
          <input
            name="lastname"
            type="text"
            id={classes.lname}
            ref={enteredLastName}
          ></input>
        </div>
        <div className={classes.email}>
          <label htmlFor="email">Email</label>
          <br />
          <input
            name="email"
            type="email"
            id={classes.email}
            ref={enteredEmail}
          ></input>
        </div>
        <div className={classes.password}>
          <label htmlFor="password">Password</label>
          <br />
          <input
            name="password"
            type="password"
            id={classes.password}
            ref={enteredPassword}
          ></input>
        </div>
        <div>
          <button className={classes.btn}>SignUp</button>
          <p>
            Already Subscribed? <a href="/login">Login</a>
          </p>
        </div>
      </form>
    </Card>
  );
};

export default SignUp;
