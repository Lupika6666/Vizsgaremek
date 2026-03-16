import { jwtDecode } from "jwt-decode"
import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [role, setRole] = useState(null);
    const [token, setToken] = useState(null);
    const [tokenExp, setTokenExp] = useState(null);

    const login = (jwtToken) => {
        setToken(jwtToken);
        localStorage.setItem("token", jwtToken);

        const decodedToken = jwtDecode(jwtToken);
        console.log(decodedToken)
        setRole(decodedToken.szerepkor)
        setTokenExp(decodedToken.exp);
    }

    const logout = () => {
        setToken(null);
        setTokenExp(null);
        setRole(null);

        localStorage.removeItem('token');
    }

    return (
        <UserContext.Provider value={{ role, token, tokenExp, login, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    return useContext(UserContext);
}