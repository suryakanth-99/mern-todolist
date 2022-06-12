import {useState} from 'react';
import Card from '../UI/Card';
import classes from './SignUp.module.css';
const SignUp = () => {
    const [enteredFirstName, SetEnteredFirstName]  = useState('');
    const [enteredLastName, SetEnteredLastName]  = useState('');
    const [enteredEmail, SetEnteredEmail]  = useState('');
    const [enteredPassword, SetEnteredPassword]  = useState('');

    const firstNameChangeHandler = event => {
        SetEnteredFirstName(event.target.value)
    }
    const lastNameChangeHandler = event => {
        SetEnteredLastName(event.target.value)
    }
    const emailChangeHandler = event => {
        SetEnteredEmail(event.target.value)
    }
    const passwordChangeHandler = event => {
        SetEnteredPassword(event.target.value)
    }
    const submitHandler = event => {
        event.preventDefault();
    }
    

    
    return (
        <Card className={classes.main}>
            <h1 className={classes.heading}>SignUp</h1>
        <form onSubmit={submitHandler} className={classes.form}>
            <div className={classes.firstname}>
            <label htmlFor="firstname">FirstName</label><br />
            <input name='firstname' type='text' id={classes.fname} onChange = {firstNameChangeHandler} ></input>
            </div>
            <div className={classes.lastname}>
            <label htmlFor="lastname">LastName</label><br />
            <input name='lastname' type='text' id={classes.lname} onChange = {lastNameChangeHandler}></input>
            </div>
            <div className={classes.email}>
            <label htmlFor="email">Email</label><br />
            <input name='email' type='email' id={classes.email} onChange = {emailChangeHandler}></input>
            </div>
            <div className={classes.password}>
            <label htmlFor="password">Password</label><br />
            <input name='password' type='password' id={classes.password} onChange = {passwordChangeHandler}></input>
            </div>
            <div >
            <button className={classes.btn}>SignUp</button>
            <p>Already Subscribed? <a href="/login">Login</a></p>
            </div>
        </form>
        </Card>
    )
}

export default SignUp;