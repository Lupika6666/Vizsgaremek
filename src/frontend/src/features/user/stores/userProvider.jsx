import { jwtDecode } from "jwt-decode"
import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [role, setRole] = useState(null);
    const [token, setToken] = useState(null);
    const [tokenExp, setTokenExp] = useState(null);
    const [readerId, setReaderId] = useState(null);

    const login = (jwtToken) => {
        setToken(jwtToken);
        localStorage.setItem("token", jwtToken);

        const decodedToken = jwtDecode(jwtToken);
        console.log(decodedToken)
        setRole(decodedToken.szerepkor)
        setTokenExp(decodedToken.exp);
        setReaderId(decodedToken.olvaso_id);
    }

    const logout = () => {
        setToken(null);
        setTokenExp(null);
        setRole(null);
        setReaderId(null);

        localStorage.removeItem('token');
    }

    return (
        <UserContext.Provider value={{ role, token, tokenExp, readerId, login, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    return useContext(UserContext);
}