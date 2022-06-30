import { Link } from "react-router-dom";
import classes from "./welcome.module.css";
const Welcome = (props) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid ">
          <div>
            <Link to="/" className="navbar-brand" href="#">
              TODO
            </Link>
          </div>
          {props.session && (
            <div>
              <Link to={`/user/${props.t}`} className="navbar-brand" href="#">
                TODO
              </Link>
            </div>
          )}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {props.session && (
            <div
              className="collapse navbar-collapse grid"
              style={{ justifyContent: "flex-end" }}
              id="navbarSupportedContent"
            >
              <div className="row">
                <div className="col-sm-12 text-center">
                  <Link to="/signup">
                    <button
                      className="btn btn-outline-success center-block"
                      type="submit"
                    >
                      SignUp
                    </button>
                  </Link>

                  <Link to="/login">
                    <button
                      className="btn btn-outline-success center-block"
                      type="submit"
                    >
                      Login
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
      <body>
        <p>welcome to todo</p>
      </body>
      <div className={classes.footerPadding}>
        <div className={classes.footer}>
          <p>© 2021 Copyright: Suryakanth</p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
