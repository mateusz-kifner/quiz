import React from "react";

export default React.createContext({
    token: null,
    userId: null,
    login: null,
    host: "localhost:3001",
    singIn: () => {},
    singUp: () => {},
    singOut: () => {}
});
