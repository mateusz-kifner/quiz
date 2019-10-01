import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import jwt from "jsonwebtoken";

const AuthContext = React.createContext({
    token: null,
    userId: null,
    login: null,
    host: "localhost:3001",
    axiosConfig: {},
    singIn: () => {},
    singUp: () => {},
    singOut: () => {}
});

const AuthContextProvider = props => {
    const [auth, setAuth] = useState({
        token: null,
        login: null,
        userId: null
    });

    const history = useHistory();
    const [host, setHost] = useState("http://192.168.1.116:3001");

    useEffect(() => {
        let token_l = localStorage.getItem("token");
        let token_d = jwt.decode(token_l);
        console.log(token_d);
        if (token_l !== null && token_d.exp > Math.floor(Date.now() / 1000)) {
            singIn(token_l, token_d.login, token_d._id);
            history.push("/Puzzles");
        }
        // eslint-disable-next-line
    }, []);

    const singIn = (token, login, userId) => {
        setAuth({ token, login, userId });
        localStorage.setItem("token", token);
        history.push("/Puzzles");
    };

    const singUp = (login, email, password) => {};

    const singOut = () => {
        setAuth({ token: null, login: null, userId: null });
        history.push("/Auth");
    };

    return (
        <AuthContext.Provider
            value={{
                token: auth.token,
                login: auth.logn,
                userId: auth.userId,
                host,
                singIn,
                singOut,
                singUp,
                setHost,
                axiosConfig: {
                    headers: {
                        Authorization: "Bearer " + auth.token
                    }
                }
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthContextProvider };
