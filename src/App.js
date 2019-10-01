import React, { useContext } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { AuthContext, AuthContextProvider } from "./context/AuthContext";

import Nav from "./components/Nav";
import Header from "./components/Header";

import Puzzles from "./pages/Puzzles";
import Auth from "./pages/Auth";
import Grades from "./pages/Grades";
import Settings from "./pages/Settings";

import "./main.css";

const App = props => {
  const auth = useContext(AuthContext);

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Header profile_icon="./profile.png" />
        <main>
          <Switch>
            {<Redirect from="/" to="/Auth" exact />}
            {<Route path="/Puzzles" component={Puzzles} />}
            {<Route path="/Game" component={Game} />}
            {<Route path="/Auth" component={Auth} />}
            {<Route path="/Grades" component={Grades} />}
            {<Route path="/Chat" component={null} />}
            {<Route path="/Settings" component={Settings} />}
          </Switch>
        </main>
        <Nav
          links={[
            {
              to: "/Puzzles",
              name: "Puzzles",
              icon: "./Puzzle_white.png"
            },
            {
              to: "/Chat",
              name: "Chat",
              icon: "./chat_white.png"
            },
            {
              to: "/Grades",
              name: "Grades",
              icon: "./trophy_white.png"
            }
          ]}
        />
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default App;
