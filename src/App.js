import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import Nav from "./components/Nav";
import Header from "./components/Header";

import Puzzles from "./pages/Puzzles";
import Auth from "./pages/Auth";
import Grades from "./pages/Grades";

import "./main.css";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <main>
                    <Switch>
                        <Redirect from="/" to="/Auth" exact />
                        <Route path="/Puzzles" component={Puzzles} />
                        <Route path="/Auth" component={Auth} />
                        <Route path="/Grades" component={Grades} />
                        <Route path="/Settings" component={null} />
                        <Route path="/Chat" component={null} />
                    </Switch>
                </main>
                <Nav />
            </BrowserRouter>
        </div>
    );
}

export default App;
