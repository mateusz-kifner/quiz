import React, { useState, useContext, useRef, useEffect } from "react";

import "./Auth.css";
import logo from "../assets/icons/Puzzle_white.png";
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
            console.log("resData:", resData.data);
            auth.singIn(
                resData.data.token,
                resData.data.login,
                resData.data._id
            );
        }
        // eslint-disable-next-line
    }, [loading]);

    const loginHandler = e => {
        e.preventDefault();
        const login = loginEl.current.value.toLowerCase();
        const password = passwordEl.current.value;
        if (login.lenght < 4 && password.lenght < 4) {
            return;
        }
        sendSingIn("/users/singin", {
            login,
            password
        });
    };

    return (
        <React.Fragment>
            <form onSubmit={loginHandler} className="auth">
                <img src={logo} alt="" />
                <h2>Quiz App</h2>
                <input
                    type="text"
                    name="login"
                    id="login"
                    placeholder="Login"
                    ref={loginEl}
                />
                {!singin && (
                    <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Email"
                        ref={emailEl}
                    />
                )}
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    ref={passwordEl}
                />
                <button type="submit" name="submit" id="submit">
                    {singin ? "Sing in" : "Sing up"}
                </button>
                <div>
                    Don't have an account?<a href="?signup=true">Sing up</a>
                </div>
            </form>
        </React.Fragment>
    );
};

export default Auth;
