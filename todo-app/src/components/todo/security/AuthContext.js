import { createContext, useContext, useState } from "react";
import { executeBasicAuthenticationService } from "../api/HelloWorldApiService";

// Create a Context
export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

// Share the created context with other components

export function AuthProvider({ children }) {

    // Put some state in the context
    const [isAuthenticated, setAuthenticated] = useState(false)

    const [username, setUsername] = useState(null)

    // function login(username, password) {
    //     if (username === "jongwon" && password === "1234") {
    //         setAuthenticated(true);
    //         setUsername(username);
    //         return true
    //     } else {
    //         setAuthenticated(false);
    //         setUsername(null);
    //         return false
    //     }
    // }

    function login(username, password) {

        const baToken = "Basic " + window.btoa(username + ":" + password)

        executeBasicAuthenticationService(baToken)
            .then(response => console.log(response))
            .catch(error => console.log(error))

        setAuthenticated(false)

        // if (username === "jongwon" && password === "1234") {
        //     setAuthenticated(true);
        //     setUsername(username);
        //     return true
        // } else {
        //     setAuthenticated(false);
        //     setUsername(null);
        //     return false
        // }
    }

    function logout() {
        setAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, username }}> {children}</AuthContext.Provider >
    )
}