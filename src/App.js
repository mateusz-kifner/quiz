import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import jwt from "jsonwebtoken";

import Nav from "./components/Nav";
import Header from "./components/Header";

import Puzzles from "./pages/Puzzles";
import Auth from "./pages/Auth";
import Grades from "./pages/Grades";
import Settings from "./pages/Settings";

import "./main.css";

class App extends Component {
    state = {
        token: null,
        login: null,
        userId: null,
        host: "http://192.168.1.116:3001"
    };

    singIn = (token, userId, login) => {
        this.setState({ token, login, userId });
    };

    singUp = (login, email, password) => {};

    singOut = () => {
        this.setState({ token: null, login: null, userId: null });
    };

    componentDidMount = () => {
        let token_l = localStorage.getItem("token");
        let token_d = jwt.decode(token_l);
        if (token_l !== null && token_d.exp > Math.floor(Date.now() / 1000)) {
            this.singIn(token_l, token_d.login, token_d._id);
        }
    };

    render() {
        return (
            <BrowserRouter>
                <AuthContext.Provider
                    value={{
                        token: this.state.token,
                        userId: this.state.userId,
                        login: this.state.login,
                        host: this.state.host,
                        singIn: this.singIn,
                        singUp: this.singUp
                    }}
                >
                    <Header />
                    <main>
                        <Switch>
                            {this.state.token === null && (
                                <Redirect from="/" to="/Auth" exact />
                            )}
                            {this.state.token !== null && (
                                <Route path="/Puzzles" component={Puzzles} />
                            )}
                            {this.state.token === null && (
                                <Route path="/Auth" component={Auth} />
                            )}
                            {this.state.token !== null && (
                                <Route path="/Grades" component={Grades} />
                            )}
                            {this.state.token !== null && (
                                <Route path="/Chat" component={null} />
                            )}
                            {this.state.token !== null && (
                                <Route path="/Settings" component={Settings} />
                            )}
                        </Switch>
                    </main>
                    <Nav />
                </AuthContext.Provider>
            </BrowserRouter>
        );
    }
}

export default App;
