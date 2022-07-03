import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { setAlert } from "../actions/alert";
import { signup } from "../actions/auth";
import PropTypes from "prop-types";
function SignUp({ setAlert, signup, isAuthenticated }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) setAlert("Passwords do not match", "error");
    else signup({ name, email, password, password2 });
  };
  if (isAuthenticated) return <Navigate to="/" />;
  return (
    <div className="auth">
      <Helmet>
        <title>Real Estate -Sign Up</title>
        <meta name="description" content="signup page" />
      </Helmet>
      <h1 className="auth__title">Sign Up</h1>
      <p className="auth__lead">Create your Account</p>
      <form className="auth__form" onSubmit={(e) => onSubmit(e)}>
        <div className="auth__form__group">
          <input
            className="auth__form__input"
            type="text"
            placeholder="name"
            name="name"
            value={name}
            onChange={e => onChange(e)}
            required
          ></input>
        </div>
        <div className="auth__form__group">
          <input
            className="auth__form__input"
            type="email"
            placeholder="email"
            name="email"
            value={email}
            onChange={e => onChange(e)}
            required
          ></input>
        </div>
        <div className="auth__form__group">
          <input
            className="auth__form__input"
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e => onChange(e)}
            minLength="6"
          />
        </div>
        <div className="aut__form__group">
          <input
            className="auth__form__input"
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={e=> onChange(e)}
            minLength="6"
          />
        </div>
        <button className="auth__form__button">Register</button>
      </form>
      <p className="auth__authtext">
        Already have an account?
        <Link className="auth__authtext__link" to="/login">
          Sign In
        </Link>
      </p>
    </div>
  );
}
SignUp.propTypes = {
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { setAlert, signup })(SignUp);
