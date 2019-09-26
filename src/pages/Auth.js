import React, { Component } from "react";

import "./Auth.css";
import logo from "../assets/icons/Puzzle_white.png";
import Axios from "axios";

import AuthContext from "../context/AuthContext";

class Auth extends Component {
    state = {
        singin: true,
        loginError: false,
        visible: true,
        animation_time: 500
    };

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.loginEL = React.createRef();
        this.passwordEl = React.createRef();
        this.emailEl = React.createRef();
    }

    loginHandler = e => {
        e.preventDefault();
        const login = this.loginEL.current.value.toLowerCase();
        const password = this.passwordEl.current.value;
        if (login.lenght < 4 && password.lenght < 4) {
            return;
        }
        Axios.post(this.context.host + "/users/singin", {
            login,
            password
        })
            .then(res => {
                this.context.singIn(
                    res.data.token,
                    res.data.login,
                    res.data._id
                );
                localStorage.setItem("token", res.data.token);

                this.setState({ visible: false });
                setTimeout(() => {
                    this.props.history.push("/Puzzles");
                }, this.state.animation_time);
            })
            .catch(err => {
                console.log(err);
                this.setState({ loginError: true });
            });
    };

    render() {
        return (
            <React.Fragment>
                <form
                    className={this.state.visible ? "auth" : "auth move-left"}
                    style={{
                        transitionDuration: this.state.animation_time + "ms"
                    }}
                    onSubmit={this.loginHandler}
                    ref={this.AuthEl}
                >
                    <img src={logo} alt="" />
                    <h2>Quiz App</h2>
                    <input
                        type="text"
                        name="login"
                        id="login"
                        placeholder="Login"
                        ref={this.loginEL}
                    />
                    {!this.state.singin && (
                        <input
                            type="text"
                            name="email"
                            id="email"
                            placeholder="Email"
                            ref={this.emailEl}
                        />
                    )}
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        ref={this.passwordEl}
                    />
                    <button type="submit" name="submit" id="submit">
                        {this.state.singin ? "Sing in" : "Sing up"}
                    </button>
                    <div>
                        Don't have an account?<a href="?signup=true">Sing up</a>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}

export default Auth;
