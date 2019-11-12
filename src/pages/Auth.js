import React, { useState, useContext, useRef, useEffect } from "react";

import "./Auth.css";
import logo from "../assets/icons/puzzle.svg";
import useHttp from "../hooks/useHttp";

import { AuthContext } from "../context/AuthContext";

const Auth = () => {
  const [singin, setSingin] = useState(true);
  const [loginError, setLoginError] = useState(false);

  const loginEl = useRef(null);
  const passwordEl = useRef(null);
  const emailEl = useRef(null);

  const auth = useContext(AuthContext);

  const [sendSingIn, loading, resData] = useHttp();

  useEffect(() => {
    console.log("logging in");
    if (loading === false) {
      if (resData !== undefined) {
        console.log("resData:", resData.data);
        auth.singIn(resData.data.token, resData.data.login, resData.data._id);
      } else {
        setLoginError(true);
      }
    }
    // eslint-disable-next-line
  }, [loading]);

  const loginHandler = e => {
    e.preventDefault();
    if (singin) {
      const login = loginEl.current.value.toLowerCase();
      const password = passwordEl.current.value;
      if (login.lenght < 4 && password.lenght < 4) {
        return;
      }
      sendSingIn("/users/singin", {
        login,
        password
      });
    }
  };

  return (
    <form onSubmit={loginHandler} className="auth">
      <img src={logo} alt="" />
      <h2>Quiz App</h2>
      <input
        type="text"
        name="login"
        id="login"
        placeholder="Login"
        ref={loginEl}
        style={loginError ? { border: "0.25rem solid #f00" } : {}}
      />
      {!singin && (
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          ref={emailEl}
          style={loginError ? { border: "0.25rem solid #f00" } : {}}
        />
      )}
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        ref={passwordEl}
        style={loginError ? { border: "0.25rem solid #f00" } : {}}
      />
      <button type="submit" name="submit" id="submit">
        {singin ? "Sing in" : "Sing up"}
      </button>
      {singin && (
        <div>
          Don't have an account?
          <button
            onClick={() => {
              setSingin(false);
            }}
          >
            Sing up
          </button>
        </div>
      )}
      {!singin && (
        <div>
          Have an account?
          <button
            onClick={() => {
              setSingin(true);
            }}
          >
            Sing in
          </button>
        </div>
      )}
    </form>
  );
};

export default Auth;
